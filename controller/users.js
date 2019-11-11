class UsersController {

  //find user
  async getUser (req, res, next) {
    try {
      let user = await req.app.services.users.getUser(req.user, req.params.id);
      return res.status(200).send(user);
    } catch (err) {
      return next(err);
    }
  };

  //all users that have benefits
  async usersBenefits (req, res) {
    try {
      let users = await req.app.services.users.usersBenefits(req.user);
      return res.status(200).send(users);
    } catch (err) {
      res.send(err.message);
    }
  };

  //create user
  async register (req, res) {
    const { firstName, lastName, email, role, birthday, phoneNumber, password, password2 } = req.body;
    if (!firstName || !lastName || !role || !email || !birthday || !phoneNumber || !password || !password2 || password !== password2) {
      return res.send('please fill correct');
    }
    let userObject = {...req.body};
    try {
      let user = await req.app.services.users.createUser(req.user, userObject);
      return res.status(200).redirect('/users/login');
    } catch (err) {
      res.status(500).send(err.message);
    }
  };

  //signin
  async login (req, res) {
    try {
      let result = await req.app.services.users.login(req.body.email, req.body.password);
      return res.status(200).send(result);
    } catch (err) {
      res.send(err.message);
    }
  };

  //change user
  async changeUser (req, res) {
    let obj = {...req.body};
    try {
      let user = await req.app.services.users.changeUser(req.user, obj, req.params.id);
      return res.status(200).send(user);
    } catch (err) {
      res.send(err.message);
    }
  };

  //delete user
  async deleteUser (req, res) {
    try {
      let user = await req.app.services.users.deleteUser(req.user, req.params.id);
      res.status(200).send(user);
    } catch (err) {
      res.send(err.message);
    }
  };

  //redirect to dashbard page
  userDashboardPage (req, res) {
    //password@ jnjem
    let user = req.user;
    res.render('dashboard', {user});
  };

  //redirect to register page
  registerPage (req, res) {
    res.redirect('register')
  };

  //redirect to login page
  loginPage (req, res) {
    res.redirect('login')
  };
};

module.exports = UsersController;

const passport = require('passport');

class UsersController {

  async getUser (req, res) {
    try {
      let user = await req.app.services.users.getUser(req.params.id);
      return res.status(200).send(user);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  };

  //all users that have benefits
  async usersBenefits (req, res) {
    try {
      let users = await req.app.services.users.usersBenefits();
      res.status(200).send(users);
    } catch (err) {
      res.send(err.message);
    }
  };

  async register (req, res, next) {
    const { firstName, lastName, email, role, birthday, phoneNumber, password, password2 } = req.body;
    // const avatar = firstName.charAt(0).toUpperCase();
    if (!firstName || !lastName || !role || !email || !birthday || !phoneNumber || !password || !password2 || password !== password2) {
      return res.send('please fill correct');
    }

    try {
      let user = await req.app.services.users.createUser(firstName, lastName, email, role, birthday, phoneNumber, password);
      res.status(200).redirect('/users/login');
    } catch (err) {
      res.status(500).send(err.message);
    }
  };

  async changeUser (req, res) {
    let obj = {...req.body};
    try {
      let user = await req.app.services.users.changeUser(obj, req.params.id);
      res.status(200).send(user);
    } catch (err) {
      res.status(500).send(err.message);
    }
  };

  async deleteUser (req, res) {
    try {
      await req.app.services.users.deleteUser(req.body.user_id);
      res.status(200).send(user);
    } catch (err) {
      res.status(500).send(err.message);
    }
  };

  login (req, res, next) {

    passport.authenticate('local', {
      successRedirect: '/users/dashboard',
      failureRedirect: '/users/login'
    })(req, res, next);
  };

  logout (req, res) {
    req.logout();
    res.redirect('/users/login');
  };

  userDashboardPage (req, res) {
    let user = req.user;
    res.render('dashboard', {user});
  };

  registerPage (req, res) {
    res.render('register')
  };

  loginPage (req, res) {
    res.render('login')
  };

};

module.exports = UsersController;

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

  async getUsers (req, res, next) {
    try {
      let users = await req.app.services.users.getUsers();
      return res.status(200).send(users);
    } catch (err) {
      return next(err);
    }
  }

  //all users that have benefits
  async usersBenefits (req, res, next) {
    try {
      let users = await req.app.services.users.usersBenefits(req.user);
      return res.status(200).send(users);
    } catch (err) {
      return next(err);
    }
  };

  //create user
  async register (req, res, next) {
    const { firstName, lastName, email, role, birthday, phoneNumber, password, repeatPassword } = req.body;
     // todo
    if (!firstName || !lastName || !role || !email || !birthday || !phoneNumber || !password || !repeatPassword || password !== repeatPassword) {
      return res.send('please fill correct');
    }
    let userObject = {...req.body};
    try {
      let user = await req.app.services.users.createUser(req.user, userObject);
      return res.status(200).send('successfully registered');
    } catch (err) {
      return next(err);
    }
  };

  //signin
  async login (req, res, next) {
    console.log('post request to "user/login" URL');
    try {
      let result = await req.app.services.users.login(req.body.email, req.body.password);
      console.log('send user data and token to front');
      return res.status(200).send(result);
    } catch (err) {
      return next(err);
    }
  };

  //change user
  async changeUser (req, res, next) {
    let obj = {...req.body};
    try {
      let user = await req.app.services.users.changeUser(req.user, obj, req.params.id);
      return res.status(200).send(user);
    } catch (err) {
      return next(err);
    }
  };

  //delete user
  async deleteUser (req, res, next) {
    try {
      let user = await req.app.services.users.deleteUser(req.user, req.params.id);
      res.status(200).send(user);
    } catch (err) {
      return next(err);
    }
  };
};

module.exports = UsersController;

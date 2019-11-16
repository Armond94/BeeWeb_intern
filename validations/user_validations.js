class UserValidation {

  checkForRegister (req, res, next) {
    const { firstName, lastName, email, role, birthday, phoneNumber, password, repeatPassword } = req.body;
    if (!firstName || !lastName || !role || !email || !birthday || !phoneNumber || !password || !repeatPassword || password !== repeatPassword) {
      return res.send('please fill all fields');
    };
    next();
  };

  chekForLogin (req, res, next) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.send(`fill email and password`);
    };
    next();
  };

};

module.exports = UserValidation;

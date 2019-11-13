class UserValidation {

  checkForRegister (req, res, next) {
    const { firstName, lastName, email, role, birthday, phoneNumber, password, repeatPassword } = req.body;
    if (!firstName || !lastName || !role || !email || !birthday || !phoneNumber || !password || !repeatPassword || password !== repeatPassword) {
      return res.send('please fill correct');
    };
    next();
  };

  chekForLogin (req, res, next) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.send(`email or password incorect`);
    };
    next();
  };

};

module.exports = UserValidation;

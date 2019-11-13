class UserPermissions {

  admin (req, res, next) {
    if (req.user.role !== 'admin' && req.user.role !== 'manager') {
      res.send('you dont have such permission');
    };
    next();
  };

};

module.exports = UserPermissions;

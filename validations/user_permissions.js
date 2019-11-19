const Errors = require('../errors');
const ADMIN_ROLES = ['admin', 'manager'];

class UserPermissions {

  isAdmin (req, res, next) {
    if (!ADMIN_ROLES.includes(req.user.role)) {
      return Errors.generatePermissionError(res);
    }
    next();
  };

  isStaff (req, res, next) {
    console.log('req.headers.Authorization - ', req.headers.Authorization);
    console.log('req.body - ', req.body);
    console.log('req.params.id - ', req.params.id);
    if (!ADMIN_ROLES.includes(req.user.role) && !req.user._id.equals(req.params.id)  ) {
      return Errors.generatePermissionError(res);
    }
    next();
  };

};

module.exports = UserPermissions;

const Errors = require('../errors');
const ADMIN_ROLES = ['admin', 'manager'];

class UserPermissions {

  isAdmin (req, res, next) {
    if (!['admin', 'manager'].includes(req.user.role)) {
      return Errors.generatePermissionError(res);
    }
    next();
  };

  isStaff (req, res, next) {
    if (!req.user._id.equals(req.params.id)) {
      return Errors.generatePermissionError(res);
    }
    next();
  };

};

module.exports = UserPermissions;

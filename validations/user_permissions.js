import Errors from '../errors';
const ADMIN_ROLES = ['admin', 'manager'];

class UserPermissions {

  isAdmin (req, res, next) {
    if (!ADMIN_ROLES.includes(req.user.role)) {
      return Errors.generatePermissionError(res);
    }
    next();
  };

  chekUpdateStaff (req, res, next) {
    if (ADMIN_ROLES.includes(req.user.role)) {
      return next();
    }
    if (JSON.stringify(req.user.id) !== JSON.stringify(req.params.id)) {
      return Errors.generatePermissionError(res);
    }
    if (req.body.role) {
      return Errors.generatePermissionError(res);
    }
    next();
  };
};

export default UserPermissions;

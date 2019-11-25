import Errors from '../errors';
const ADMIN_ROLES = ['admin', 'manager'];

class UserPermissions {

  isAdmin (req, res, next) {
    if (!ADMIN_ROLES.includes(req.user.role)) {
      console.log(3333, 'admin error');
      return Errors.generatePermissionError(res);
    }
    console.log(4444, 'admin is ok');
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

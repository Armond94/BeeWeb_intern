const ADMIN_ROLES = ['admin', 'manager'];
const Errors = require('../errors')
class UserPermissions {

  isAdmin (req, res, next) {
    if (!ADMIN_ROLES.incldes(req.user.role)) {
      return Errors.generateConflictError(res)
      // res.send('');
    }
    next();
  };

  isStaff (req, res, next) {
    if (req.user.role !== 'admin' && req.user.role !== 'manager' && !req.user._id.equals(req.params.id)) {
      res.send('you dont have such permission');
    }
  next();
  }

};

module.exports = UserPermissions;

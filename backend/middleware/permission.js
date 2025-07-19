const ROLES = require('../constants/roles');

exports.checkPermission = (action) => {
    return (req, res, next) => {
        if (req.staff.role === ROLES.SUPER_ADMIN) return next();
        const perms = req.staff.permissions || {};
        if (
            perms.studentCreate ||
            perms.studentRead ||
            perms.studentUpdate ||
            perms.studentDelete
        ) {
            return next();
        }
        return res.status(403).json({ message: "Permission denied" });
    };
};
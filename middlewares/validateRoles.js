const { request, response } = require('express');

const isAdminRole = (req = request, res = response, next) => {
  if (!req.user) {
    return res
      .status(500)
      .json({ msg: 'Trying to verify role without validating the token' });
  }

  const { name, role } = req.user;
  if (role !== 'ADMIN_ROLE') {
    return res.status(401).json({ msg: `User ${name} is not an Admin` });
  }
  next();
};

const hasRole = (...roles) => {
  return (req = request, res = response, next) => {
    if (!req.user) {
      return res
        .status(500)
        .json({ msg: 'Trying to verify role without validating the token' });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(401).json({
        msg: `This service only allows this roles ${roles}`,
      });
    }
    next();
  };
};

module.exports = {
  isAdminRole,
  hasRole,
};

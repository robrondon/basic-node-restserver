const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const validateJWT = async (req = request, res = response, next) => {
  const token = req.header('x-token');
  if (!token) {
    return res.status(401).json({
      msg: 'No token on the request',
    });
  }
  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    // read user and save it on the request
    const user = await User.findById(uid);
    if (!user) throw new Error();
    // verify if user state is true
    if (!user.state) throw new Error();

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: 'Token not valid',
    });
  }
};

module.exports = {
  validateJWT,
};

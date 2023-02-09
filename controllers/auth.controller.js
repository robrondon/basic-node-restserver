const { response } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');
const { generateJWT } = require('../helpers/generateJWT');

const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    // Verify if email exists
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ msg: 'User / Password incorrect - Email' });

    // If user is active
    if (!user.state)
      return res
        .status(400)
        .json({ msg: 'User / Password incorrect - state:false' });

    // Verify Password
    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword)
      return res
        .status(400)
        .json({ msg: 'User / Password incorrect - Password' });

    // Generate JWT
    const token = await generateJWT(user.id);

    res.json({
      user,
      token,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      msg: 'Something went wrong. Contact Admin',
    });
  }
};

module.exports = {
  login,
};

const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');

const getUsers = async (req = request, res = response) => {
  const { limit = 5, from = 0 } = req.query;
  const query = { state: true };
  // const users = await User.find(query).skip(Number(from)).limit(Number(limit));
  // const total = await User.countDocuments(query);

  const [total, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query).skip(Number(from)).limit(Number(limit)),
  ]);
  res.json({
    total,
    users,
  });
};

//Create User
const postUsers = async (req = request, res = response) => {
  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role });

  // Hash password
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  // Save on DB
  await user.save();

  res.json(user);
};

// Update User
const putUsers = async (req, res = response) => {
  const { id } = req.params;
  const { _id, password, google, email, ...rest } = req.body;

  if (password) {
    // Hash password
    const salt = bcryptjs.genSaltSync();
    rest.password = bcryptjs.hashSync(password, salt);
  }

  const user = await User.findByIdAndUpdate(id, rest, { new: true });
  res.json(user);
};

const deleteUsers = async (req, res = response) => {
  const { id } = req.params;

  // Total delete (not recommended)
  // const user = await User.findByIdAndDelete(id);

  // State delete
  const user = await User.findByIdAndUpdate(
    id,
    { state: false },
    { new: true }
  );

  res.json(user);
};

module.exports = {
  getUsers,
  postUsers,
  putUsers,
  deleteUsers,
};

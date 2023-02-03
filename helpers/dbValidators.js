const Role = require('../models/role');
const User = require('../models/user');

const validRole = async (role = '') => {
  const roleExist = await Role.findOne({ role });
  if (!roleExist) {
    throw new Error(`The role ${role} is not valid`);
  }
};

const emailExists = async (email = '') => {
  const existingEmail = await User.findOne({ email });
  if (existingEmail) {
    throw new Error('This email already exists');
  }
};

const userById = async (id) => {
  const user = await User.findById(id);
  if (!user) {
    throw new Error(`The id ${id} doesn't exist`);
  }
};

module.exports = {
  validRole,
  emailExists,
  userById,
};

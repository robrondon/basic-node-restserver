const mongoose = require('mongoose');

const dbConnection = async () => {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(process.env.MONGODB_ATLAS, () => {
      console.log('Successfully connected to the database');
    });
  } catch (error) {
    console.log(error);
    throw new Error('Could not connect to the database.');
  }
};

module.exports = {
  dbConnection,
};

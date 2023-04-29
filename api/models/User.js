const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (username) => {
        return username.length >= 4;
      },
      message: 'Username must be at least 4 characters long',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number, 
    required: true
  },
  contact: {
    type: Number, 
    required: true
  },
  about: {
    type: String, 
    required: true
  },
  github: {
    type: String, 
    required: true
  },
  linkedin: {
    type: String, 
    required: true
  },
  password: {
    type: String, 
    required: true
  },
});

const UserModel = model('User', UserSchema);

module.exports = UserModel;

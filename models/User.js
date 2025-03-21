const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: 'user' // Значення за замовчуванням
  },
  dateOfBirth: {
    type: Date // Поле для зберігання дати народження
  },
  createdAt: {
    type: Date,
    default: Date.now // Дата створення користувача
  }
});

UserSchema.pre('save', async function (next) {
    if (!this.password) {
      throw new Error('Password is required');
    }
    if (!this.isModified('password')) {
      return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });
  

module.exports = mongoose.model('User', UserSchema);

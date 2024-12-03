const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'requester'],
    default: 'requester'
  },
  isAuthorized: {
    type: Boolean,
    default: true
  },
  isPasswordChanged: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign(
    { _id: this._id, role: this.role, isAuthorized: this.isAuthorized, isPasswordChanged: this.isPasswordChanged },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );
  return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email, isAuthorized: true });
  if (!user) {
    throw new Error('Credenciales inválidas o usuario no autorizado');
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Credenciales inválidas');
  }
  return user;
};

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;


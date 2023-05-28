const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const { SECRET_KEY } = process.env;

const { User } = require('../models/user');

const { HttpError } = require('../helpers');

const { controllersWrapper } = require('../decorators');

const register = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, 'Email already in use');
  }
  const hashPassword = await bcrypt.hashSync(password, 10);

  const newUser = await User.create({ ...req.body, password: hashPassword });

  res.status(201).json({
    email: newUser.email,
    password: newUser.password,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, 'Email or password invalid');
  }
  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw HttpError(401, 'Email or password invalid');
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' });
  res.json({ token });
};

module.exports = {
  registrer: controllersWrapper(register),
  login: controllersWrapper(login),
};

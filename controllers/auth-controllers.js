const fs = require('fs/promises');
const path = require('path');

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const { SECRET_KEY } = process.env;

const { User } = require('../models/user');

const { HttpError } = require('../helpers');

const { controllersWrapper } = require('../decorators');

const gravatar = require('gravatar');

const Jimp = require('jimp');

const avatarPath = path.resolve('public', 'avatars');

const register = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, 'Email in use');
  }
  const hashPassword = await bcrypt.hashSync(password, 10);

  const gravatarURL = gravatar.url(email);

  const avatarURL = gravatarURL.slice(2);

  const newUser = await User.create({ ...req.body, avatarURL: avatarURL, password: hashPassword });

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
      avatarURL: newUser.avatarURL,
    },
  });
};

const changeAvatar = async (req, res) => {
  const { path: oldPath, filename } = req.file;
  const newPath = path.join(avatarPath, filename);

  const resultUpload = await Jimp.read(oldPath);
  await resultUpload.resize(250, 250).write(newPath);

  const avatarURL = path.join('avatars', filename);
  fs.unlink(oldPath);

  const { _id } = req.user;
  const result = await User.findByIdAndUpdate(_id, { avatarURL }, { new: true });

  res.status(200).json({ avatarURL: result.avatarURL });
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

  const { _id: id, subscription } = user;

  const payload = {
    id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' });
  await User.findByIdAndUpdate(id, { token });
  res.json({
    token: token,
    user: {
      email: email,
      subscription: subscription,
    },
  });
};

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;
  res.json({
    email,
    subscription,
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: '' });

  res.status(204).send();
};

module.exports = {
  registrer: controllersWrapper(register),
  changeAvatar: controllersWrapper(changeAvatar),
  login: controllersWrapper(login),
  getCurrent: controllersWrapper(getCurrent),
  logout: controllersWrapper(logout),
};

const jwt = require('jsonwebtoken');

const { User } = require('../models/user');

const HttpError = require('./HttpEror');

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = '' } = req.headers;
  const [bearer, token] = authorization.split(' ');

  if (bearer !== 'Bearer') {
    next(HttpError(401));
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    console.log(id);
    // id выводится

    console.log(`пробую достать юзера`);
    // const user = await User.findById(id);

    // как только раскомментировать строчку сверху => все падает

    // if (!user) {
    //   next(HttpError(401));
    // }
    next();
  } catch {
    console.log(`ошибка по кетчу`);
    next(HttpError(401));
  }
};

module.exports = authenticate;

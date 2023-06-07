const express = require('express');

const ctrl = require('../../controllers/auth-controllers');

const authenticate = require('../../helpers/authenticate');

const { validateBody } = require('../../decorators');

const { joiAuthSchemas } = require('../../models/user');

const upload = require('../../helpers/upload');

const authRouter = express.Router();

authRouter.post(
  '/register',
  upload.single('avatar'),
  validateBody(joiAuthSchemas.registerSchema),
  ctrl.registrer
);

authRouter.post('/login', validateBody(joiAuthSchemas.loginSchema), ctrl.login);

authRouter.get('/current', authenticate, ctrl.getCurrent);

authRouter.post('/logout', authenticate, ctrl.logout);

authRouter.patch('/avatars', authenticate, upload.single('avatar'), ctrl.changeAvatar);

module.exports = authRouter;

const express = require('express');

const ctrl = require('../../controllers/auth-controllers');

const authenticate = require('../../helpers/authenticate');

const { validateBody } = require('../../decorators');

const { joiAuthSchemas } = require('../../models/user');

const authRouter = express.Router();

authRouter.post('/register', validateBody(joiAuthSchemas.registerSchema), ctrl.registrer);

authRouter.post('/login', validateBody(joiAuthSchemas.loginSchema), ctrl.login);

authRouter.get('/current', authenticate, ctrl.getCurrent);

authRouter.post('/logout', authenticate, ctrl.logout);

module.exports = authRouter;

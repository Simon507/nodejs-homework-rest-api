const express = require('express');

const ctrl = require('../../controllers/auth-controllers');

const { validateBody } = require('../../decorators');

const { joiAuthSchemas } = require('../../models/user');

const authRouter = express.Router();

authRouter.post('/register', validateBody(joiAuthSchemas.registerSchema), ctrl.registrer);

authRouter.post('/login', validateBody(joiAuthSchemas.loginSchema), ctrl.login);

module.exports = authRouter;

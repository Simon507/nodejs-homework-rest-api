const { Schema, model } = require('mongoose');

const Joi = require('joi');

const handleMongooseError = require('../helpers/handleMongooseError');
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: [true, 'Set password for user'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    token: { type: String, default: '' },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post('save', handleMongooseError);

const registerSchema = Joi.object({
  name: Joi.string().required(),
  password: Joi.string().required(),
  email: Joi.string().required(),
  subscription: Joi.string(),
  favorite: Joi.boolean(),
});

const loginSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required(),
  subscription: Joi.string(),
  favorite: Joi.boolean(),
});

const joiAuthSchemas = { registerSchema, loginSchema };

const User = model('user', userSchema);

module.exports = { User, joiAuthSchemas };

const { Schema, model } = require('mongoose');

const Joi = require('joi');

const handleMongooseError = require('../helpers/handleMongooseError');
const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, 'Set password for user'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    avatarURL: { type: String },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, 'Verify token is required'],
    },
    token: { type: String, default: '' },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post('save', handleMongooseError);

const registerSchema = Joi.object({
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

const verifyEmailSchema = Joi.object({
  email: Joi.string().required(),
});
const joiAuthSchemas = { registerSchema, loginSchema, verifyEmailSchema };

const User = model('user', userSchema);

module.exports = { User, joiAuthSchemas };

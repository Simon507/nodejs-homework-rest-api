const { Schema, model } = require('mongoose');

const Joi = require('joi');

const { handleMongooseError } = require('../helpers');

const phonePattern = /^[(]{1}[0-9]{3}[)]{1} [0-9]{3}[-]{1}[0-9]{4}$/;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      match: phonePattern,
      required: true,
    },
    favorite: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post('save', handleMongooseError);

const addContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().pattern(phonePattern).required(),
  favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const joiSchemas = { addContactSchema, updateFavoriteSchema };

const Contact = model('contact', contactSchema);

module.exports = { Contact, joiSchemas };

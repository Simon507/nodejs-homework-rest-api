const express = require('express');
const Joi = require('joi');

const contactAddSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const router = express.Router();

const contactsService = require('../../models/contacts');

const { HttpError } = require('../../helpers');

router.get('/', async (req, res, next) => {
  try {
    const result = await contactsService.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsService.getContactById(id);
    if (!result) {
      throw HttpError(404, `Contact with id: ${id} not found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  console.log(req.body);
  try {
    const { error } = contactAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await contactsService.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { error } = contactAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { id } = req.params;
    console.log(req.params);
    const result = await contactsService.updateContact(id, req.body);
    if (!result) {
      throw HttpError(404, `Contact with id: ${id} not found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsService.removeContact(id);
    if (!result) {
      throw HttpError(404, `Contact with id: ${id} not found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

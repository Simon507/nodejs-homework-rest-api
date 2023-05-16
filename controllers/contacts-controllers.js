const contactsService = require('../models/contacts');

const { HttpError } = require('../helpers');

const { controllersWrapper } = require('../decorators');

const getAllContacts = async (req, res) => {
  const result = await contactsService.listContacts();
  res.json(result);
};

const getContactsById = async (req, res, next) => {
  const { id } = req.params;
  const result = await contactsService.getContactById(id);
  if (!result) {
    throw HttpError(404, `Contact with id: ${id} not found`);
  }
  res.json(result);
};

const addContact = async (req, res, next) => {
  const result = await contactsService.addContact(req.body);
  res.status(201).json(result);
};

const editContact = async (req, res, next) => {
  const { id } = req.params;
  const result = await contactsService.updateContact(id, req.body);
  if (!result) {
    throw HttpError(404, `Contact with id: ${id} not found`);
  }
  res.json(result);
};

const deleteContactById = async (req, res, next) => {
  const { id } = req.params;
  const result = await contactsService.removeContact(id);
  if (!result) {
    throw HttpError(404, `Contact with id: ${id} not found`);
  }
  res.json({ message: 'contact deleted' });
};

module.exports = {
  getAllContacts: controllersWrapper(getAllContacts),
  getContactsById: controllersWrapper(getContactsById),
  addContact: controllersWrapper(addContact),
  editContact: controllersWrapper(editContact),
  deleteContactById: controllersWrapper(deleteContactById),
};

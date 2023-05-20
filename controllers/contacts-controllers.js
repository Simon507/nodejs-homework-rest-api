const { Contact } = require('../models/contact');

const { HttpError } = require('../helpers');

const { controllersWrapper } = require('../decorators');

const getAllContacts = async (req, res) => {
  const result = await Contact.find();
  res.json(result);
};

const getContactsById = async (req, res, next) => {
  const { id } = req.params;

  const result = await Contact.findById(id);

  if (!result) {
    throw HttpError(404, `Contact with id: ${id} not found`);
  }
  res.json(result);
};

const addContact = async (req, res, next) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

const editContact = async (req, res, next) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, `Contact with id: ${id} not found`);
  }
  res.json(result);
};

const updateFavorite = async (req, res, next) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, `Contact with id: ${id} not found`);
  }
  res.json(result);
};

const deleteContactById = async (req, res, next) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndDelete(id);
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
  updateFavorite: controllersWrapper(updateFavorite),
  deleteContactById: controllersWrapper(deleteContactById),
};

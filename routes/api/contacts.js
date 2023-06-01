const express = require('express');

const router = express.Router();

const contactsController = require('../../controllers/contacts-controllers');

const { joiSchemas } = require('../../models/contact');

const { validateBody, validateBodyFavorite } = require('../../decorators');

const { isValidId, authenticate } = require('../../helpers');

router.use(authenticate);

router.get('/', contactsController.getAllContacts);

router.get('/:id', isValidId, contactsController.getContactsById);

router.post('/', validateBody(joiSchemas.addContactSchema), contactsController.addContact);

router.put(
  '/:id',
  isValidId,
  validateBody(joiSchemas.addContactSchema),
  contactsController.editContact
);

router.patch(
  '/:id/favorite',
  isValidId,
  validateBodyFavorite(joiSchemas.updateFavoriteSchema),
  contactsController.updateFavorite
);

router.delete('/:id', isValidId, contactsController.deleteContactById);

module.exports = router;

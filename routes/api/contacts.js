const express = require('express');

const router = express.Router();

const contactsController = require('../../controllers/contacts-controllers');

const schemas = require('../../schemas/contacts-schemas');

const { validateBody } = require('../../decorators');

router.get('/', contactsController.getAllContacts);

router.get('/:id', contactsController.getContactsById);

router.post('/', validateBody(schemas.contactSchema), contactsController.addContact);

router.put('/:id', validateBody(schemas.contactSchema), contactsController.editContact);

router.delete('/:id', contactsController.deleteContactById);

module.exports = router;

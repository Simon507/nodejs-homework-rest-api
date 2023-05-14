const express = require('express');

const router = express.Router();

const contactsController = require('../../controllers/contacts-controllers');

router.get('/', contactsController.getAllContacts);

router.get('/:id', contactsController.getContactsById);

router.post('/', contactsController.addContact);

router.put('/:id', contactsController.editContact);

router.delete('/:id', contactsController.deleteContactById);

module.exports = router;

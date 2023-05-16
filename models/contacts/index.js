const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname, '/contacts.json');

const updateContacts = async allcontacts =>
  await fs.writeFile(contactsPath, JSON.stringify(allcontacts, null, 2));

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, 'utf-8');
  return JSON.parse(data);
};

const getContactById = async contactId => {
  const allContacts = await listContacts();
  const data = allContacts.find(item => item.id === contactId);

  console.log(allContacts);
  console.log(data);
  return data || null;
};

const removeContact = async contactId => {
  const allContacts = await listContacts();
  const index = allContacts.findIndex(item => item.id === contactId);
  if (index === -1) {
    console.warn('\x1B[31m Contact not found');
    return null;
  }
  const [data] = allContacts.splice(index, 1);
  await updateContacts(allContacts);
  return data;
};

const addContact = async data => {
  const allContacts = await listContacts();
  const newContact = {
    id: nanoid(),
    ...data,
  };
  allContacts.push(newContact);
  await updateContacts(allContacts);
  return newContact;
};

const updateContact = async (id, data) => {
  const allContacts = await listContacts();

  const index = allContacts.findIndex(item => item.id === id);
  if (index === -1) {
    return null;
  }
  allContacts[index] = { id, ...data };
  await updateContacts(allContacts);
  return allContacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};

const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
  } catch (error) {
    console.error("Помилка у завантаженні списку контактів: ", error);
  }
};

const getContactById = async (contactId) => {
  try {
    const id = String(contactId);
    const contacts = await listContacts();
    const result = contacts.find((contact) => contact.id === id);
    return result || null;
  } catch (error) {
    console.error("Помилка у зверненні до контакту: ", error);
  }
};

const addContact = async (data) => {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: nanoid(),
      ...data,
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (error) {
    console.error("Помилка у додаванні контакту: ", error);
  }
};

const removeContact = async (contactId) => {
  try {
    const id = String(contactId);
    const contacts = await listContacts();
    const index = contacts.findIndex((contact) => contact.id === id);
    if (index === -1) {
      return null;
    }
    const [result] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return result;
  } catch (error) {
    console.error("Помилка у видаленні контакту: ", error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};

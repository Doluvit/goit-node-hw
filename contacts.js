const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

class ContactsOperations {
  constructor(path) {
    this.path = path;
  }

  listContacts = async () => {
    const data = await fs.readFile(this.path);
    return JSON.parse(data);
  };

  getContactById = async (contactId) => {
    const id = String(contactId);
    const contacts = await this.listContacts();
    const result = contacts.find((contact) => contact.id === id);
    return result || null;
  };

  addContact = async (data) => {
    const contacts = await this.listContacts();
    const newContact = {
      id: nanoid(),
      ...data,
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  };

  removeContact = async (contactId) => {
    const id = String(contactId);
    const contacts = await this.listContacts();
    const index = contacts.findIndex((contact) => contact.id === id);
    if (index === -1) {
      return null;
    }
    const [result] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return result;
  };
}

const file = new ContactsOperations(contactsPath);

module.exports = {
  listContacts: file.listContacts.bind(file),
  getContactById: file.getContactById.bind(file),
  addContact: file.addContact.bind(file),
  removeContact: file.removeContact.bind(file),
};

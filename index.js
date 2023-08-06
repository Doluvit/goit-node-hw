const { program } = require("commander");
const file = require("./contacts");


program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

const invokeAction = async ({ action, id, name, email, phone }) => {
  try {
     switch (action) {
       case "list":
         const allContacts = await file.listContacts();
         return console.table(allContacts);
       case "get":
         const contactById = await file.getContactById(id);
         return console.log(contactById);
       case "add":
         const newContact = await file.addContact({ name, email, phone });
         return console.log(newContact);
       case "remove":
         const deleteContact = await file.removeContact(id);
         return console.log(deleteContact);
       default:
         console.warn("\x1B[31m Unknown action type!");
     }
  } catch (error) {
    console.log(error.message);
  }
 
};

program.parse(process.argv);
const argv = program.opts();

invokeAction(argv);

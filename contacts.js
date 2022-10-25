const path = require('path');
const fs = require('fs/promises');
const shortid = require('shortid');

const contactsPath = path.join(__dirname , './db/contacts.json');

// const getContacts = async() => {
//     const contacts = await listContacts();
//     return contacts;
// };



const  listContacts = async() => {
    const data = await fs.readFile(contactsPath);
    const result = JSON.parse(data);
    return result;

};



const getContactById = async contactId => {
    const contacts = await listContacts();
    const result = contacts.find(item => item.id === contactId);

    return result || null;
}

const addContact = async (name, email, phone) => {
    const id = shortid.generate();
    const newContact = {
        id, name, email, phone
    };

    const contacts = await listContacts();
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));

    return newContact;

};


const removeContact = async contactId => {
    const contacts = await listContacts();
    const index = contacts.findIndex((item) => item.id === contactId);

    if (index === -1) {
        return null;
    }

    const [result] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));;
    return result;
};



module.exports = {
    listContacts,
    getContactById,
    addContact,
    removeContact
};
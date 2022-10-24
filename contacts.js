const path = require('path');
const fs = require('fs/promises');
const shortid = require('shortid');



const contactsPath = path.join(__dirname , './db/contacts.json');

const  getContacts = async() => {
    const contacts  = await listContacts();
    return contacts;
};



const  listContacts = async() => {
    const data = await fs.readFile(contactsPath);
    const result = JSON.parse(data);
    return result;

};



const getContactById = async contactId => {
    const contacts = await getContact();
    const result = contacts.find(item => item.id === contactId);

    return result || null;
}

const addContact = async (name, email, phone) => {
    const id = shortid.generate();
    const newContact = {
        id, name, email, phone
    };

    const contacts = await getContacts();
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));

    return newContact;

};


const removeContact = async contactId => {
    let contacts = await getContacts();
    const contactFind = contacts.find(item => item.id === contactId);
    if (!contactFind) {
        return null;
    };
    const contactFilter = contacts.filter(item => item.id !== contactId);
    contacts = contactFilter;
    await fs.writeFile(contactsPath, JSON.stringify(contactFilter));

    return contacts;
};



module.exports = {
    listContacts,
    getContactById,
    addContact,
    removeContact
};
const { v4: uuidv4 } = require('uuid');
const fs = require('fs').promises;
const path = require('path');

const contactsPath = path.resolve('db', 'contacts.json');

// 
async function listContacts() {
	try {
		const data = await fs.readFile(contactsPath);
		return JSON.parse(data);
	} catch (error) {
		console.log(error);
	};
};

// 
async function updateContacts(contacts) {
	try {
		await fs.writeFile(contactsPath, JSON.stringify(contacts));
	} catch (error) {
		console.log(error);
	};
};

// 
async function getContactById(contactId) {
	try {
		const contacts = await listContacts();
		return contacts.find(({ id }) => id === contactId) ?? null;
	} catch (error) {
		console.log(error);
	};
};

// 
async function removeContact(contactId) {
	try {
		const id = contactId.toString();
		const contacts = await listContacts();

		const removeIdx = contacts.findIndex(contact => contact.id === id)
		if (removeIdx === -1) return null;
		const [removedContact] = contacts.splice(removeIdx, 1);
		
		await updateContacts(contacts);
		return removedContact;
	} catch (error) {
		console.log(error);
	};
};

// 
async function addContact({ name, email, phone }) {

	try {
		const contacts = await listContacts();

		const newContact = {
			id: uuidv4(),
			name,
			email,
			phone
		};

		contacts.push(newContact);
		await updateContacts(contacts);
		return newContact;
	} catch (error) {
		console.log(error);
	};
};

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact
};
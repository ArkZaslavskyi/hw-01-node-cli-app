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
		return contacts.find(({ id }) => id === contactId);
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

	const getMaxId = contacts => {
		let maxId = parseInt(contacts[0].id);

		for (const contact of contacts) {
			const id = parseInt(contact.id);
			if (id > maxId) { maxId = id; };
		};

		return maxId;
	};

	try {
		const contacts = await listContacts();

		const newContact = {
			id: (getMaxId(contacts) + 1).toString(),
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
import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm';
import Filter from './Filter';
import ContactList from './Contacts';
import Box from './Box';

const LS_CONTACTS_KEY = 'contacts';

export const App = () => {
  const [filter, setFilter] = useState('');
  const [contacts, setContacts] = useState(() => {
    const contacts = localStorage.getItem(LS_CONTACTS_KEY);
    try {
      return JSON.parse(contacts) ?? [];
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    localStorage.setItem(LS_CONTACTS_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const checkDuplicates = name => {
    const allNames = contacts.map(contact => contact.name);

    if (allNames.includes(name)) {
      alert(`${name} is already in contacts`);
      return true;
    }
  };

  const addContact = ({ name, number }) => {
    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    setContacts(prevState => [...prevState, newContact]);
  };

  const handleFilter = evt => {
    setFilter(evt.target.value);
  };

  const handleDelete = contactId => {
    setContacts(contacts =>
      contacts.filter(contact => contact.id !== contactId)
    );
  };

  const filterContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  return (
    <Box
      width="60%"
      minHeight="100vh"
      my={0}
      mx="auto"
      p={4}
      display="flex"
      flexDirection="column"
      alignItems="stretch"
      bg="mainBg"
      borderRadius="normal"
    >
      <Box mb={6} p={4} bg="secondaryBg" borderRadius="normal">
        <h1>Phonebook</h1>
        <ContactForm onSubmit={addContact} checkDuplicates={checkDuplicates} />
        <Filter value={filter} onChange={handleFilter} />
      </Box>

      <Box p={4} minHeight="250px" bg="secondaryBg" borderRadius="normal">
        <h2>Contacts</h2>
        <ContactList value={filterContacts()} handleDelete={handleDelete} />
      </Box>
    </Box>
  );
};

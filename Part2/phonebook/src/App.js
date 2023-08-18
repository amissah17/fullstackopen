import { useState, useEffect } from 'react'
import { getAll, add, update, del } from './server/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Notification from './components/Notifications'
import { Notification2 } from './components/Notifications'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchRes, setSearchRes] = useState([])
  const [showFiltered, setShowFiltered] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    getAll()
      .then(res => { setPersons(res) })
  }, []);

  const handleAdd = (e) => {
    e.preventDefault();
    let temp = persons.some(({ name }) => name === newName)
    if (!temp) {
      const newContact = { name: newName, number: newNumber }
      add(newContact)
        .then(res => {
          setPersons(persons.concat(res))
          setSuccessMessage(
            `Added '${res.name}'`
          )
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        })
    } else if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
      const updating = persons.find(({ name }) => name === newName)
      update({
        ...updating,
        number: newNumber
      }, updating.id)
        .then(res => {
          setPersons(persons.map(person => person.name !== res.name ? person : res))
          setSuccessMessage(
            `Updated '${res.name}'`
          )
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        })

    }
    setNewName('');
    setNewNumber('');
  }

  const handleDelete = (id, name) => {
    if (!window.confirm(`Delete ${name}?`)) {
      return;
    }
    del(id)
      .then((res) => { setPersons(persons.filter((person) => person.id !== id)) })
      .catch(error => {
        setErrorMessage(
          `Information of '${name}' has already been removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const filterData = (value) => {
    const rex = new RegExp(value, 'i')
    setSearchRes(persons.filter(({ name }) => rex.test(name)))
    setShowFiltered(value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={successMessage} />
      <Notification2 message={errorMessage} />
      <Filter filterData={filterData} />

      <h3>Add a new contact</h3>

      <PersonForm handleAdd={handleAdd}
        setNewName={setNewName} setNewNumber={setNewNumber}
        newName={newName} newNumber={newNumber} />

      <h2>Numbers</h2>
      {showFiltered ?
        searchRes.map(({ name, number, id }) => <Persons key={id} name={name} number={number} handleDelete={() => { handleDelete(id, name) }} />) :
         persons.map(({ name, number, id }) => <Persons key={id} name={name} number={number} handleDelete={() => { handleDelete(id, name) }} />)}
    </div>
  )
}

export default App
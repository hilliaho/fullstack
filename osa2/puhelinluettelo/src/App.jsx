import { useState, useEffect } from 'react'
import Persons from "./components/Persons"
import FilterForm from './components/FilterForm'
import AddNumberForm from './components/AddNumberForm'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchFilter, setSearchFilter] = useState('')
  const [filteredPersons, setFilteredPersons] = useState(persons)

  useEffect(() => {
    console.log('effect')
    axios.get('http://localhost:3001/persons').then(response => {
      console.log('promise fulfilled')
      setPersons(response.data)
    })
  }, [])
  console.log('render', persons.length, 'persons')

  const addName = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    const NameObject = {
      name: newName,
      number: newNumber,
      id: String(persons.length + 1)
    }
    const updatedPersons = persons.concat(NameObject)
    setPersons(updatedPersons)
    setFilteredPersons(updatedPersons.filter(person =>
      person.name.toLowerCase().includes(searchFilter.toLowerCase())
    ))
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setSearchFilter(event.target.value)
    setFilteredPersons(persons.filter(person =>
      person.name.toLowerCase().includes(event.target.value.toLowerCase())
    ))
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <FilterForm searchFilter={searchFilter} handleFilterChange={handleFilterChange} />
      <h2>Add New Number</h2>
      <AddNumberForm addName={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} />
    </div>
  )

}

export default App
import { useState } from 'react'
import Persons from "./components/Persons"
import FilterForm from './components/FilterForm'
import AddNumberForm from './components/AddNumberForm'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Koira Koiranen', number: '0440609578', id: '1' },
    { name: 'Kissa Kissanen', number: '0503864895', id: '2' },
    { name: 'Marsu Marsukainen-Ylähyyppä', number: '0451264768', id: '3' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchFilter, setSearchFilter] = useState('')
  const [filteredPersons, setFilteredPersons] = useState(persons)

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
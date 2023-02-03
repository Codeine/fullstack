import { useState } from 'react'

const Filter = ({ filter, onChange }) => (
  <div>
    Filter shown with: <input value={filter} onChange={onChange} />
  </div>
)

const PersonForm = ({ onSubmit, newName, onNameChange, newNumber, onNumberChange }) => (
  <form onSubmit={onSubmit}>
    <div>
      name: <input value={newName} onChange={onNameChange} />
      <br />
      phone: <input value={newNumber} onChange={onNumberChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

const PersonDetails = ({ person }) => (
  <li>{person.name} - {person.number}</li>
)

const Persons = ({ persons }) => (
  <ul>
    {persons.map(person => <PersonDetails key={person.id} person={person} />)}
  </ul>
)

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setNewFilter] = useState('')

  const handleNameChanged = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChanged = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChanged = (event) => {
    setNewFilter(event.target.value)
  }

  const checkIfNameExists = () => {
    let exists = false
    persons.forEach(person => {
      if (person.name === newName) {
        exists = true
        return
      }
    })
    return exists
  }

  const addPerson = (event) => {
    event.preventDefault()

    if (newName === '' || newNumber === '') {
      alert('Name and/or phone cannot be empty')
      return
    }

    if (checkIfNameExists()) {
      alert(`'${newName}' is already added to phonebook`)
      return
    }

    const person = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }

    setPersons(persons.concat(person))
    setNewName('')
    setNewNumber('')
  }

  const personsToShow = filter === ''
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} onChange={handleFilterChanged} />
      <h2>Add new person</h2>
      <PersonForm
        onSubmit={addPerson}
        newName={newName}
        onNameChange={handleNameChanged}
        newNumber={newNumber}
        onNumberChange={handleNumberChanged}
      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} />
    </div>
  )
}

export default App
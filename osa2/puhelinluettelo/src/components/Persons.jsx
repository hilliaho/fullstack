const Persons = ({ persons }) => {
    return (
        persons.map(person =>
            <Name key={person.id} name={person.name} number={person.number} />
        )
    )
}

const Name = ({ name, number }) => <p>{name} {number}</p>

export default Persons
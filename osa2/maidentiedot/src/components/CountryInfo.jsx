const CountryInfo = ({ country, weatherApi }) => {
    const temperature = weatherApi.getAll()
    return (
        <div>
            <h1>{country.name.official}</h1>
            <p>capital {country.capital}</p>
            <p>area {country.area}</p>
            <h3>languages:</h3>
            <ul>
                {Object.values(country.languages).map((language, index) => (
                    <li key={index}>{language}</li>
                ))}
            </ul>
            <img src={country.flags.png} />
            <h2>Weather in {country.capital}</h2>
            <p>temperature {temperature}</p>
            <p>wind</p>
        </div>
    )
}

export default CountryInfo
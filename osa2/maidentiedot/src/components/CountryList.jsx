const CountryList = ({ countries, showInfoHandler }) => {
    return (
        <ul>
            {countries.map((country, index) => (
                <Country key={index} country={country} index={index} showInfoHandler={showInfoHandler} />
            ))}
        </ul>
    )
}

const Country = ({ country, index, showInfoHandler }) => {
    return (
        <div>
            <li key={index}>{country.name.official}<button onClick={() => showInfoHandler(country)}>show</button></li>
        </div>
    )
}


export default CountryList
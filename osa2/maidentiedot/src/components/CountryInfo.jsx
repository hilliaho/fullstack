const CountryInfo = ({ country, weather }) => {
    const temperature = weather ? weather.main.temp -272.15 : 5;
    const wind = weather ? weather.wind.speed : 3;
    const icon = weather ? weather.weather[0].icon : '04';
    console.log('icon: ', icon)
    const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`
    console.log(iconUrl)
    console.log(weather)
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
            <p>temperature {temperature.toFixed(2)} Celsius</p>
            <img src={iconUrl}/>
            <p>wind {wind} m/s</p>
        </div>
    )
}

export default CountryInfo
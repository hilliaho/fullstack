import { useState, useEffect } from 'react'
import apiService from './services/apiService'
import weatherApiService from './services/weatherApiService'
import CountryList from './components/CountryList'
import CountryInfo from './components/CountryInfo'

function App() {
  const [countries, setCountries] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredCountries, setFilteredCountries] = useState([])
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    apiService
      .getAll().then((countries) => setCountries(countries))
      .catch((error) => {
        console.log('error' + error)
      })
  }, [])

  useEffect(() => {
    if (filteredCountries.length===1){
    weatherApiService
    .getAll(filteredCountries[0]).then((response) => setWeather(response))
    .catch((error) => {
      console.log('error' + error)
    })
    }
  }, [filteredCountries])

  const search = (event) => {
    const newSearchTerm = event.target.value
    setSearchTerm(newSearchTerm)
    setFilteredCountries(countries.filter((country) => country.name.official.toLowerCase().includes(newSearchTerm.toLowerCase())))
  }

  const showInfoHandler = (displayedCountry) => {
    setFilteredCountries([displayedCountry])
  }

  return (
    <div>
      <h1>Maiden tiedot</h1>
      <label>
        find countries
        <input value={searchTerm} onChange={search} />
      </label>
      {filteredCountries.length > 10 && <p>hae lisää</p>}
      {filteredCountries.length <= 10 && filteredCountries.length > 1 && <CountryList countries={filteredCountries} showInfoHandler={showInfoHandler} />}
      {filteredCountries.length == 1 && <CountryInfo country={filteredCountries[0]} weather={weather} />}
    </div>
  )
}

export default App

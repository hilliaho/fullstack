const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

const getAll = (capitalCity) => {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${capitalCity}&units=metric&appid=${apiKey}`

    try {
        const response = fetch(weatherUrl)
        const data = response.json()
        setWeather(data)  // Tallenna säätiedot tilaan
    } catch (error) {
        console.error('Error fetching weather data:', error)
    }
    return ('viisi astetta')
}

export default {
    getAll: getAll
}



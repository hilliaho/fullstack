import axios from 'axios'

const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

const getAll = (country) => {
    const latitude = country.latlng[0]
    const longitude = country.latlng[1]
    const weatherData = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
    const request = axios.get(weatherData)
    return request.then(response => response.data)
}

export default {
    getAll: getAll
}



import dayjs, { type Dayjs } from 'dayjs'
import dotenv from 'dotenv'

dotenv.config()

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  lat:  number
  lon: number
}
// TODO: Define a class for the Weather object
export class Weather {
  id: number
  main:string
  date: Dayjs | string
  description: string
  icon:string

  constructor(id: number, main:string, date: Dayjs | string, description:string, icon:string) {
    this.id = id
    this.main = main
    this.date = date
    this.description = description
    this.icon  = icon
  }
}
// TODO: Complete the WeatherService class
async function WeatherService( cityName:string) {
  //Build URL for getting coordinates from city name
  const baseURL = process.env.API_BASE_URL
  const APIKey = process.env.API_KEY

  const geoURL = `${baseURL}geo/1.0/direct?q=${cityName}&limit=1&appid=${APIKey}`
  console.log(geoURL)
  //Fetch request to get coordinates for city
  const geoCord = await fetch(geoURL).then(response => response.json())
  //Build URL for getting weather based on coordinates
  const coord: Coordinates = {
    lat:geoCord[0].lat,
    lon:geoCord[0].lon
  }
  const weatherURL = `${baseURL}data/2.5/forecast?lat=${coord.lat}&lon=${coord.lon}&appid=${APIKey}`

  console.log(weatherURL)

  //Fetch request to get weather for coordinates
  const weather: Weather = await fetch(weatherURL).then(response => response.json())
  //Return weather
  console.log('Weather ' + weather)
  return weather
}

export default WeatherService

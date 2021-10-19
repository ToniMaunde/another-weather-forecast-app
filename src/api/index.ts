const requestHeaders: RequestInit = {method:'GET', mode: 'cors'}

export const getCurrentWeatherInformation = async (city: string, apiKey: string, temperatureSystem: string) => {
  const URL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=${temperatureSystem}&appid=${apiKey}`

  try {
    const result = await fetch(URL, requestHeaders)
    return await result.json()
  } catch (error) {
    console.log({error})
  }
}

export const getForecastWeatherInformation = async (lat:number, lon: number, apiKey: string, temperatureSystem: string) => {
  const URL = `https://api.openweathermap.org/data/2.5/onecall?units=${temperatureSystem}&lat=${lat}&lon=${lon}&appid=${apiKey}`

  try {
    const result = await fetch(URL, requestHeaders)
    return await result.json()
  } catch (error) {
    console.log({error})
  }
}


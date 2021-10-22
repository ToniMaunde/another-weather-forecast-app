const requestHeaders: RequestInit = {method:'GET', mode: 'cors'}

export const getCurrentWeatherInformation = async (city: string, apiKey: string, measurementSystem: string) => {
  const URL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=${measurementSystem}&appid=${apiKey}`

  try {
    const result = await fetch(URL, requestHeaders)
    return await result.json()
  } catch (error) {
    console.log({error})
  }
}

export const getForecastWeatherInformation = async (city: string, apiKey: string, measurementSystem: string) => {
  const URL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${measurementSystem}&appid=${apiKey}`

  try {
    const result = await fetch(URL, requestHeaders)
    return await result.json()
  } catch (error) {
    console.log({error})
  }
}


const requestHeaders: RequestInit = {method:'GET', mode: 'cors'}

export const getCurrentWeatherInformation = async (city: string, apiKey: string, measurementSystem: string) => {
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${measurementSystem}&appid=${apiKey}`

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

export const getCityTemperatureMap = async (zoomLevel: number, apiKey: string): Promise<string> => {
  const URL = `https://tile.openweathermap.org/map/temp/${zoomLevel}/0/0.png?appid=${apiKey}`

  try {
    const result = await fetch(URL, requestHeaders)
    const arrayBuffer = await result.arrayBuffer()
    const b64Data = btoa(
      new Uint8Array(arrayBuffer)
        .reduce((dataArray, byte) => `${dataArray}${String.fromCharCode(byte)}`, '')
    )
    return `data:image/png;base64,${b64Data}`
  } catch (error) {
    return ''
  }
}


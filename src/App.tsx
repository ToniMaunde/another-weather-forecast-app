import { useState } from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { weatherApiKey } from './api/apiKey'
import { getCurrentWeatherInformation, getForecastWeatherInformation } from  "./api/index"
import { WeatherForecast, IGeoLocation } from './types'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import styled from 'styled-components'
import Forecast from './components/Forecast'

const AppContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 1.6rem;
`

const SubmitButton = styled.button`
  font-family: 'Open Sans', sans-serif;
  width: fit-content;
  margin: 0 auto;
  padding: 0.4rem 1.2rem;
  background-color: var(--clr-primary);
  color: #fff;
  border: none;
  border-radius: 2px;
  &:disabled {
    background-color: var(--clr-tertiary);
  }
`

const ErrorMessage = styled.span`
  color: red;
  font-size: var(--fs-3);
  margin: -1rem 0 1rem 0;
`

const CurrentCity = styled.p`
  font-size: var(--fs-6);
  font-weight: 600;
  text-align: center;
  color: var(--clr-primary);
  margin-bottom: 2rem;
`

function App() {
  const [weatherData, setWeatherData] = useState<Array<WeatherForecast>>([])
  const [temperatureUnit, setTemperatureUnit] = useState('')
  const [isDataReady, setIsDataReady] = useState(false)
  const [geoLocation, setGeoLocation] = useState<IGeoLocation>({lat: 0, lon: 0})
  const [currentCityResults, setCurrentCity] = useState('')
  const [cityNotFound, setCityNotFound] = useState(false)

  const FormValidationSchema = Yup.object().shape({
    city: Yup.string()
      .required('Introduza o nome de uma cidade.'),
    temp: Yup.string()
      .required('Escolha uma unidade.')
  })

  const temperatureSystem = (temp: string): string => {
    if (temp === 'Celsius') return 'metric'
    return 'imperial'
  }

  const temperatureUnitShortName = () => {
    if (temperatureUnit === 'Celsius') return 'C'
    return 'F'
  }

  const isGeoLocationDifferent = (oldGeoLocation: IGeoLocation, newLat: number, newLon: number) => {
    const {lat: oldLat, lon: oldLon} = oldGeoLocation
    if (oldLat === newLat && oldLon === newLon) return false
    return true
  }

  const temperatureUnitChanged = (newTemperatureUnit: string) => {
    if (newTemperatureUnit !== temperatureUnit) return true
    return false
  }

  const convertTemperature = (temp: number, newUnit: string): string => {
    if (newUnit === 'Fahrenheit') return ((temp * (9/5)) + 32).toFixed(2)
    return ((temp - 32) * 5/9).toFixed(2)
  }

  const newWeatherDataMapper = (wd: WeatherForecast, temp: string) => {
    const newMin = convertTemperature(wd.temp.min, temp)
    const newMax = convertTemperature(wd.temp.max, temp)

    return {
      dt: wd.dt,
      feels_like: wd.feels_like,
      humidity: wd.humidity,
      weather: wd.weather,
      wind_speed: wd.wind_speed,
      temp: {
        day: wd.temp.day,
        morn: wd.temp.morn,
        night: wd.temp.night,
        min: parseFloat(newMin),
        max: parseFloat(newMax)
      }
    }
  }

  const getData = (values: {city: string, temp: string}, setSubmitting: Function) => {
    getCurrentWeatherInformation(values.city, weatherApiKey, temperatureSystem(values.temp))
      .then(({coord}) => {
        const {lat, lon} = coord;
        setGeoLocation({lat, lon})

        if (!isGeoLocationDifferent(geoLocation, lat, lon) && temperatureUnitChanged(values.temp)) {
          setWeatherData((currentData) => {
            const newWeatherData = currentData.map(wd => newWeatherDataMapper(wd, values.temp))
            return newWeatherData
          })
          setIsDataReady(true)
          setSubmitting(false)

        } else if (isGeoLocationDifferent(geoLocation, lat, lon) || temperatureUnitChanged(values.temp)) {
          getForecastWeatherInformation(lat, lon, weatherApiKey, temperatureSystem(values.temp))
            .then((data) => {
              console.log({data})
              setIsDataReady(false)
              const weatherDataForFiveDays = data.daily.slice(0, 5)
              setWeatherData(() => [...weatherDataForFiveDays])
              setIsDataReady(true)
              setSubmitting(false)
            })
        } else setSubmitting(false)
      })
      .catch(() => {
        setSubmitting(false)
        setCityNotFound(true)
      })
  }

  return (
    <div className="App">
      <Navbar />
      <AppContainer>
      <Formik
          initialValues={{city: '', temp: ''}}
          validationSchema= {FormValidationSchema}
          onSubmit={(values, {setSubmitting}) => {
            setTemperatureUnit(values.temp)
            setCityNotFound(false)
            setCurrentCity(values.city)
            getData(values, setSubmitting)
          }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting
            }) => {
              return (
                <Form onSubmit={handleSubmit} className="form">
                  <p>Unidade de medida da temperatura</p>
                  <span role="group" aria-labelledby="radio-group" className="temperature-unit">
                    <label className="radio">
                      <span className="radio__input">
                        <Field
                          type="radio"
                          name="temp"
                          value="Celsius"
                        />
                        <span className="radio__control"></span>
                      </span>
                      <span className="radio__label">Celsius</span>
                    </label>

                    <label className="radio">
                      <span className="radio__input">
                        <Field
                          type="radio"
                          name="temp"
                          value="Fahrenheit"
                        />
                        <span className="radio__control"></span>
                      </span>
                      <span className="radio__label">Fahrenheit</span>
                    </label>
                  </span>
                  {errors.temp && (<ErrorMessage>{errors.temp}</ErrorMessage>)}

                  <label className="label">
                    Nome da cidade
                    <Field
                      type="text"
                      inputMode="text"
                      name="city"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.city}
                      autoComplete="false"
                    />
                  </label>

                  {errors.city && (<ErrorMessage>{errors.city}</ErrorMessage>)}
                  {cityNotFound && (<ErrorMessage>Nome da cidade inválido.</ErrorMessage>)}

                  <SubmitButton type="submit" disabled={isSubmitting}>
                    Ver previsão
                  </SubmitButton>
                </Form>
              )
            }}
        </Formik>

        {!cityNotFound && <CurrentCity>{currentCityResults}</CurrentCity>}

        <Forecast
          isDataReady={isDataReady}
          cityNotFound={!cityNotFound}
          weatherData={weatherData}
          temperatureUnitShortName={temperatureUnitShortName()}
        />
      </AppContainer>
      <Footer />
    </div>
  )
}

export default App

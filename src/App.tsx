import { useState } from 'react'
import { Formik, Form, Field } from 'formik'
import { weatherApiKey } from './api/apiKey'
import { getCurrentWeatherInformation, getForecastWeatherInformation } from  "./api/index"
import { WeatherForecast } from './types'
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

function App() {
  interface FormValues {
    city: string;
    temperatureUnit: string;
  }

  interface FormError {
    city?: string;
    temperatureUnit?: string;
  }

  interface IGeoLocation {
    lat: number;
    lon: number;
  }

  const [weatherData, setWeatherData] = useState<Array<WeatherForecast>>([])
  const [temperatureUnit, setTemperatureUnit] = useState('')
  const [isDataReady, setIsDataReady] = useState(false)
  const [geoLocation, setGeoLocation] = useState<IGeoLocation>({lat: 0, lon: 0})
  const cities = ['Maputo', 'London', 'Luanda', 'Lisboa', 'Porto', 'Brasilia', 'New York']
  const errorMessage = ''

  const temperatureSystem = () => temperatureUnit === 'Celsius' ? 'metric': 'imperial'

  const temperatureUnitShortName = () => temperatureUnit === 'Celsius' ? 'C' : 'F'

  const isGeoLocationDifferent = (oldGeoLocation: IGeoLocation, newLat: number, newLon: number) => {
    const {lat: oldLat, lon: oldLon} = oldGeoLocation
    if (oldLat === newLat && oldLon === newLon) return false
    return true
  }

  return (
    <div className="App">
      <Navbar />
      <AppContainer>
      <Formik
          initialValues={{city: '', temp: ''}}
          validate={values => {
            const errors: FormError = {};
            if(!values.city) errors.city = errorMessage;
            return errors;
          }}
          onSubmit={(values, {setSubmitting}) => {
            console.log(values)
            // getCurrentWeatherInformation(values.city, weatherApiKey, temperatureSystem())
            //   .then(({coord}) => {
            //     const {lat, lon} = coord;
            //     setGeoLocation({lat, lon})
            //     if (isGeoLocationDifferent(geoLocation, lat, lon)) {
            //       getForecastWeatherInformation(lat, lon, weatherApiKey, temperatureSystem())
            //       .then((data) => {
            //         setIsDataReady(false)
            //         console.log({data})
            //         setWeatherData(() => data.current)
            //         const weatherDataForFiveDays = data.daily.slice(1, 6)
            //         setWeatherData((previousState) => [previousState, ...weatherDataForFiveDays])
            //         setIsDataReady(true)
            //         setSubmitting(false)
            //       })
            //     } else setSubmitting(false)
            //   })
            //   .catch((error) => console.log({error}))
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
                        <Field type="radio" name="temp" value="Celsius"/>
                        <span className="radio__control"></span>
                      </span>
                      <span className="radio__label">Celsius</span>
                    </label>

                    <label className="radio">
                      <span className="radio__input">
                        <Field type="radio" name="temp" value="Fahrenheit"/>
                        <span className="radio__control"></span>
                      </span>
                      <span className="radio__label">Fahrenheit</span>
                    </label>
                  </span>

                  <label className="label">
                    Nome da cidade
                    <Field
                      type="text"
                      inputMode="text"
                      name="city"
                      required
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.city}
                      list="city-list"
                    />
                    <span>
                      {errors.city && touched.city && errors.city}
                    </span>
                  </label>

                  <datalist id="city-list">
                    {cities?.map((city, idx) => (
                      <option value={city} key={idx}>{city}</option>
                    ))}
                  </datalist>

                  <SubmitButton type="submit" disabled={isSubmitting}>
                    Ver previsão
                  </SubmitButton>
                </Form>
              )
            }}
        </Formik>
        <Forecast isDataReady={isDataReady} weatherData={weatherData}
          temperatureUnitShortName={temperatureUnitShortName()} />
      </AppContainer>
      <Footer />
    </div>
  )
}

export default App

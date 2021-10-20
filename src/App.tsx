import { useState } from 'react'
import { Formik } from 'formik'
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

const Form = styled.form`
  margin: 1rem 0 2.6rem 0;
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

  const [weatherData, setWeatherData] = useState<Array<WeatherForecast>>([])
  const [temperatureUnit, setTemperatureUnit] = useState('Celsius')
  const [isDataReady, setIsDataReady] = useState(false)
  const cities = ['Maputo', 'London', 'Luanda', 'Lisboa', 'Porto', 'Brasilia', 'New York']
  const errorMessage = ''

  const temperatureSystem = () => temperatureUnit === 'Celsius' ? 'metric': 'imperial'
  const temperatureUnitShortName = () => temperatureUnit === 'Celsius' ? 'C' : 'F'

  return (
    <div className="App">
      <Navbar />
      <AppContainer>
      <Formik
          initialValues={{city: '', temperatureUnit: 'Celsius'}}
          validate={values => {
            const errors: FormError = {};
            if(!values.city) errors.city = errorMessage;
            return errors;
          }}
          onSubmit={(values, {setSubmitting}) => {
            getCurrentWeatherInformation(values.city, weatherApiKey, temperatureSystem())
              .then(({coord}) => {
                const {lat, lon} = coord;
                getForecastWeatherInformation(lat, lon, weatherApiKey, temperatureSystem())
                  .then((data) => {
                    setIsDataReady(false)
                    console.log({data})
                    setWeatherData(() => data.current)
                    const weatherDataForFiveDays = data.daily.slice(1, 6)
                    setWeatherData((previousState) => [previousState, ...weatherDataForFiveDays])
                    setIsDataReady(true)
                    setSubmitting(false);
                  })
              })
              .catch((error) => console.log({error}))
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
                <Form onSubmit={handleSubmit}>
                  <label>
                    Introduza o nome da cidade
                    <input type="text" inputMode="text" name="city"
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

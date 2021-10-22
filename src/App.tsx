import { useState } from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { weatherApiKey } from './api/apiKey'
import { getCurrentWeatherInformation, getForecastWeatherInformation } from  "./api/index"
import { WeatherForecast, GroupedWeatherForecast } from './types'
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
  const [groupedWeatherData, setGroupedWeatherData] = useState<Array<GroupedWeatherForecast>>([])
  const [temperatureUnit, setTemperatureUnit] = useState('')
  const [isDataReady, setIsDataReady] = useState(false)
  const [cityID, setCityID] = useState<number>(0)
  const [currentCityResults, setCurrentCity] = useState('')
  const [cityNotFound, setCityNotFound] = useState(false)


  const FormValidationSchema = Yup.object().shape({
    city: Yup.string()
      .required('Introduza o nome de uma cidade.'),
    temp: Yup.string()
      .required('Escolha uma unidade.')
  })

  const measurementSystem = (temp: string): string => {
    if (temp === 'Celsius') return 'metric'
    return 'imperial'
  }

  const temperatureUnitShortName = () => {
    if (temperatureUnit === 'Celsius') return 'C'
    return 'F'
  }

  const isCityIDDifferent = (oldCityID: number, newCityID: number) => {
    if (oldCityID === newCityID) return false
    return true
  }

  const didTempUnitChange = (newTemperatureUnit: string) => {
    if (newTemperatureUnit !== temperatureUnit) return true
    return false
  }

  const convertTemperature = (temp: number, newUnit: string): string => {
    if (newUnit === 'Fahrenheit') return ((temp * (9/5)) + 32).toFixed(2)
    return ((temp - 32) * 5/9).toFixed(2)
  }

  const newWeatherDataMapper = (wd: WeatherForecast, temp: string) => {
    const newMin = convertTemperature(wd.main.temp_min, temp)
    const newMax = convertTemperature(wd.main.temp_max, temp)

    return {
      dt: wd.dt,
      weather: wd.weather,
      main: {
        temp: wd.main.temp,
        feels_like: wd.main.feels_like,
        temp_min: parseFloat(newMin),
        temp_max: parseFloat(newMax)
      }
    }
  }

  const formattedDate = (epoch: number): string => {
    return new Date(epoch * 1000)
      .toLocaleDateString('pt-PT', {weekday: 'long', month: 'long', day: '2-digit'})
  }

  const getAllDates = (array: Array<WeatherForecast>) => {
    const allDates = array.map(d => formattedDate(d.dt))

    return {
      allDates,
      array
    }
  }

  const removeDuplicates = (list: string[]) => {
    const set = new Set<string>()
    list.forEach((el) => set.add(el))
    return new Array<string>(...set)
  }

  const removeDuplicatesAndGroup = (listOfDates: string[], array:Array<WeatherForecast>)
    : Array<GroupedWeatherForecast> => {
    const arrayWithoutDuplicates: string[] = removeDuplicates(listOfDates)

    const groupedData = arrayWithoutDuplicates.map(d => {
      const temps = array.filter(dd => d === formattedDate(dd.dt))

      const result: GroupedWeatherForecast = {date: d,  weatherThroughOutDay: temps}

      return result
    })

    return groupedData
  }

  const groupWeatherForecastData = (data: Array<WeatherForecast>) => {
    const allDates = getAllDates(data)
    return removeDuplicatesAndGroup(allDates.allDates, allDates.array)
  }

  const getData = (values: {city: string, temp: string}, setSubmitting: Function) => {
    getCurrentWeatherInformation(values.city, weatherApiKey, measurementSystem(values.temp))
      .then(data => {
        setCityID(data.id)

        if (!isCityIDDifferent(cityID, data.id) && didTempUnitChange(values.temp)) {
          setWeatherData((currentData) => {
            const newWeatherData = currentData.map(wd => newWeatherDataMapper(wd, values.temp))
            return newWeatherData
          })
          setIsDataReady(true)
          setSubmitting(false)

        } else if (isCityIDDifferent(cityID, data.id) || didTempUnitChange(values.temp)) {
          getForecastWeatherInformation(values.city, weatherApiKey, measurementSystem(values.temp))
            .then(data => {
              setIsDataReady(false)
              const forecastForFiveDays: Array<WeatherForecast> = data.list
              setGroupedWeatherData(() => [...groupWeatherForecastData(forecastForFiveDays)])
              setIsDataReady(true)
              setSubmitting(false)
              console.log({data})
            })
        } else setSubmitting(false)
      })
      .catch((error) => {
        console.log({error})
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

        {/* <Forecast
          isDataReady={isDataReady}
          cityNotFound={cityNotFound}
          weatherData={weatherData}
          temperatureUnitShortName={temperatureUnitShortName()}
        /> */}
      </AppContainer>
      <Footer />
    </div>
  )
}

export default App

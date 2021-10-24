import { useState } from 'react'
import { Formik, Form, Field} from 'formik'
import * as Yup from 'yup'
import { weatherApiKey } from './api/apiKey'
import { getCurrentWeatherInformation, getForecastWeatherInformation, getCityTemperatureMap } from  "./api/index"
import { WeatherForecast, GroupedWeatherForecast, CurrentMinMax } from './types'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import styled from 'styled-components'
import Forecast from './components/Forecast'
import searchIcon from './assets/search.svg'

const AppContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 1.6rem;

  @media(min-width: 768px) {
    padding: 2rem 4.6rem;
  }

  @media(min-width: 1024px) {
    padding: 4rem 8rem;
  }

  @media(min-width: 1440px) {
    padding: 4rem 18rem;
  }
`

const SubmitButton = styled.button`
  font-family: 'Montserrat', sans-serif;
  width: fit-content;
  padding: 0.6rem 1.2rem;
  background-color: var(--clr-secondary);
  border: none;
  border-radius: 0 10px 10px 0;
  z-index: 10;
  top: 31px;
  right: 3px;
  position: absolute;
  &:disabled {
    background-color: var(--clr-tertiary);
  }
`

const ErrorMessage = styled.span`
  color: #cf7f7f;
  font-size: var(--fs-3);
  margin: -1rem 0 1rem 0;
`

function App() {
  const [groupedWeatherData, setGroupedWeatherData] = useState<Array<GroupedWeatherForecast>>([])
  const [temperatureUnit, setTemperatureUnit] = useState('')
  const [currentMinMax, setCurrenMinMax] = useState<CurrentMinMax>({min: 0, max: 0, icon: ''})
  const [isDataReady, setIsDataReady] = useState(false)
  const [cityID, setCityID] = useState<number>(0)
  const [cityNotFound, setCityNotFound] = useState(false)
  const [temperatureMap, setTemperatureMap] = useState<string>('')

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

  const newWeatherDataMapper = (gwf: GroupedWeatherForecast[], temp: string): GroupedWeatherForecast[] => {
    return gwf.map(el => {
      const elementOfTheArray = el.weatherThroughOutDay.map(ell => {
        const newMin = convertTemperature(ell.main.temp_min, temp)
        const newMax = convertTemperature(ell.main.temp_max, temp)
        const newFeelsLike = convertTemperature(ell.main.feels_like, temp)
        const newTemp = convertTemperature(ell.main.temp, temp)

        const newWeatherThroughOutTheDay: WeatherForecast = {
          dt: ell.dt,
          main: {
          feels_like: parseFloat(newFeelsLike),
          temp: parseFloat(newTemp),
          temp_min: parseFloat(newMin),
          temp_max: parseFloat(newMax)
          },
          weather: ell.weather
        }

        return { ...newWeatherThroughOutTheDay }
      })
      return {
        date: el.date,
        weatherThroughOutDay: elementOfTheArray
      }
    })
  }

  const formattedDate = (epoch: number): string => {
    return new Date(epoch * 1000)
      .toLocaleDateString('pt-PT', {weekday: 'long'})
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

  const removeDuplicatesAndGroup = (listOfDates: string[], array: WeatherForecast[])
    : GroupedWeatherForecast[] => {
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
        setCurrenMinMax({
          min: data.main.temp_min,
          max: data.main.temp_max,
          icon: data.weather[0].icon
        })

        if (!isCityIDDifferent(cityID, data.id) && didTempUnitChange(values.temp)) {
          setGroupedWeatherData((prev) => {
            return newWeatherDataMapper(prev, values.temp)
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
            })
            .finally(() => {
              getCityTemperatureMap(1, weatherApiKey)
                .then(data => setTemperatureMap(data))
            })
        } else setSubmitting(false)
      })
      .catch((error) => {
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
            getData(values, setSubmitting)
          }}
          >
            {({
              values,
              errors,
              handleChange,
              handleBlur,
              touched,
              handleSubmit,
              isSubmitting
            }) => {
              return (
                <Form onSubmit={handleSubmit} className="form">
                  <p>Temperatura em °</p>
                  <span role="group" aria-labelledby="radio-group" className="temperature-unit">
                    <label className="radio">
                      <span className="radio__input">
                        <Field
                          type="radio"
                          name="temp"
                          value="Celsius"
                          onChange={handleChange}
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
                          onChange={handleChange}
                        />
                        <span className="radio__control"></span>
                      </span>
                      <span className="radio__label">Fahrenheit</span>
                    </label>
                  </span>
                  {errors.temp && touched.temp && (<ErrorMessage>{errors.temp}</ErrorMessage>)}

                  <span className="input-and-button">
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
                      <SubmitButton type="submit" disabled={isSubmitting}>
                        <img
                          aria-hidden="true"
                          src={searchIcon}
                          alt="a search icon"
                        />
                      </SubmitButton>
                    </label>

                    {errors.city && touched.city && (
                      <>
                        <ErrorMessage>{errors.city}</ErrorMessage> <br />
                      </>
                    )}
                    {cityNotFound && (<ErrorMessage>Nome da cidade inválido.</ErrorMessage>)}
                  </span>
                </Form>
              )
            }}
        </Formik>

        <Forecast
          isDataReady={isDataReady}
          cityNotFound={cityNotFound}
          groupedWeatherData={groupedWeatherData}
          currentMinMax={currentMinMax}
          temperatureMap={temperatureMap}
        />
      </AppContainer>
      <Footer />
    </div>
  )
}

export default App

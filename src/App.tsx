import { useEffect, useState } from 'react'
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
  const [weatherData, setWeatherData] = useState<Array<WeatherForecast>>([])
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

  const getAllDates = (array: Array<WeatherForecast>) => {
    const allDates = array.map((d) => new Date(d.dt * 1000)
      .toLocaleDateString('pt-PT', {weekday: 'long', 'month': 'long', day: '2-digit'}))
    return {
      allDates,
      array
    }
  }


  const removeDuplicatesAndGroup = (listOfDates: string[], array:Array<WeatherForecast>):Array<GroupedWeatherForecast> => {
    const setForRemovingDuplicates = new Set<string>()
    listOfDates.forEach((wd) => setForRemovingDuplicates.add(wd))
    const arrayWithoutDuplicates: string[] = [...setForRemovingDuplicates]

    const isAMatch = (wdf: WeatherForecast, aDate: string): boolean => {
      const dateForComparison = new Date(wdf.dt! * 1000).toLocaleDateString('pt-PT', {weekday: 'long', month: 'long', day: '2-digit'})
      return aDate === dateForComparison
    }

    const groupedData = arrayWithoutDuplicates.map((d) => {
        // const tempsOnThisDay = weatherData.filter((dd) => d === new Date(dd.dt * 1000)
        //   .toLocaleDateString('pt-PT', {weekday: 'long', month: 'long', day: '2-digit'}))
        // console.log({d})
        const temps = array.filter((dd)=>{
          console.log("date1 :" , d)
          console.log("date2 :" , dd)
          return d === new Date(dd.dt * 1000)
            .toLocaleDateString('pt-PT', {weekday: 'long', month: 'long', day: '2-digit'})
        })

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
      .then((data) => {
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
            .then((data) => {
              console.log({data})
              const forecastForFiveDays: Array<WeatherForecast> = data.list
              setIsDataReady(false)
              setWeatherData(() =>{ 
                setGroupedWeatherData([...groupWeatherForecastData([...forecastForFiveDays])])
                return [...forecastForFiveDays]
              })
              // const groupedData = groupWeatherForecastData(forecastForFiveDays)
              setGroupedWeatherData(() => [...groupWeatherForecastData(weatherData)])
              setIsDataReady(true)
              setSubmitting(false)
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

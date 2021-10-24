import styled from 'styled-components';
import { GroupedWeatherForecast, CurrentMinMax } from '../types';

interface ForecastProps {
  isDataReady: boolean;
  cityNotFound: boolean;
  groupedWeatherData: Array<GroupedWeatherForecast>;
  currentMinMax: CurrentMinMax;
  temperatureMap: string;
}

const TemperatureMap = styled.div`
  width: 100%;
  background-color: var(--clr-tertiary);
  padding: 1rem;
  margin-top: 2rem;
  border-radius: 10px;
  color: white;
`

const Forecast = (props: ForecastProps) => {
  const {
    isDataReady,
    cityNotFound,
    groupedWeatherData,
    currentMinMax,
    temperatureMap
  } = props;
  const baseURL = 'https://openweathermap.org/img/wn/'

  const formattedTime = (dt: number): string => {
    return new Date(dt * 1000).toLocaleTimeString('pt-PT', {hour: '2-digit', minute: '2-digit'})
  }

  return (
    <>
      <ul className="forecast">
        {isDataReady && !cityNotFound && groupedWeatherData.map((wd, idx) => (
          <li className="forecast__item" key={idx}>
            <div className="forecast__title">
              <span className="forecast__weekday">{wd.date}</span>
              {idx===0 ? (
                <>
                  <span className="forecast__min-max">{`${currentMinMax.max}° ${currentMinMax.min}°`}</span>
                  <img src={`${baseURL}${currentMinMax.icon}@2x.png`} />
                </>
              ) : ''}
            </div>
            <ul className="forecast__temps">
              {wd.weatherThroughOutDay.map((wtd, idx) => (
                <div className="forecast__temp-period" key={idx}>
                  <span className="forecast__time">{formattedTime(wtd.dt)}</span>
                  <img src={`${baseURL}${wtd.weather[0].icon}@2x.png`} alt={wtd.weather[0].description} />
                  <span>{`${wtd.main.temp_max}°`}</span>
                </div>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      {isDataReady && !cityNotFound &&
        <TemperatureMap>
          <p>Mapa de Temperatura</p>
          {temperatureMap.length > 0 && (<img src={temperatureMap} alt="temperature map"/>) }
        </TemperatureMap>
      }
    </>
  )
}
export default Forecast
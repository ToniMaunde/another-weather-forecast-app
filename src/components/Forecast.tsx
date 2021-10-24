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

  @media(min-width: 768px) {
    padding: 2rem;
  }

  @media(min-width: 1024px) {
    padding: 4rem;
  }
`

const ForecastContainer = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
  background-color: var(--clr-tertiary);
  border-radius: 10px;

  @media(min-width: 768px) {
    .forecast__item {
      padding: 2rem 2rem 1rem 2rem;

      .forecast__min-max {
        margin-left: 10rem;
      }

      .forecast__temp-period {
        margin-right: 1.6rem;
        margin-left: 0;
        min-width: 56.61px;
      }
    }

    img {
      width: 4rem;
      height: auto;
    }

    .forecast__temps::-webkit-scrollbar {
      display: none;
    }
  }

  @media(min-width: 1024px) {
    .forecast__item {
      padding: 2rem 5rem 2rem 5rem;

      .forecast__min-max {
        margin-left: 15rem;
      }

      .forecast__temp-period {
        margin-right: 1.6rem;
        margin-left: 0;
      }
    }

    img {
      width: 4rem;
      height: auto;
    }
  }
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
      <ForecastContainer className="forecast">
        {isDataReady && !cityNotFound && groupedWeatherData.map((wd, idx) => (
          <li className="forecast__item" key={idx}>
            <div className="forecast__title">
              <span className="forecast__weekday">{wd.date}</span>
              {idx===0 ? (
                <>
                  <span className="forecast__min-max">{`${currentMinMax.max.toFixed(0)}° ${currentMinMax.min.toFixed(0)}°`}</span>
                  <img src={`${baseURL}${currentMinMax.icon}@2x.png`} />
                </>
              ) : ''}
            </div>
            <ul className="forecast__temps">
              {wd.weatherThroughOutDay.map((wtd, idx) => (
                <div className="forecast__temp-period" key={idx}>
                  <span className="forecast__time">{formattedTime(wtd.dt)}</span>
                  <img src={`${baseURL}${wtd.weather[0].icon}@2x.png`} alt={wtd.weather[0].description} />
                  <span>{`${wtd.main.temp_max.toFixed(0)}°`}</span>
                </div>
              ))}
            </ul>
          </li>
        ))}
      </ForecastContainer>
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
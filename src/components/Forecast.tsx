import { WeatherForecast } from "../types";

interface ForecastProps {
  isDataReady: boolean;
  cityNotFound: boolean;
  weatherData: Array<WeatherForecast>;
  temperatureUnitShortName: string
}

const Forecast = (props: ForecastProps) => {
  const {isDataReady, cityNotFound, weatherData, temperatureUnitShortName} = props;
  return (
    <ul className="forecast">
      {isDataReady && cityNotFound && weatherData.map((wd, idx) => (
        <li className="forecast__item" key={idx}>
          <div className="forecast__title">
            <p>{idx === 0 ? 'Temperatura atual' : 'Tempo para'}</p>
            <span>
              {
                idx === 0
                ? new Date(wd.dt * 1000).toLocaleDateString('pt-PT', {weekday: 'long'})
                : new Date(wd.dt * 1000).toLocaleDateString('pt-PT', {weekday: 'long', month: '2-digit', day: 'numeric'})
              }
            </span>
          </div>
          <div className="forecast__temp">
            <img src={`https://openweathermap.org/img/wn/${wd.weather[0].icon}@2x.png`} alt={wd.weather[0].description} />
            <h2>{idx===0 ? wd.temp: wd.temp.day}° {temperatureUnitShortName}</h2>
          </div>
          <p className="forecast__description">
            {wd.weather[0].description}
          </p>
        </li>
      ))}
    </ul>
  )
}
export default Forecast
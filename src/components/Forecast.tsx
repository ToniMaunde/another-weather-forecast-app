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
            <p>
              {
                new Date(wd.dt * 1000).toLocaleDateString('pt-PT', {weekday: 'long', month: 'long', day: 'numeric'})
              }
            </p>
          </div>
          <div className="forecast__temp">
            <h2>{`${wd.temp.max} / ${wd.temp.min}° ${temperatureUnitShortName}`}</h2>
            <img src={`https://openweathermap.org/img/wn/${wd.weather[0].icon}@2x.png`} alt={wd.weather[0].description} />
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
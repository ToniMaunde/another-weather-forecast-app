import { GroupedWeatherForecast, CurrentMinMax } from "../types";

interface ForecastProps {
  isDataReady: boolean;
  cityNotFound: boolean;
  groupedWeatherData: Array<GroupedWeatherForecast>;
  currentMinMax: CurrentMinMax;
  temperatureMap: string;
}

export default function Forecast() {
  // const {
  //   isDataReady,
  //   cityNotFound,
  //   groupedWeatherData,
  //   currentMinMax,
  //   temperatureMap
  // } = props;
  const baseURL = "https://openweathermap.org/img/wn/"

  // const formattedTime = (dt: number): string => {
  //   return new Date(dt * 1000).toLocaleTimeString('pt-PT', {hour: '2-digit', minute: '2-digit'})
  // }

  return (
    <div className="mx-7 mt-4">
      <p className="mb-4 font-light text-xs text-secondary">Weather forecast for five days with 3-hour intervals.</p>
      <ul className="forecast-shadows bg-light-dark rounded">
        Container
      </ul>
    </div>
  )
};
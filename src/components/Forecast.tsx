import type { TranslationContextType } from "../providers/translationProvider";
import type { TranslationType } from "../utils/translation";
import { epochToTimeString, nameCase } from "../utils";
import type { GroupedWeatherForecast } from "../types";
import WeatherIcon from "./WeatherIcon";

type ForecastProps = { 
  data: Array<GroupedWeatherForecast>;
  cityName: string;
  languageContext: TranslationContextType | null;
  translation: TranslationType;
}

// TODO: Add animations to this component
export default function Forecast(props: ForecastProps) {
  const { data, cityName, languageContext, translation } = props;

  /*
    This function enables the caching of the weather condition icons
  */
  async function forecastIcon (iconName: string):Promise<string> {
    const BASE_URL = "https://openweathermap.org/img/wn/";
    const requestURL = `${BASE_URL}${iconName}@2x.png`;
    const requestOptions: RequestInit = {
      method: "GET",
      cache: "default"
    };
    const iconBlob = await (await fetch(requestURL, requestOptions)).blob();
    return URL.createObjectURL(iconBlob);
  };

  if (data.length === 0) return null;
  // TODO: Destructure this component
  return (
    <div className="mx-7 mt-4 mb-8">
      <p className="mb-4 text-xs text-light-primary dark:text-white">
        <span className="font-light">
          {
            languageContext?.language === "en-EN"
              ? translation.en.info
              : translation.pt.info
          }
        </span>
        <strong>{cityName}</strong>.
      </p>
      <ul className="flex flex-col p-2 space-y-6 forecast-shadows bg-white dark:bg-dark-secondary rounded">
        {
          data.map(({date, forecastInIntervals}, idx) => (
            <li key={`${idx}${date}`} className="flex flex-col">
              <p className="mb-2 text-light-primary dark:text-white font-semibold">
                {nameCase(date)}
              </p>
              <ul className="flex space-x-5 overflow-x-auto sb-thin">
                {
                  forecastInIntervals.map((forecast, index) => (
                    <li
                      key={`${index}${forecast.dt}`}
                      className="flex flex-col justify-center items-center"
                    >
                      <p className="text-light-secondary dark:text-dark-tertiary text-xs">
                        {epochToTimeString(forecast.dt)}
                      </p>
                      <WeatherIcon
                        className="w-8 h-auto"
                        url={forecastIcon(forecast.weather[0].icon)}
                        alt={forecast.weather[0].description}
                      />
                      <p className="text-light-primary dark:text-white">
                        {`${forecast.main.temp_max.toFixed(0)}°`}
                      </p>
                    </li>
                  ))
                }
              </ul>
            </li>
          ))
        }
      </ul>
    </div>
  )
};
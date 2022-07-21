import type { TranslationContextType } from "../providers/translationProvider";
import type { TranslationType } from "../utils/translation";
import { epochToTimeString, nameCase } from "../utils";
import type { GroupedWeatherForecast } from "../types";

type ForecastProps = { 
  data: Array<GroupedWeatherForecast>;
  cityName: string;
  languageContext: TranslationContextType | null;
  translation: TranslationType;
}

// TODO: Add animations to this component
export default function Forecast(props: ForecastProps) {
  const { data, cityName, languageContext, translation } = props;

  // create a function that returns the url for the icon after a fetch request
  // function should return the same url when the icon is the same?
  // This URL is for rendering the weather condition icons from the API.
  const BASE_URL = "https://openweathermap.org/img/wn/";

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
                      <img
                        className="w-8 h-auto"
                        src={`${BASE_URL}${forecast.weather[0].icon}@2x.png`}
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
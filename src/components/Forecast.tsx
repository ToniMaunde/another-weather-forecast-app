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

  // This URL is for rendering the weather condition icons from the API.
  const BASE_URL = "https://openweathermap.org/img/wn/";

  if (data.length === 0) return null;

  return (
    <div className="mx-7 mt-4 mb-8">
      <p className="mb-4 text-xs text-secondary">
        <span className="font-light">
          {
            languageContext?.language === "en-EN"
              ? translation.en.info
              : translation.pt.info
          }
        </span>
        <strong>{cityName}</strong>.
      </p>
      <ul className="p-2 forecast-shadows bg-light-dark rounded">
        {
          data.map(({date, forecastInIntervals}, idx) => (
            <li key={`${idx}${date}`} className="flex flex-col mb-6">
              <p className="mb-2 text-secondary font-semibold">
                {nameCase(date)}
              </p>
              <ul className="flex space-x-5 overflow-x-auto sb-thin">
                {
                  forecastInIntervals.map((forecast, index) => (
                    <li
                      key={`${index}${forecast.dt}`}
                      className="flex flex-col justify-center items-center"
                    >
                      <p className="text-secondary text-xs">
                        {epochToTimeString(forecast.dt)}
                      </p>
                      <img
                        className="w-8 h-auto"
                        src={`${BASE_URL}${forecast.weather[0].icon}@2x.png`}
                        alt={forecast.weather[0].description}
                      />
                      <p className="text-light">
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
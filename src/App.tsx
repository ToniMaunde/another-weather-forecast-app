import { useMemo, useState, useContext } from "react";
import type { MouseEvent, ChangeEvent} from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Forecast from "./components/Forecast";
import { Icon } from "./components/Icon";
import searchIcon from "./assets/search";

import getWeatherForecast from "./api";
import { Language, TranslationContext } from "./providers/translationProvider";
import { groupWeatherForecast, addMeasurementSystem } from "./utils";
import type { HourForecastWithMS } from "./types";
import { translation } from "./utils/translation";

function App() {
  const languageContext = useContext(TranslationContext);
  const [measurementSystem, setSystem] = useState("metric");
  const [cityNotFound, setNotFound] = useState(false);
  const [userCity, setCity] = useState<{cityName: string, id: number}>({
    cityName: "",
    id: -1
  });
  const [weatherForecast, setWeatherForecast] = useState<HourForecastWithMS[]>([]);
  const groupedWeatherForecast = useMemo(
    () => groupWeatherForecast(weatherForecast, measurementSystem, languageContext?.language as Language),
    [weatherForecast, measurementSystem, languageContext]
  );

  async function fetchWeatherForecastForFiveDays(cityName: string, measurementSys: string) {
    const result = await getWeatherForecast(cityName, measurementSys);
  
    if (typeof result === "boolean") {
      throw new Error("An error occurred");
    }

    if (result.cod === "404"){
      setNotFound(true);
    } else {
      const forecastDataWithMeasurementSystem = addMeasurementSystem(result.list, measurementSystem);
      setWeatherForecast(forecastDataWithMeasurementSystem);
      setCity({cityName, id: result.city.id});
    }
  };

  function handleSubmit (event: MouseEvent<HTMLFormElement>) {
    setNotFound(false);
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    
    /* Here the variable is called measurement system because even though the field is shown as
      a temperature unit on the frontend, we are actually interested in the measurement system it
      belongs to since that's what the OpenWeatherAPI expects.
    */
    const measurementSys = formData.get("temperatureUnit") as string;
    const cityName = formData.get("city") as string;
    if (cityName !== userCity.cityName) {
      setSystem(measurementSys);
      fetchWeatherForecastForFiveDays(cityName, measurementSys);
    }
  };

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { target: { value } } = event;
    setSystem(value);
  };

  // TODO: consider making components out of all elements that will consume the translation
  // and use the context

  return (
    <main className="w-full m-0 p-0 flex flex-col grow bg-dark">
      <Navbar />
      <form
        onSubmit={handleSubmit}
        className="mt-4 px-7 flex flex-col">
        <div className="mb-6">
          <p className="text-light font-semibold">
            {
              languageContext?.language === "en-EN"
                ? translation.en.form.measurementLabel
                : translation.pt.form.measurementLabel
            }°
          </p>
          <div className="flex space-x-8">
            <label htmlFor="celsius" className="text-secondary cursor-pointer">
              <input
                className="accent-primary cursor-pointer"
                type="radio"
                name="temperatureUnit"
                value="metric"
                id="celsius"
                onChange={handleChange}
                defaultChecked
                required
              /> Celsius
            </label>
            <label htmlFor="fahrenheit" className="text-secondary cursor-pointer">
              <input
                className="accent-primary cursor-pointer"
                type="radio"
                name="temperatureUnit"
                value="imperial"
                id="fahrenheit"
                onChange={handleChange}
                required
              /> Fahrenheit
            </label>
          </div>
        </div>
        <label htmlFor="city" className="flex flex-col text-light font-semibold">
            {
              languageContext?.language === "en-EN"
                ? translation.en.form.cityLabel
                : translation.pt.form.cityLabel
            }
          <div className="mt-1 grid grid-cols-8">
            <input
              className="col-span-7 p-2 w-full font-normal rounded rounded-tr-none rounded-br-none text-dark focus-visible:outline-primary focus-visible:outline-1"
              type="text"
              name="city"
              id="city"
              required
            />
            <button
              type="submit"
              className="bg-primary grid place-items-center rounded-tr rounded-br"
            >
              <Icon {...searchIcon} customClasses="w-8 h-auto fill-dark" />
            </button>
            {
              cityNotFound &&
                <small className="col-span-8 text-red">
                  {
                    languageContext?.language === "en-EN"
                      ? translation.en.cityNotFound
                      : translation.pt.cityNotFound
                  }
                </small>
            }
          </div>
        </label>
      </form>
      {
        !cityNotFound &&
          <Forecast
            data={groupedWeatherForecast}
            cityName={userCity.cityName}
            translation={translation}
            languageContext={languageContext}
          />
      }
      <Footer translation={translation} languageContext={languageContext} />
    </main>
  );
}

export default App;

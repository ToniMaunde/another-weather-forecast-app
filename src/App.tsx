import { useMemo, useState } from "react";
import type { MouseEvent, ChangeEvent} from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Forecast from "./components/Forecast";
import { Icon } from "./components/Icon";
import searchIcon from "./assets/search";

import getWeatherForecast from "./api";
import { groupWeatherForecast } from "./utils";
import type { HourForecast } from "./types";

function App() {
  const [cityNotFound, setCityNotFound] = useState(false);
  const [measurementSystem, setSystem] = useState("metric");
  const [userCity, setCity] = useState<{cityName: string, id: number}>({
    cityName: "",
    id: -1
  });
  const [weatherForecast, setWeatherForecast] = useState<HourForecast[]>([]);
  const groupedWeatherForecast = useMemo(() => groupWeatherForecast(weatherForecast), [weatherForecast]);

  // This function simply converts the temperature when the measurement system changes
  // Consider storing the rendered weather forecast in a memo with the measurement system as its
  // single dependency array element
  // const newWeatherDataMapper = (
  //   gwf: GroupedWeatherForecast[],
  //   temp: string,
  // ): GroupedWeatherForecast[] => gwf.map((el) => {
  //   const elementOfTheArray = el.weatherThroughOutDay.map((ell) => {
  //     const newMin = convertTemperature(ell.main.temp_min, temp);
  //     const newMax = convertTemperature(ell.main.temp_max, temp);
  //     const newFeelsLike = convertTemperature(ell.main.feels_like, temp);
  //     const newTemp = convertTemperature(ell.main.temp, temp);

  //     const newWeatherThroughOutTheDay: WeatherForecast = {
  //       dt: ell.dt,
  //       main: {
  //         feels_like: parseFloat(newFeelsLike),
  //         temp: parseFloat(newTemp),
  //         temp_min: parseFloat(newMin),
  //         temp_max: parseFloat(newMax),
  //       },
  //       weather: ell.weather,
  //     };

  //     return { ...newWeatherThroughOutTheDay };
  //   });
  //   return {
  //     date: el.date,
  //     weatherThroughOutDay: elementOfTheArray,
  //   };
  // });

  //   return groupedData;
  // };

  async function fetchWeatherForecastForFiveDays(cityName: string, measurementSys: string) {
    const result = await getWeatherForecast(cityName, measurementSys);
  
    if (typeof result === "boolean") {
      throw new Error("An error occurred");
    }

    if (result.cod === "404"){
      setCityNotFound(true);
    } else {
      setWeatherForecast(result.list);
      setCity({cityName, id: result.city.id});
    }
  };

  function handleSubmit (event: MouseEvent<HTMLFormElement>) {
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

  return (
    <main className="w-full m-0 p-0 flex flex-col grow bg-dark">
      <Navbar />
      <form
        onSubmit={handleSubmit}
        className="mt-4 px-7 flex flex-col">
        <div className="mb-6">
          <p className="text-light font-semibold">Temperature in °</p>
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
          Name of the city
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
          </div>
        </label>
      </form>
      <Forecast data={groupedWeatherForecast} cityName={userCity.cityName} />
      <Footer />
    </main>
  );
}

export default App;

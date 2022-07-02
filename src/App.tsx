// import { useState } from "react";
// import { getCurrentWeatherInformation } from "./api";
// import { WeatherForecast, GroupedWeatherForecast, CurrentMinMax } from "./types";
// import Forecast from "./components/Forecast";

import { Icon } from "./components/Icon";
import searchIcon from "./assets/search";
import Navbar from "./components/Navbar";
import Forecast from "./components/Forecast";

function App() {
  // const [groupedWeatherData, setGroupedWeatherData] = useState<Array<GroupedWeatherForecast>>([]);
  // const [temperatureUnit, setTemperatureUnit] = useState("");
  // const [currentMinMax, setCurrenMinMax] = useState<CurrentMinMax>({ min: 0, max: 0, icon: "" });
  // const [isDataReady, setIsDataReady] = useState(false);
  // const [cityID, setCityID] = useState<number>(0);
  // const [cityNotFound, setCityNotFound] = useState(false);
  // const [temperatureMap, setTemperatureMap] = useState<string>("");

  const measurementSystem = (temp: string): string => {
    if (temp === "Celsius") return "metric";
    return "imperial";
  };

  const isCityIDDifferent = (oldCityID: number, newCityID: number) => {
    if (oldCityID === newCityID) return false;
    return true;
  };

  // const didTempUnitChange = (newTemperatureUnit: string) => {
  //   if (newTemperatureUnit !== temperatureUnit) return true;
  //   return false;
  // };

  const convertTemperature = (temp: number, newUnit: string): string => {
    if (newUnit === "Fahrenheit") return ((temp * (9 / 5)) + 32).toFixed(2);
    return ((temp - 32) * 5 / 9).toFixed(2);
  };

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

  // const formattedDate = (epoch: number): string => new Date(epoch * 1000)
  //   .toLocaleDateString("pt-PT", { weekday: "long" });

  // const getAllDates = (array: Array<WeatherForecast>) => {
  //   const allDates = array.map((d) => formattedDate(d.dt));

  //   return {
  //     allDates,
  //     array,
  //   };
  // };

  // const removeDuplicates = (list: string[]) => {
  //   const set = new Set<string>();
  //   list.forEach((el) => set.add(el));
  //   return new Array<string>(...set);
  // };

  // const removeDuplicatesAndGroup = (listOfDates: string[], array: WeatherForecast[])
  //   : GroupedWeatherForecast[] => {
  //   const arrayWithoutDuplicates: string[] = removeDuplicates(listOfDates);

  //   const groupedData = arrayWithoutDuplicates.map((d) => {
  //     const temps = array.filter((dd) => d === formattedDate(dd.dt));

  //     const result: GroupedWeatherForecast = { date: d, weatherThroughOutDay: temps };

  //     return result;
  //   });

  //   return groupedData;
  // };

  // const groupWeatherForecastData = (data: Array<WeatherForecast>) => {
  //   const allDates = getAllDates(data);
  //   return removeDuplicatesAndGroup(allDates.allDates, allDates.array);
  // };

  // const getData = (values: {city: string, temp: string}, setSubmitting: Function) => {
  //   getCurrentWeatherInformation(values.city, weatherApiKey, measurementSystem(values.temp))
  //     .then((data) => {
  //       setCityID(data.id);
  //       setCurrenMinMax({
  //         min: data.main.temp_min,
  //         max: data.main.temp_max,
  //         icon: data.weather[0].icon,
  //       });

  //       if (!isCityIDDifferent(cityID, data.id) && didTempUnitChange(values.temp)) {
  //         setGroupedWeatherData((prev) => newWeatherDataMapper(prev, values.temp));
  //         setIsDataReady(true);
  //         setSubmitting(false);
  //       } else if (isCityIDDifferent(cityID, data.id) || didTempUnitChange(values.temp)) {
  //         getForecastWeatherInformation(values.city, weatherApiKey, measurementSystem(values.temp))
  //           .then((data) => {
  //             setIsDataReady(false);
  //             const forecastForFiveDays: Array<WeatherForecast> = data.list;
  //             setGroupedWeatherData(() => [...groupWeatherForecastData(forecastForFiveDays)]);
  //             setIsDataReady(true);
  //             setSubmitting(false);
  //           })
  //           .finally(() => {
  //             getCityTemperatureMap(1, weatherApiKey)
  //               .then((data) => setTemperatureMap(data));
  //           });
  //       } else setSubmitting(false);
  //     })
  //     .catch((error) => {
  //       setSubmitting(false);
  //       setCityNotFound(true);
  //     });
  // };

  return (
    <main className="w-full h-full m-0 p-0 flex flex-col bg-dark">
      <Navbar />
      <form className="mt-4 px-7 flex flex-col">
        <div className="mb-6">
          <p className="text-light font-semibold">Temperature in °</p>
          <div className="flex space-x-8">
            <label htmlFor="celsius" className="text-secondary cursor-pointer">
              <input
                className="accent-primary cursor-pointer"
                type="radio"
                name="temperatureUnit"
                value="C"
                id="celsius"
                required
              /> Celsius
            </label>
            <label htmlFor="fahrenheit" className="text-secondary cursor-pointer">
              <input
                className="accent-primary cursor-pointer"
                type="radio"
                name="temperatureUnit"
                value="F"
                id="fahrenheit"
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

      <Forecast />
    </main>
  );
}

export default App;

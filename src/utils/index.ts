import { Language } from "../providers/translationProvider";
import type { GroupedWeatherForecast, HourForecast, HourForecastWithMS } from "../types";

export function initThemeSettings() {
  if (typeof window !== "undefined") {
    if (localStorage.getItem("theme") === "dark" || (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }
};

export function getTheme() {
  const theme = localStorage.getItem("theme");
  return typeof theme === "string" ? theme : "dark";
};

function epochToDateString(epoch: number, locale : Language){
  const dateFromEpoch = new Date(epoch * 1000);
  return dateFromEpoch.toLocaleDateString(locale, { weekday: "long" });
};

export function epochToTimeString(epoch: number) {
  const dateFromEpoch = new Date(epoch * 1000);
  return dateFromEpoch.toLocaleTimeString("pt-PT", {hour: "2-digit", minute: "2-digit"})
}

export function nameCase(date: string) {
  return `${date.charAt(0).toUpperCase()}${date.slice(1)}`
};

function getDatesFrom(array: HourForecast[], locale: Language) {
  const dates = array.map((hourForecast) => epochToDateString(hourForecast.dt, locale));
  /* Some of these dates are duplicated since the array of HourForecast contains forecast data 
    for the whole day in 3-hours intervals.
  */
  return dates;
};

/* Dedupe = deduplicate */
function dedupe(listOfDuplicates: string[]) {
  // A set does not allow duplicates.
  const set = new Set<string>();
  listOfDuplicates.forEach((duplicate) => set.add(duplicate));
  return new Array<string>(...set);
};

export function addMeasurementSystem(forecastData: HourForecast[], measurementSystem: string): HourForecastWithMS[] {
  return forecastData.map(forecast => ({...forecast, measurementSystem}))
};

function convertTo(measurementSystem: string, temperature: number) {
  if (measurementSystem === "imperial") {
    return ((temperature * (9 / 5)) + 32).toFixed(2);
  };
  return ((temperature - 32) * 5 / 9).toFixed(2);
};

function recalculateForecastDataForDate(forecastData: HourForecastWithMS[], newMeasurmentSystem: string): HourForecastWithMS[] {
  return forecastData.map(forecast => {
    const newTemps = {
      feels_like: parseFloat(convertTo(newMeasurmentSystem, forecast.main.feels_like)),
      temp: parseFloat(convertTo(newMeasurmentSystem, forecast.main.temp)),
      temp_min: parseFloat(convertTo(newMeasurmentSystem, forecast.main.temp_min)),
      temp_max: parseFloat(convertTo(newMeasurmentSystem, forecast.main.temp_max)),
      humidity: forecast.main.humidity,
      pressure: forecast.main.pressure
    };

    return {
      ...forecast,
      main: newTemps
    }
  });
};

function groupForecastDataByDates(arrayOfDates: string[], forecastData: HourForecastWithMS[], newMeasurementSystem: string, locale: Language): GroupedWeatherForecast[] {
  const groupedForecastData = arrayOfDates.map(date => {
    const forecastDataForDate = forecastData.filter(forecast => {
      const forecastDateFromEpoch = epochToDateString(forecast.dt, locale);
      return forecastDateFromEpoch === date;
    });
    /*
      Check if the initial measurement system in place is the same as the one currently 
      selected by the user. If it is different, recalculate the values
    */
    const [{ measurementSystem }] = forecastDataForDate;
    if(measurementSystem === newMeasurementSystem) {
      return {
        date,
        forecastInIntervals: forecastDataForDate
      };
    }

    const recalculatedForecastDataForDate = recalculateForecastDataForDate(forecastDataForDate, newMeasurementSystem)
    return {
      date,
      forecastInIntervals: recalculatedForecastDataForDate
    };
  });
  return groupedForecastData;
};

export function groupWeatherForecast(forecastData: HourForecastWithMS[], measurementSystem: string, locale: Language) {
  const dedupedForecastDates = dedupe(getDatesFrom(forecastData, locale));
  return groupForecastDataByDates(dedupedForecastDates, forecastData, measurementSystem, locale);
};
import type { GroupedWeatherForecast, HourForecast } from "../types";

export function convertTo(newTemperatureUnit: string, temperature: number): string {
  if (newTemperatureUnit === "Fahrenheit") {
    return ((temperature * (9 / 5)) + 32).toFixed(2);
  };
  return ((temperature - 32) * 5 / 9).toFixed(2);
};

function epochToDateString(epoch: number){
  const dateFromEpoch = new Date(epoch * 1000);
  // TODO: the locale should come from the TranslationProvider
  return dateFromEpoch.toLocaleDateString("pt-PT", { weekday: "long" });
};

export function epochToTimeString(epoch: number) {
  const dateFromEpoch = new Date(epoch * 1000);
  // TODO: the locale should come from the TranslationProvider
  return dateFromEpoch.toLocaleTimeString("pt-PT", {hour: "2-digit", minute: "2-digit"})
}

function getDatesFrom(array: HourForecast[]) {
  const dates = array.map((hourForecast) => epochToDateString(hourForecast.dt));
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

function groupForecastDataByDates(arrayOfDates: string[], forecastData: HourForecast[]): GroupedWeatherForecast[] {
  const groupedForecastData = arrayOfDates.map(date => {
    const forecastDataForDate = forecastData.filter(forecast => {
      const forecastDateFromEpoch = epochToDateString(forecast.dt);
      return forecastDateFromEpoch === date; 
    });
    return {
      date,
      forecastInIntervals: forecastDataForDate
    };
  });
  return groupedForecastData;
};

export function groupWeatherForecast(forecastData: HourForecast[]) {
  const dedupedForecastDates = dedupe(getDatesFrom(forecastData));
  return groupForecastDataByDates(dedupedForecastDates, forecastData);
};

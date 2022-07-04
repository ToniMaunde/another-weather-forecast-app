import type { WeatherForecast } from "../types";

const weatherAPIKey = import.meta.env.VITE_API_KEY as string;
const HEADERS: RequestInit = { method: "GET", mode: "cors" };

export default async function getWeatherForecast(city: string, measurementSystem:string): Promise<WeatherForecast | boolean>  {
  const URL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${measurementSystem}&appid=${weatherAPIKey}`;

  try {
    const result = await fetch(URL, HEADERS);
    return await result.json();
  } catch (error) {
    return true;
  }
};
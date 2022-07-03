export type HourForecast = {
  dt: number;
  dt_txt: string;
  main: {
    feels_like: number;
    temp: number;
    humidity: number;
    pressure: number;
    temp_min: number;
    temp_max: number;
  };
  weather: Array<{
    description: string;
    icon: string;
    id: number;
    main: string;
  }>;
  wind: {
    deg: number;
    gust: number;
    speed: number;
  }
}

export type WeatherForecast = {
  city: {
    id: number;
    sunrise: number;
    sunset: number;
  };
  cod: string;
  list: HourForecast[];
}

export type GroupedWeatherForecast = {
  date: string;
  maxAndMin?: {
    max_temp: number;
    min_temp: number;
  }
  forecastInIntervals: HourForecast[];
}
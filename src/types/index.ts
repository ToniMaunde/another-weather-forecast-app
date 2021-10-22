export interface WeatherForecast {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
  };
  weather: Array<{
    id: 500;
    main: string;
    description: string;
    icon: string;
  }>;
}

export interface GroupedWeatherForecast {
  date: string;
  weatherThroughOutDay: Array<WeatherForecast>;
}
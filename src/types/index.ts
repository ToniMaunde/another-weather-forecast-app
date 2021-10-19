export interface WeatherForecast {
  dt: number;
  feels_like: {
    day: number;
    night: number;
    eve: number;
    morn: number;
  };
  humidity: number;
  temp: {
    day: number;
    min: number;
    max: number;
    morn: number;
    night: number;
  };
  weather: Array<{
    id: 500;
    main: string;
    description: string;
    icon: string;
  }>;
  wind_speed: number;
}
import { Weather } from "./types";

export const fetchWeather = async (setWeather: React.Dispatch<React.SetStateAction<Weather>>) => {
  try {
    const apiKey = "a363f14d94f369a4d926a27d5d44fc60";
    const seoulWeatherResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=Seoul&appid=${apiKey}&lang=kr`
    );
    if (!seoulWeatherResponse.ok) {
      throw "weather fetch failed";
    }
    const data = await seoulWeatherResponse.json();
    setWeather({ icon: data.weather[0].icon, temp: data.main.temp });
  } catch (error) {
    console.error("Error fetching city data:", error);
  }
};

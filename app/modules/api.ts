interface Weather {
  icon: string;
  temperature: number;
}

export async function fetchWeather(): Promise<Weather> {
  try {
    const apiKey = "a363f14d94f369a4d926a27d5d44fc60";
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=Seoul&appid=${apiKey}&lang=kr`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch city data");
    }

    const weatherData = await response.json();
    return { icon: weatherData.weather[0].icon, temperature: weatherData.main.temp };
  } catch (error) {
    throw new Error("Failed to fetch city data");
  }
}

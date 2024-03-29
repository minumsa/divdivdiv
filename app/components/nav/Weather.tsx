import { useEffect, useState } from "react";
import styles from "./Weather.module.css";
import Image from "next/image";
import { fetchWeather } from "@/app/modules/api";

export const WeatherIcon = () => {
  const [weatherIcon, setWeatherIcon] = useState("");
  const weatherIconLink = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
  const [temperature, setTemperature] = useState("");

  useEffect(() => {
    async function loadData() {
      const result = await fetchWeather();
      const { icon, temperature } = result;
      const formattedTemperature = `${(temperature - 273.15).toFixed(1)}°`;
      setWeatherIcon(icon);
      setTemperature(formattedTemperature);
    }

    loadData();
  }, []);

  return (
    <>
      <div className={styles["weather"]}>
        <Image src={weatherIconLink} width={35} height={35} alt="weather" />
      </div>
      <div className={styles["temperature"]}>{temperature}</div>
    </>
  );
};

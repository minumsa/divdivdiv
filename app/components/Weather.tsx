import { useEffect, useState } from "react";
import styles from "../divdivdiv.module.css";
import Image from "next/image";
import { fetchWeather } from "../modules/api";
import { Weather } from "../modules/types";

export const CurrentWeather = () => {
  const [weather, setWeather] = useState<Weather>({
    icon: null,
    temp: null,
  });

  useEffect(() => {
    fetchWeather(setWeather);
  }, []);

  return (
    <>
      {weather.icon && (
        <div className={`${styles["button-right"]} ${styles["weather"]}`}>
          <Image
            src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
            width={35}
            height={35}
            alt="Weather Icon"
          />
        </div>
      )}
      <div className={`${styles["button-right"]} ${styles["temperature"]}`}>
        {weather.temp && `${(weather.temp - 273.15).toFixed(1)}°`}
      </div>
    </>
  );
};

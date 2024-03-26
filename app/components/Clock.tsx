import { useEffect, useState } from "react";
import NoSSR from "../modules/NoSSR";
import styles from "../divdivdiv.module.css";
import { useAtomValue } from "jotai";
import { languageAtom } from "../modules/atoms";

export default function Clock() {
  const language = useAtomValue(languageAtom);
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const hours: number = currentTime.getHours();
  const minutes: string = String(currentTime.getMinutes()).padStart(2, "0");
  const twelveHourFormat: number = hours % 12 || 12;
  let period: string = "";

  if (language === "en") {
    period = hours >= 12 ? "PM" : "AM";
  } else {
    period = hours >= 12 ? "오후" : "오전";
  }

  const clock = `${period} ${String(twelveHourFormat).padStart(2, "0")}:${minutes}`;

  return (
    <NoSSR>
      <div className={`${styles["button-right"]} ${styles["clock"]}`}>{clock}</div>
    </NoSSR>
  );
}

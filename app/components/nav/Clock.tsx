import { useEffect, useState } from "react";
import styles from "./Clock.module.css";
import { useAtomValue } from "jotai";
import { languageAtom } from "@/app/modules/atoms";
import NoSSR from "@/app/modules/NoSSR";

export default function Clock() {
  const isKorean = useAtomValue(languageAtom) === "ko";
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
  const koreanPeriod = hours >= 12 ? "오후" : "오전";
  const englishPeriod = hours >= 12 ? "PM" : "AM";

  if (isKorean) {
    period = koreanPeriod;
  } else {
    period = englishPeriod;
  }

  const formattedTime = `${period} ${String(twelveHourFormat).padStart(2, "0")}:${minutes}`;

  return (
    <NoSSR>
      <div className={styles["clock"]}>{formattedTime}</div>
    </NoSSR>
  );
}

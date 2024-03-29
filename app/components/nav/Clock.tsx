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

  if (isKorean) {
    period = hours >= 12 ? "오후" : "오전";
  } else {
    period = hours >= 12 ? "PM" : "AM";
  }

  const clock = `${period} ${String(twelveHourFormat).padStart(2, "0")}:${minutes}`;

  return (
    <NoSSR>
      <div className={styles["clock"]}>{clock}</div>
    </NoSSR>
  );
}

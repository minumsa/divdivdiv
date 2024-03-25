import { languageAtom } from "../modules/data";
import styles from "../divdivdiv.module.css";
import { useAtom } from "jotai";

export const Calender = () => {
  const [language, setLanguage] = useAtom(languageAtom);
  function getDayOfWeek(date: Date): [string, string] {
    const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
    const daysOfEngWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const dayIndex = date.getDay();
    return [daysOfWeek[dayIndex], daysOfEngWeek[dayIndex]];
  }
  const currentDate = new Date();
  const month = currentDate.getMonth() + 1;
  const months: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const day = currentDate.getDate();
  const [dayOfWeek, dayOfEngWeek] = getDayOfWeek(currentDate);

  return (
    <div className={`${styles["button-right"]} ${styles["calendar"]}`}>
      {language === "en"
        ? `${months[month - 1]} ${day} (${dayOfEngWeek})`
        : `${month}월 ${day}일 (${dayOfWeek})`}
    </div>
  );
};

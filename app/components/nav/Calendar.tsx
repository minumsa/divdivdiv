import { languageAtom } from "@/app/modules/atoms";
import styles from "./Calendar.module.css";
import { useAtomValue } from "jotai";

export const Calendar = () => {
  const isKorean = useAtomValue(languageAtom) === "ko";
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
  const koreanDate = `${month}월 ${day}일 (${dayOfWeek})`;
  const englishDate = `${months[month - 1]} ${day} (${dayOfEngWeek})`;

  return (
    <div className={`${styles["button-right"]} ${styles["calendar"]}`}>
      {isKorean ? koreanDate : englishDate}
    </div>
  );
};

function getDayOfWeek(date: Date): [string, string] {
  const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
  const daysOfEngWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dayIndex = date.getDay();
  return [daysOfWeek[dayIndex], daysOfEngWeek[dayIndex]];
}

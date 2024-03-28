import { Category } from "./Category";
import styles from "../divdivdiv.module.css";
import { WeatherIcon } from "./Weather";
import { LanguageToggleButton } from "./LanguageToggleButton";
import { useAtomValue } from "jotai";
import { Calender } from "./Calender";
import Clock from "./Clock";
import { languageAtom } from "@/app/modules/atoms";

export const Nav = () => {
  const isKorean = useAtomValue(languageAtom) === "ko";
  const about = isKorean ? "소개" : "about";
  const contact = isKorean ? "연결" : "contact";

  return (
    <div className={styles["nav"]}>
      <Category text="divdivdiv" path="/" />
      <Category text={about} path="/about" />
      <Category text={contact} path="/contact" />
      <div className={styles["blank-space"]}></div>
      <WeatherIcon />
      <LanguageToggleButton />
      <Calender />
      <Clock />
    </div>
  );
};

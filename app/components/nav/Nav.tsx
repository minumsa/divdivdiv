import { Category } from "./Category";
import styles from "./Nav.module.css";
import { WeatherIcon } from "./Weather";
import { LanguageToggleButton } from "./LanguageToggleButton";
import { useAtomValue } from "jotai";
import { Calendar } from "./Calendar";
import Clock from "./Clock";
import { languageAtom } from "@/app/modules/atoms";

export const Nav = () => {
  const isKorean = useAtomValue(languageAtom) === "ko";
  const about = isKorean ? "소개" : "about";
  const contact = isKorean ? "연결" : "contact";

  return (
    <div className={styles["container"]}>
      <Category text="divdivdiv" path="/" />
      <Category text={about} path="/about" />
      <Category text={contact} path="/contact" />
      <div className={styles["blank-space"]} />
      <WeatherIcon />
      <LanguageToggleButton />
      <Calendar />
      <Clock />
    </div>
  );
};

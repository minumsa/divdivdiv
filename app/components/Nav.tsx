import { RenderButtonLeft } from "./RenderButtonLeft";
import styles from "../divdivdiv.module.css";
import { CurrentWeather } from "./Weather";
import { LanguageToggleButton } from "./LanguageToggleButton";
import { useAtomValue } from "jotai";
import { Calender } from "./Calender";
import Clock from "./Clock";
import { languageAtom } from "../modules/atoms";

export const Nav = () => {
  const language = useAtomValue(languageAtom);

  return (
    <div className={styles["nav"]}>
      <RenderButtonLeft text="divdivdiv" path="/" />
      <RenderButtonLeft text={language === "en" ? "about" : "소개"} path="/about" />
      <RenderButtonLeft text={language === "en" ? "contact" : "연결"} path="/contact" />
      <div className={styles["blank-space"]}></div>
      <CurrentWeather />
      <LanguageToggleButton />
      <Calender />
      <Clock />
    </div>
  );
};

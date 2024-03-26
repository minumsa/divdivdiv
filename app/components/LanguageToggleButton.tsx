import { useAtom } from "jotai";
import styles from "../divdivdiv.module.css";
import { languageAtom } from "../modules/atoms";

export const LanguageToggleButton = () => {
  const [language, setLanguage] = useAtom(languageAtom);

  const toggleLanguage = () => {
    const newLanguage = language === "en" ? "ko" : "en";
    setLanguage(newLanguage);
  };

  return (
    <div className={`${styles["button-right"]} ${styles["language"]}`} onClick={toggleLanguage}>
      {language === "en" ? "A" : "한"}
    </div>
  );
};

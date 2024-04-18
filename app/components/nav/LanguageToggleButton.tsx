import { useAtom } from "jotai";
import styles from "./LanguageToggleButton.module.css";
import { languageAtom } from "../../modules/atoms";

export const LanguageToggleButton = () => {
  const [language, setLanguage] = useAtom(languageAtom);
  const isKorean = language === "ko";
  const currentLanguage = isKorean ? "한" : "A";

  const toggleLanguage = () => {
    const newLanguage = language === "en" ? "ko" : "en";
    setLanguage(newLanguage);
  };

  return (
    <div
      className={styles["language"]}
      onClick={() => {
        toggleLanguage();
      }}
    >
      {currentLanguage}
    </div>
  );
};

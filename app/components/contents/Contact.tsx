"use client";

import styles from "../divdivdiv.module.css";
import { useAtomValue } from "jotai";
import { languageAtom } from "../modules/atoms";

export default function Contact() {
  const language = useAtomValue(languageAtom);

  return (
    <div className={styles["contact-container"]}>
      <a className={styles["contact-link"]} href="https://github.com/minumsa" target="_blank">
        <div className={styles["button-contact"]}>{language === "en" ? "GitHub" : "깃허브"}</div>
      </a>
      <a className={styles["contact-link"]} href="mailto:carver1014@kakao.com" target="_blank">
        <div className={styles["button-contact"]}>{language === "en" ? "E-mail" : "이메일"}</div>
      </a>
    </div>
  );
}

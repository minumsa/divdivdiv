"use client";

import { languageAtom } from "@/app/modules/atoms";
import styles from "../../divdivdiv.module.css";
import { useAtomValue } from "jotai";

export default function Contact() {
  const isKorean = useAtomValue(languageAtom) === "ko";
  const github = isKorean ? "깃허브" : "GitHub";
  const email = isKorean ? "이메일" : "E-mail";

  return (
    <div className={styles["contact-container"]}>
      <a className={styles["contact-link"]} href="https://github.com/minumsa" target="_blank">
        <div className={styles["button-contact"]}>{github}</div>
      </a>
      <a className={styles["contact-link"]} href="mailto:carver1014@kakao.com" target="_blank">
        <div className={styles["button-contact"]}>{email}</div>
      </a>
    </div>
  );
}

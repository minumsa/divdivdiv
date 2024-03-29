"use client";

import { languageAtom } from "@/app/modules/atoms";
import styles from "./Contact.module.css";
import { useAtomValue } from "jotai";

export default function Contact() {
  const isKorean = useAtomValue(languageAtom) === "ko";
  const github = isKorean ? "깃허브" : "GitHub";
  const email = isKorean ? "이메일" : "E-mail";

  return (
    <div className={styles["container"]}>
      <a href="https://github.com/minumsa" target="_blank">
        <div className={styles["contact-text"]}>{github}</div>
      </a>
      <a href="mailto:carver1014@kakao.com" target="_blank">
        <div className={styles["contact-text"]}>{email}</div>
      </a>
    </div>
  );
}

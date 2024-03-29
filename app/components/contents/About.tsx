"use client";

import { useAtomValue } from "jotai";
import styles from "./About.module.css";
import { languageAtom } from "@/app/modules/atoms";

interface AboutItem {
  en: string;
  ko: string;
}

interface About {
  job: AboutItem;
  interest: AboutItem;
  ai: AboutItem;
}

export default function About() {
  const language = useAtomValue(languageAtom);

  const about: About = {
    job: {
      en: "I am working as a web developer in Seoul. 👨‍💻",
      ko: "서울에서 웹 개발자로 활동하고 있습니다. 👨‍💻",
    },
    interest: {
      en: "I am interested in creating clean interfaces and interesting web pages. 💥",
      ko: "간결한 인터페이스와 흥미로운 페이지를 만드는 데 관심이 있습니다. 💥",
    },
    ai: {
      en: "I am also exploring ways to survive in the age of AI. 🤖",
      ko: "AI로부터 살아남기 위한 방법을 찾고 있습니다. 🤖",
    },
  };

  return (
    <div className={styles["container"]}>
      <ul>
        {Object.keys(about).map(key => {
          return <li key={key}>{about[key as keyof About][language]}</li>;
        })}
      </ul>
    </div>
  );
}

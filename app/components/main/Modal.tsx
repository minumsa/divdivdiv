import { useEffect, useState } from "react";
import styles from "../divdivdiv.module.css";
import { readme } from "../../modules/iconsData";
import { useAtomValue } from "jotai";
import { isMobile } from "react-device-detect";
import { blurHashAtom, languageAtom } from "../../modules/atoms";
import { BlurImg } from "./BlurImg";

interface ImageModalProps {
  src: string;
  alt: string;
  onClick: any;
}

export const ImageModal = ({ src, alt, onClick }: ImageModalProps) => {
  const language = useAtomValue(languageAtom);
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState<number>(window.innerHeight);
  const blurHash = useAtomValue(blurHashAtom);

  // FIXME: Main 이 Desktop 이랑 ModalContainer를 가지고 있어서
  // Modal의 상태 변화가 Desktop과 연관이 없도록 만들어주면
  // Modal이 열리고 닫힐 때마다 Desktop이 리렌더링 되지 않게 할 수 있다.
  // 상태 변수는 여기에 두고 props 형태로 자식 컴포넌트로 보내기

  const handleWindowResize = () => {
    setWindowWidth(window.innerWidth);
    setWindowHeight(window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  let height: number = windowHeight / 1.2;
  let width: number = windowHeight * 0.65;

  if (isMobile) {
    width = windowWidth * 0.9;
    height = width * 1.3;

    if (alt === "readme") {
      width = windowWidth * 0.9;
      height = width * 1.6;
    }
  }

  function ReadmeComponent(props: { path: string; icon: any }) {
    const { path, icon } = props;

    return (
      <div
        className={styles["paragraph"]}
        style={{
          margin: isMobile ? "10px 30px" : "10px 70px",
          wordBreak: language === "ko" ? "break-all" : undefined,
        }}
      >
        <div className={styles["paragraph-title"]} onClick={() => window.open(path, "_blank")}>
          {`${icon.title[language].toUpperCase()} ${icon.emoji}`}
        </div>
        {icon.text[language]}
      </div>
    );
  }

  // FIXME: 리드미와 이미지 모달 컴포넌트를 아예 별개로 분리
  return alt === "readme" ? (
    <div
      className={styles["modal-container"]}
      onClick={onClick}
      style={{
        textAlign: language === "ko" ? "justify" : undefined,
      }}
    >
      <div className={styles["modal"]} style={{ width: width, height: height }}>
        <div className={styles["last-updated"]}>{readme.lastUpdated.text[language]}</div>
        <ReadmeComponent path="https://blog.divdivdiv.com" icon={readme.blog} />
        <ReadmeComponent path="https://music.divdivdiv.com" icon={readme.music} />
        <ReadmeComponent path="https://barbershop.divdivdiv.com" icon={readme.barbershop} />
        <ReadmeComponent path="https://cinephile.divdivdiv.com" icon={readme.cinephile} />
        <ReadmeComponent path="https://fruits.divdivdiv.com" icon={readme.fruits} />
        <ReadmeComponent path="https://words.divdivdiv.com" icon={readme.words} />
        <ReadmeComponent path="/" icon={readme.techStack} />
      </div>
    </div>
  ) : (
    <div className={styles["modal-image"]} onClick={onClick}>
      <BlurImg src={src} alt={alt} width={width} height={height} blurHash={blurHash} />
    </div>
  );
};

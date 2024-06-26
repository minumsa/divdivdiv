import { useEffect, useRef, useState } from "react";
import styles from "./Modal.module.css";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { isMobile } from "react-device-detect";
import {
  blurHashAtom,
  imgAltAtom,
  imgSrcAtom,
  languageAtom,
  showImageAtom,
} from "../../modules/atoms";
import { readme } from "@/app/modules/icons";
import { BlurImg } from "../@common/BlurImg";

export const ImageModal = () => {
  const language = useAtomValue(languageAtom);
  const isKorean = language === "ko";
  const [imgSrc, setImgSrc] = useAtom(imgSrcAtom);
  const [imgAlt, setImgAlt] = useAtom(imgAltAtom);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const blurHash = useAtomValue(blurHashAtom);
  const isREADMEItem = imgAlt === "readme";
  const { lastUpdated, blog, music, barbershop, cinephile, techStack } = readme;
  const modalRef = useRef<HTMLDivElement>(null);
  const setShowImage = useSetAtom(showImageAtom);

  const handleModalClick = () => {
    setShowImage(false);
    setImgSrc("");
    setImgAlt("");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const isClickedOutsideModal =
        modalRef.current && !modalRef.current.contains(event.target as Node);
      if (isClickedOutsideModal) {
        handleModalClick();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef]);

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

  // let height: number = windowHeight / 1.4;
  // let width: number = windowHeight * 0.5;
  let height: number = windowHeight / 1.2;
  let width: number = windowHeight * 0.65;

  if (isMobile) {
    width = windowWidth * 0.9;
    height = width * 1.3;

    if (imgAlt === "readme") {
      width = windowWidth * 0.9;
      height = width * 1.6;
    }
  }

  function READMEItem(props: { path: string; icon: any }) {
    const { path, icon } = props;

    return (
      <div
        className={styles["paragraph"]}
        style={{
          margin: isMobile ? "10px 30px" : "10px 70px",
          wordBreak: isKorean ? "break-all" : undefined,
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
  return isREADMEItem ? (
    <div
      className={styles["modal-container"]}
      onClick={handleModalClick}
      style={{
        textAlign: isKorean ? "justify" : undefined,
      }}
      ref={modalRef}
    >
      <div className={styles["modal"]} style={{ width: width, height: height }}>
        <div className={styles["last-updated"]}>{lastUpdated.text[language]}</div>
        <READMEItem path="https://music.divdivdiv.com" icon={music} />
        <READMEItem path="https://blog.divdivdiv.com" icon={blog} />
        <READMEItem path="https://barbershop.divdivdiv.com" icon={barbershop} />
        <READMEItem path="https://cinephile.divdivdiv.com" icon={cinephile} />
        {/* <READMEItem path="https://fruits.divdivdiv.com" icon={fruits} />
        <READMEItem path="https://words.divdivdiv.com" icon={words} /> */}
        <READMEItem path="/" icon={techStack} />
      </div>
    </div>
  ) : (
    <div className={styles["modal-image"]} onClick={handleModalClick} ref={modalRef}>
      <BlurImg src={imgSrc} alt={imgAlt} width={width} height={height} blurHash={blurHash} />
    </div>
  );
};

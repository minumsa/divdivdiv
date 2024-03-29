"use client";

import React, { memo } from "react";
import Draggable from "react-draggable";
import styles from "./DraggableIcons.module.css";
import { fortune, iconSize, iconTitle } from "../../modules/icons";
import { useAtomValue, useSetAtom } from "jotai";
import { isMobile } from "react-device-detect";
import {
  blurHashAtom,
  imgAltAtom,
  imgSrcAtom,
  languageAtom,
  showImageAtom,
} from "../../modules/atoms";
import { Language } from "../../modules/types";

const BLURHASH_CAT = "LLGuze8^W?S700.TRhRi9bIT$|-=";
const BLURHASH_ME = "LLIN,9?G?aSi~o4:IoRPXS-oxaR*";

interface IconsProps {
  setImgSrc: React.Dispatch<React.SetStateAction<string>>;
  setImgAlt: React.Dispatch<React.SetStateAction<string>>;
  setShowImage: React.Dispatch<React.SetStateAction<boolean>>;
  language: Language;
}

interface Size {
  width: number;
  height: number;
}

interface IconTitle {
  [key: string]: string;
}

export const Icons = () => {
  const language = useAtomValue(languageAtom);
  const setShowImage = useSetAtom(showImageAtom);
  const setImgSrc = useSetAtom(imgSrcAtom);
  const setImgAlt = useSetAtom(imgAltAtom);

  return (
    <MemoizedIcons
      setImgSrc={setImgSrc}
      setImgAlt={setImgAlt}
      setShowImage={setShowImage}
      language={language}
    />
  );
};

const DraggableIcons = ({ setImgSrc, setImgAlt, setShowImage, language }: IconsProps) => {
  const setBlurHash = useSetAtom(blurHashAtom);
  const handleImageClick = (path: string) => {
    const isReadme = path === "readme";
    if (isReadme) {
      setImgSrc(`/images/readme-${language}.webp`);
    } else {
      setImgSrc(`/images/${path}.webp`);
    }
    setImgAlt(path);
    setShowImage(true);
  };

  const handleFortuneClick = () => {
    alert(fortune[language][Math.floor(Math.random() * fortune[language].length)]);
  };

  const DraggableIcon = (props: {
    className: string;
    path: string;
    type: string;
    title: IconTitle;
    size: Size;
    blurHash?: string;
  }) => {
    const { className, path, type, title, size, blurHash } = props;
    const isFortuneCookie = type === "fortune";
    const isFolder = type === "folder";
    const isImage = type === "image";
    const isReadme = path === "readme";

    console.log(isReadme);

    const handleIconClick = () => {
      if (isFortuneCookie) {
        handleFortuneClick();
      }
      if (isFolder) {
        window.open(path, "_blank");
      }
      if (isImage) {
        handleImageClick(path);
        if (blurHash) setBlurHash(blurHash);
      }
    };

    const draggableContent = (
      <div
        className={`${styles["icon"]} ${styles[className]}`}
        onDoubleClick={() => {
          isMobile ? undefined : handleIconClick();
        }}
        onClick={() => {
          isMobile ? handleIconClick() : undefined;
        }}
      >
        <div
          className={styles["icon-image"]}
          style={{
            width: size.width,
            height: size.height,
            backgroundImage: isImage ? `url(/images/${path}.webp)` : `url(/images/${type}.webp)`,
            boxShadow: isImage ? "1px 2px 5px #cfcfcf" : undefined,
            border: isImage && !isReadme ? "4px solid #fff" : undefined,
          }}
        ></div>
        <div
          className={styles["icon-title"]}
          style={{
            marginTop: isFolder || isFortuneCookie ? "5px" : "10px",
          }}
        >
          <div>{title[language]}</div>
        </div>
      </div>
    );

    // 데스크톱에서만 드래그 아이콘으로 설정
    return isMobile ? <>{draggableContent}</> : <Draggable>{draggableContent}</Draggable>;
  };

  return (
    <div className={styles["icons-container"]}>
      <DraggableIcon
        className="icon-blog"
        path="https://blog.divdivdiv.com"
        type="folder"
        title={iconTitle.blog}
        size={iconSize.folder}
      />
      <DraggableIcon
        className="icon-music"
        path="https://music.divdivdiv.com"
        type="folder"
        title={iconTitle.music}
        size={iconSize.folder}
      />
      <DraggableIcon
        className="icon-barbershop"
        path="https://barbershop.divdivdiv.com"
        type="folder"
        title={iconTitle.barbershop}
        size={iconSize.folder}
      />
      <DraggableIcon
        className="icon-cinephile"
        path="https://cinephile.divdivdiv.com"
        type="folder"
        title={iconTitle.cinephile}
        size={iconSize.folder}
      />
      <DraggableIcon
        className="icon-fruits"
        path="https://fruits.divdivdiv.com"
        type="folder"
        title={iconTitle.fruits}
        size={iconSize.folder}
      />
      <DraggableIcon
        className="icon-words"
        path="https://words.divdivdiv.com"
        type="folder"
        title={iconTitle.words}
        size={iconSize.folder}
      />
      <DraggableIcon
        className="icon-cat"
        path="cat"
        type="image"
        title={iconTitle.cat}
        size={iconSize.image}
        blurHash={BLURHASH_CAT}
      />
      <DraggableIcon
        className="icon-me"
        path="me"
        type="image"
        title={iconTitle.me}
        size={iconSize.image}
        blurHash={BLURHASH_ME}
      />
      <DraggableIcon
        className="icon-fortune"
        path="fortune"
        type="fortune"
        title={iconTitle.fortune}
        size={iconSize.fortune}
      />
      <DraggableIcon
        className="icon-readme"
        path="readme"
        type="image"
        title={iconTitle.readme}
        size={iconSize.image}
      />
      {/* PostIt 애매해서 일단 각주 처리! */}
      {/* <Draggable>
        <PostIt language={language} />
      </Draggable> */}
    </div>
  );
};

const MemoizedIcons = memo(DraggableIcons);

"use client";

import React, { memo } from "react";
import Draggable from "react-draggable";
import styles from "./DraggableIcons.module.css";
import { fortune, iconSize, iconTitle } from "../../modules/iconsData";
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

interface IconsProps {
  setImgSrc: React.Dispatch<React.SetStateAction<string>>;
  setImgAlt: React.Dispatch<React.SetStateAction<string>>;
  setShowImage: React.Dispatch<React.SetStateAction<boolean>>;
  language: Language;
}

const DraggableIcons = ({ setImgSrc, setImgAlt, setShowImage, language }: IconsProps) => {
  const setBlurHash = useSetAtom(blurHashAtom);
  const handleImageClick = (path: string) => {
    if (path === "readme") {
      setImgSrc(`/divdivdiv/readme-${language}.webp`);
    } else {
      setImgSrc(`/divdivdiv/${path}.webp`);
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
    title: any[any] | null;
    width: number;
    height: number;
    blurHash?: string;
  }) => {
    const { className, path, type, title, width, height, blurHash } = props;

    const handleIconClick = (type: string) => {
      if (type === "fortune") {
        handleFortuneClick();
      } else if (type === "folder") {
        window.open(path, "_blank");
      } else if (type === "image") {
        handleImageClick(path);
        if (blurHash) setBlurHash(blurHash);
      }
    };

    const draggableContent = (
      <div
        className={`${styles["icon"]} ${styles[className]}`}
        onDoubleClick={() => {
          isMobile ? undefined : handleIconClick(type);
        }}
        onClick={() => {
          isMobile ? handleIconClick(type) : undefined;
        }}
      >
        <div
          className={styles["icon-image"]}
          style={{
            width: width,
            height: height,
            backgroundImage:
              type === "image" ? `url(/divdivdiv/${path}.webp)` : `url(/divdivdiv/${type}.webp)`,
            boxShadow: type === "image" ? "1px 2px 5px gray" : undefined,
            border: type === "image" && path !== "readme" ? "4px solid white" : 0,
          }}
        ></div>
        {title && (
          <div
            className={styles["icon-title"]}
            style={{
              marginTop: type === "folder" || type === "fortune" ? "5px" : "10px",
            }}
          >
            <div>{title[language]}</div>
          </div>
        )}
      </div>
    );

    // 데스크톱에서만 드래그 가능한 아이콘으로 설정
    return isMobile ? (
      <React.Fragment>{draggableContent}</React.Fragment>
    ) : (
      <Draggable>{draggableContent}</Draggable>
    );
  };

  return (
    <div className={styles["icons-container"]}>
      <DraggableIcon
        className="icon-blog"
        path="https://blog.divdivdiv.com"
        type="folder"
        title={iconTitle.blog}
        width={iconSize.folder.width}
        height={iconSize.folder.height}
      />
      <DraggableIcon
        className="icon-music"
        path="https://music.divdivdiv.com"
        type="folder"
        title={iconTitle.music}
        width={iconSize.folder.width}
        height={iconSize.folder.height}
      />
      <DraggableIcon
        className="icon-barbershop"
        path="https://barbershop.divdivdiv.com"
        type="folder"
        title={iconTitle.barbershop}
        width={iconSize.folder.width}
        height={iconSize.folder.height}
      />
      <DraggableIcon
        className="icon-cinephile"
        path="https://cinephile.divdivdiv.com"
        type="folder"
        title={iconTitle.cinephile}
        width={iconSize.folder.width}
        height={iconSize.folder.height}
      />
      <DraggableIcon
        className="icon-fruits"
        path="https://fruits.divdivdiv.com"
        type="folder"
        title={iconTitle.fruits}
        width={iconSize.folder.width}
        height={iconSize.folder.height}
      />
      <DraggableIcon
        className="icon-words"
        path="https://words.divdivdiv.com"
        type="folder"
        title={iconTitle.words}
        width={iconSize.folder.width}
        height={iconSize.folder.height}
      />
      <DraggableIcon
        className="icon-cat"
        path="cat"
        type="image"
        title={iconTitle.cat}
        width={iconSize.image.width}
        height={iconSize.image.height}
        blurHash={"LLGuze8^W?S700.TRhRi9bIT$|-="}
      />
      <DraggableIcon
        className="icon-me"
        path="me"
        type="image"
        title={iconTitle.me}
        width={iconSize.image.width}
        height={iconSize.image.height}
        blurHash={"LLIN,9?G?aSi~o4:IoRPXS-oxaR*"}
      />
      <DraggableIcon
        className="icon-fortune"
        path="fortune"
        type="fortune"
        title={iconTitle.fortune}
        width={iconSize.fortune.width}
        height={iconSize.fortune.height}
      />
      <DraggableIcon
        className="icon-readme"
        path="readme"
        type="image"
        title={iconTitle.readme}
        width={iconSize.image.width}
        height={iconSize.image.height}
      />
      {/* PostIt 애매해서 일단 각주 처리! */}
      {/* <Draggable>
        <PostIt language={language} />
      </Draggable> */}
    </div>
  );
};

const MemoizedIcons = memo(DraggableIcons);

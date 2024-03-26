"use client";

import DraggableIcons from "./components/DraggableIcons";
import { ImageModal } from "./components/Modal";
import { useAtom } from "jotai";
import { FunctionalLayout } from "./components/FunctionalLayout";
import { imgAltAtom, imgSrcAtom, showImageAtom } from "./modules/atoms";

export default function Page() {
  const [showImage, setShowImage] = useAtom(showImageAtom);
  const [imgSrc, setImgSrc] = useAtom(imgSrcAtom);
  const [imgAlt, setImgAlt] = useAtom(imgAltAtom);

  const handleModalClick = () => {
    setShowImage(false);
    setImgSrc("");
    setImgAlt("");
  };

  return (
    <>
      {showImage && <ImageModal src={imgSrc} alt={imgAlt} onClick={handleModalClick} />}
      <FunctionalLayout>
        <DraggableIcons />
      </FunctionalLayout>
    </>
  );
}

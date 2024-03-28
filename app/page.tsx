"use client";

import { ImageModal } from "./components/main/Modal";
import { useAtom } from "jotai";
import { imgAltAtom, imgSrcAtom, showImageAtom } from "./modules/atoms";
import { Layout } from "./components/@common/Layout";
import { Icons } from "./components/main/DraggableIcons";

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
      <Layout>
        <Icons />
      </Layout>
    </>
  );
}

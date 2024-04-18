"use client";

import { ImageModal } from "./components/main/Modal";
import { useAtomValue } from "jotai";
import { showImageAtom } from "./modules/atoms";
import { Layout } from "./components/@common/Layout";
import { Icons } from "./components/main/DraggableIcons";

export default function Page() {
  const showImage = useAtomValue(showImageAtom);

  return (
    <>
      {showImage && <ImageModal />}
      <Layout>
        <Icons />
      </Layout>
    </>
  );
}

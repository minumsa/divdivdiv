import { useAtomValue, useSetAtom } from "jotai";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import styles from "../../divdivdiv.module.css";
import { languageAtom, showImageAtom } from "@/app/modules/atoms";
import { Nav } from "../nav/Nav";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const showImage = useAtomValue(showImageAtom);
  const setLanguage = useSetAtom(languageAtom);
  const searchParams = useSearchParams();
  const currentLanguage: any = searchParams.get("language");

  useEffect(() => {
    setLanguage(currentLanguage ? currentLanguage : "ko");
  }, []);

  return (
    <div className={styles["container-background"]}>
      <div className={styles["container-fade"]} style={{ opacity: showImage ? 0.5 : undefined }}>
        <div className={styles["container"]}>
          <div className={styles["nav-container"]}>
            <Nav />
          </div>
          <div className={styles["content"]}>
            {/* FIXME: 이미지 모달 사진 크기 때문에 window.innerWidth 사용해서 NoSSR 넣음. 추후에 미디어 쿼리 등 다른 방향으로 수정할 수 있으면 하고 NoSSR 제거하기.*/}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

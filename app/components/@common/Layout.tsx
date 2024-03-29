import { useAtomValue, useSetAtom } from "jotai";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import styles from "./Layout.module.css";
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
          <div className={styles["content-container"]}>{children}</div>
        </div>
      </div>
    </div>
  );
};

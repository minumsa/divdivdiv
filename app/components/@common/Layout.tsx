"use client";

import { useAtomValue } from "jotai";
import styles from "./Layout.module.css";
import { showImageAtom } from "@/app/modules/atoms";
import { Nav } from "../nav/Nav";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const showImage = useAtomValue(showImageAtom);

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

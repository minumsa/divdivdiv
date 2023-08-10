"use client";

import { usePathname, useRouter } from "next/navigation";
import styles from "../music.module.css";
import { PageProps, activeStyle, contents } from "../lib/data";
import Content from "../lib/Content";
import { useEffect, useState } from "react";

export default function Page({ params }: PageProps) {
  // FIXME: Dynamic Routes params 방식으로 바꾸기
  const router = useRouter();
  const pathName = params.genre;
  const fullPathName = usePathname();
  const [showCategory, setShowCategory] = useState<boolean>(false);

  useEffect(() => {
    setShowCategory(false);
  }, []);

  return (
    <div className={styles["container"]}>
      <div className={styles["category-container"]}>
        <div className={styles["mobile-title"]}>
          <div>divdivdiv</div>
        </div>
        <div
          className={styles["hamburger-container"]}
          onClick={() => {
            setShowCategory(!showCategory);
          }}
        >
          <div className={styles["hamburger"]}></div>
          {showCategory ? (
            <div className={styles["hamburger-category"]}>
              {Object.keys(contents).map((category, index) => {
                if (index > 0)
                  return (
                    <div
                      key={category}
                      className={styles["hamburger-content"]}
                      onClick={() => {
                        router.push(`/music/${category}`);
                      }}
                      style={pathName === category ? activeStyle : {}}
                    >
                      {contents[category]}
                    </div>
                  );
              })}
            </div>
          ) : null}
        </div>
        <div className={styles["mobile-test"]}>
          {Object.keys(contents).map(category => {
            return (
              <div
                key={category}
                className={styles["category"]}
                onClick={() => {
                  router.push(`/music/${category}`);
                }}
                style={pathName === category ? activeStyle : {}}
              >
                {contents[category]}
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles["content-container"]}>
        <Content pathName={pathName} fullPathName={fullPathName} />
      </div>
    </div>
  );
}

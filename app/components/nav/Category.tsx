import { usePathname, useRouter } from "next/navigation";
import styles from "./Category.module.css";
import { useAtomValue } from "jotai";
import { languageAtom } from "../../modules/atoms";

interface RenderButtonProps {
  text: string;
  path: string;
}

export function Category({ text, path }: RenderButtonProps) {
  const router = useRouter();
  const currentPath = usePathname();
  const isCurrentPath = path === currentPath;

  return (
    <div
      className={styles["button-left"]}
      style={
        isCurrentPath
          ? {
              fontWeight: "600",
            }
          : undefined
      }
      onClick={() => {
        router.push(path);
      }}
    >
      <div>{text}</div>
    </div>
  );
}

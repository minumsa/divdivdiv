import { usePathname, useRouter } from "next/navigation";
import styles from "../divdivdiv.module.css";
import { useAtomValue } from "jotai";
import { languageAtom } from "../modules/atoms";

interface RenderButtonProps {
  text: string;
  path: any;
}

export function Category({ text, path }: RenderButtonProps) {
  const router = useRouter();
  const currentPath = usePathname();
  const language = useAtomValue(languageAtom);

  return (
    <div
      className={styles["button-left"]}
      style={
        path === currentPath
          ? {
              fontWeight: "600",
            }
          : undefined
      }
      onClick={() => {
        router.push(`${path}?language=${language}`);
      }}
    >
      <div>{text}</div>
    </div>
  );
}

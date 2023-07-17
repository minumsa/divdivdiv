"use client";

import { NextPage } from "next";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Pop from "../Pop";
import Kpop from "../Kpop";
import Rock from "../Rock";
import Disco from "../Disco";
import Folk from "../Folk";
import Jazz from "../Jazz";
import Classical from "../Classical";
import Soundtrack from "../Soundtrack";
import Upload from "../Upload";

const ContentPage: NextPage<{ params: { slug: string } }> = ({ params }) => {
  const decodedSlug = decodeURIComponent(params.slug);
  const router = useRouter();
  const pathName = usePathname();
  const genreByPath =
    pathName.split("/").length > 2 ? pathName.split("/")[2].toUpperCase() : "";

  const initialAlbumId: any[] = JSON.parse(
    localStorage.getItem("albumId") || "[]"
  );
  const [albumId, setAlbumId] = useState<any[]>(initialAlbumId);

  useEffect(() => {
    localStorage.setItem("albumId", JSON.stringify(albumId));
  }, [albumId]);

  console.log("albumId", albumId);

  const contents = [
    "POP",
    "K-POP",
    "ROCK",
    "DISCO",
    "FOLK",
    "JAZZ",
    "CLASSICAL",
    "SOUNDTRACK",
    "ALL",
  ];

  const [activeGenre, setActiveGenre] = useState("ALL");
  const [loginPage, setLoginPage] = useState(false);

  const handleGenreClick = (genre: any) => {
    setLoginPage(false);
    const genrePath = genre.toLowerCase();
    genrePath === "all"
      ? router.push(`/music`)
      : router.push(`/music/${genrePath}`);
  };

  let content = null;

  switch (decodedSlug) {
    case "pop":
      content = <Pop />;
      break;
    case "k-pop":
      content = <Kpop />;
      break;
    case "rock":
      content = <Rock />;
      break;
    case "disco":
      content = <Disco />;
      break;
    case "folk":
      content = <Folk />;
      break;
    case "jazz":
      content = <Jazz />;
      break;
    case "classical":
      content = <Classical />;
      break;
    case "soundtrack":
      content = <Soundtrack />;
      break;
    case "upload":
      content = <Upload albumId={albumId} setAlbumId={setAlbumId} />;
      break;
    default:
      content = null;
  }

  return (
    <>
      <div
        className="music-left-container"
        style={{ width: "250px", height: "100%" }}
      >
        <div className="music-genre-container" style={{ paddingTop: "10px" }}>
          {contents.map((genre, index) => (
            <div
              key={genre}
              className={`music-genre ${activeGenre === genre ? "active" : ""}`}
              onClick={() => {
                setActiveGenre(genre);
                handleGenreClick(genre);
              }}
              style={
                (genreByPath === genre && !loginPage) ||
                (genreByPath.length < 1 && activeGenre === genre)
                  ? {
                      backgroundColor: "#ffccff",
                      borderRadius: 0,
                      color: "#000000",
                      fontWeight: "bold",
                    }
                  : {}
              }
            >
              {genre}
            </div>
          ))}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          height: "100%",
        }}
      >
        <div
          className="music-right-container"
          style={{ overflow: "scroll", width: "90%" }}
        >
          <div
            className="music-top-menu"
            onClick={() => {
              router.push("/music/upload");
              setActiveGenre("");
            }}
          >
            업로드
          </div>
          <div className="music-bottom-title">카버 차트 v1.1.1</div>
          {content}
        </div>
      </div>
    </>
  );
};

export default ContentPage;

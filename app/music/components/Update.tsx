import { forwardRef, useEffect, useState } from "react";
import styles from "../music.module.css";
import React from "react";
import { fetchDataById, fetchSpotify, updateData } from "../modules/api";
import { contents } from "../modules/data";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface UpdateProps {
  currentId: string;
}

// FIXME: Upload 컴포넌트와 겹치는 부분 리팩토링
export default function Update({ currentId }: UpdateProps) {
  const [data, setData] = useState<any>();
  const [albumId, setAlbumId] = useState("");
  const [artistId, setArtistId] = useState("");
  const [genre, setGenre] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [musicVideoTitle, setMusicVideoTitle] = useState("");
  const [musicVideoUrl, setMusicVideoUrl] = useState("");
  const [password, setPassword] = useState<string>("");
  const [score, setScore] = useState<number>(0);
  const scoreArray: number[] = [0.5, 1, 1.5, 2, 2.5, 3.0, 3.5, 4, 4.5, 5];
  const spotifyLink = `https://open.spotify.com/search/${link.length > 1 && link.split("/")[5]}`;
  const [uploadDate, setUploadDate] = useState(new Date());
  // const router= useRouter()

  // 수정 API
  const handleUpdate = async () => {
    const newAlbumData = await fetchSpotify({
      albumId,
      genre,
      link,
      text,
      uploadDate,
    });

    if (newAlbumData) {
      updateData(currentId, newAlbumData, score, musicVideoTitle, musicVideoUrl, password);
    }
  };

  const handlePasswordEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleUpdate();
    }
  };

  useEffect(() => {
    async function getData() {
      const fetchData = await fetchDataById(currentId);
      setData(fetchData);
      const { id, artistId, genre, link, text, uploadDate, score } = fetchData;

      setAlbumId(id);
      setArtistId(artistId);
      setGenre(genre);
      setLink(link);
      setText(text);
      setScore(score);
      setUploadDate(new Date(uploadDate));
    }

    getData();
  }, []);

  useEffect(() => {
    setData({ ...data, id: albumId, genre: genre, link: link, text: text });
  }, [albumId, genre, link, text]);

  return (
    <>
      <div
        className={`${styles["album-container"]} ${styles["upload-container"]}`}
        style={{ flexDirection: "column", paddingTop: "50px" }}
      >
        <div className={styles["title"]}>수정 페이지</div>
        <div className={styles["upload-item-title"]}>장르</div>
        <div className={styles["select-container"]}>
          <select
            className={styles["select"]}
            value={genre}
            onChange={e => {
              setGenre(e.target.value);
            }}
          >
            <option value="">--장르를 선택해주세요--</option>
            {Object.entries(contents).map(([key, value]) => {
              return (
                <option value={key} key={key}>
                  {value}
                </option>
              );
            })}
          </select>
        </div>
        <div className={styles["upload-item-title"]}>링크(Apple Music)</div>
        <textarea
          className={styles["input"]}
          value={link}
          onChange={e => {
            setLink(e.target.value);
          }}
        />
        <a href={spotifyLink} target="_blank" style={{ textDecoration: "none", color: "#cfcfcf" }}>
          <div className={styles["upload-item-title"]}>앨범 ID(Spotify)</div>
        </a>
        <textarea
          className={styles["input"]}
          value={albumId}
          onChange={e => {
            setAlbumId(e.target.value);
          }}
        />
        <div className={styles["upload-item-title"]}>아티스트 ID(Spotify)</div>
        <textarea
          className={styles["input"]}
          value={artistId}
          onChange={e => {
            setArtistId(e.target.value);
          }}
        />
        <div className={styles["upload-item-title"]}>별점</div>
        <div className={styles["select-container"]}>
          <select
            className={styles["select"]}
            value={score}
            onChange={e => {
              setScore(Number(e.target.value));
            }}
          >
            <option value="">--스코어를 선택해주세요--</option>
            {scoreArray.map((item, index) => {
              return <option key={index}>{item}</option>;
            })}
          </select>
        </div>
        <div className={styles["upload-item-title"]}>글</div>
        <textarea
          className={`${styles["input"]} ${styles["input-text"]}`}
          value={text}
          onChange={e => {
            setText(e.target.value);
          }}
        />
        <div className={styles["upload-item-title"]}>뮤직비디오(MV) 제목</div>
        <input
          className={`${styles["input"]} ${styles["input-link"]}`}
          value={musicVideoTitle}
          onChange={e => {
            setMusicVideoTitle(e.target.value);
          }}
        />
        <div className={styles["upload-item-title"]}>뮤직비디오(MV) 링크</div>
        <input
          className={`${styles["input"]} ${styles["input-link"]}`}
          value={musicVideoUrl}
          onChange={e => {
            setMusicVideoUrl(e.target.value);
          }}
        />
        <div className={styles["upload-item-title"]}>작성일</div>
        <DatePicker
          selected={uploadDate}
          onChange={date => date && setUploadDate(date)}
          dateFormat={"yyyy/MM/dd"}
          className={styles["date-input"]}
        />
        <div className={styles["upload-item-title"]} style={{ marginTop: "50px" }}>
          관리자 비밀번호
        </div>
        <input
          className={styles["input"]}
          value={password}
          onChange={e => {
            setPassword(e.target.value);
          }}
          onKeyDown={handlePasswordEnter}
        />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div
            className={`${styles["button"]} ${styles["submit"]}`}
            onClick={() => {
              handleUpdate();
            }}
          >
            제출하기
          </div>
        </div>
      </div>
    </>
  );
}

import { atom } from "jotai";
import { Language } from "./types";

export const showImageAtom = atom(false);
export const imgSrcAtom = atom("");
export const imgAltAtom = atom("");
export const languageAtom = atom<Language>("ko");
export const blurHashAtom = atom<string>("");

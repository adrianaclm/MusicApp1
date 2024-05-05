import { SetStateAction } from "react";

export interface PlayContextProps {
  isPlaying: boolean;
  setIsPlaying: (e: boolean) => void;
}

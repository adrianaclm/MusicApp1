import React, { PropsWithChildren, useState } from "react";
import PlayContext from "./PlayContext";

const PlayState = ({ children }: PropsWithChildren) => {


  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  return (
    <PlayContext.Provider value={{ isPlaying, setIsPlaying }}>
      {children}
    </PlayContext.Provider>
  );

};

export default PlayState;

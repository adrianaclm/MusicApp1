import React, { PropsWithChildren, createContext, useState } from 'react';

export const PlayContext = createContext({
  isPlaying: false,
  setIsPlaying: (e:boolean) => {},
});

export const PlayProvider = ({ children }:PropsWithChildren) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <PlayContext.Provider value={{ isPlaying, setIsPlaying }}>
      {children}
    </PlayContext.Provider>
  );
};

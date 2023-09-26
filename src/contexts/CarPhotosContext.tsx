import { createContext, useEffect, useState } from "react";

export interface ICarPhotosContext {
  frontPhoto: string;
  leftPhoto: string;
  rightPhoto: string;
  backPhoto: string;
  setFrontPhoto: (photo: string) => void;
  setLeftPhoto: (photo: string) => void;
  setRightPhoto: (photo: string) => void;
  setBackPhoto: (photo: string) => void;
}

export const CarPhotosContext = createContext({} as ICarPhotosContext);

type CarPhotosProviderProps = {
  children: React.ReactNode;
};

export function CarPhotosProvider({ children }: CarPhotosProviderProps) {
  const [frontPhoto, setFrontPhoto] = useState("");
  const [leftPhoto, setLeftPhoto] = useState("");
  const [rightPhoto, setRightPhoto] = useState("");
  const [backPhoto, setBackPhoto] = useState("");

  useEffect(() => {
    console.log({ frontPhoto, leftPhoto, rightPhoto, backPhoto });
  }, [frontPhoto, leftPhoto, rightPhoto, backPhoto]);

  return (
    <CarPhotosContext.Provider
      value={{
        frontPhoto,
        leftPhoto,
        rightPhoto,
        backPhoto,
        setFrontPhoto,
        setLeftPhoto,
        setRightPhoto,
        setBackPhoto,
      }}
    >
      {children}
    </CarPhotosContext.Provider>
  );
}

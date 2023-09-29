import { createContext, useEffect, useState } from "react";

import { RequestModalProviderProps, IRequestModalContext, TVehicle } from "./types";

export const RequestModalContext = createContext({} as IRequestModalContext);

export function RequestModalProvider({ children }: RequestModalProviderProps) {
  const [selectedVehicle, setSelectedVehicle] = useState<TVehicle | null>(null);
  const [localization, setLocalization] = useState("");
  const [problems, setProblems] = useState<string[]>([]);
  const [problemDescription, setProblemDescription] = useState("");
  const [frontPhoto, setFrontPhoto] = useState("");
  const [leftPhoto, setLeftPhoto] = useState("");
  const [rightPhoto, setRightPhoto] = useState("");
  const [backPhoto, setBackPhoto] = useState("");

  useEffect(() => {
    console.log({ frontPhoto, leftPhoto, rightPhoto, backPhoto });
  }, [frontPhoto, leftPhoto, rightPhoto, backPhoto]);

  return (
    <RequestModalContext.Provider
      value={{
        frontPhoto,
        leftPhoto,
        rightPhoto,
        backPhoto,
        setFrontPhoto,
        setLeftPhoto,
        setRightPhoto,
        setBackPhoto,
        localization,
        setLocalization,
        problems,
        setProblems,
        selectedVehicle,
        setSelectedVehicle,
        problemDescription,
        setProblemDescription,
      }}
    >
      {children}
    </RequestModalContext.Provider>
  );
}

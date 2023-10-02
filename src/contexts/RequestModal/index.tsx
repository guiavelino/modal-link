import { createContext, useEffect, useState } from "react";

import { RequestModalProviderProps, IRequestModalContext, TVehicle } from "./types";

export const RequestModalContext = createContext({} as IRequestModalContext);

export function RequestModalProvider({ children }: RequestModalProviderProps) {
  // STEPS
  const stepFactory = (id: number, label: string, isCompleted: boolean) => ({ id, label, isCompleted });
  const [activeStep, setActiveStep] = useState(0);
  const [steps, setSteps] = useState([
    stepFactory(0, "Solicitar Modal", false),
    stepFactory(1, "Foto frontal", false),
    stepFactory(2, "Foto da lateral esquerda", false),
    stepFactory(3, "Foto da lateral direita", false),
    stepFactory(4, "Foto da traseira", false),
    stepFactory(5, "Solicitar Modal", false),
  ]);

  // STEP 1
  const [selectedVehicle, setSelectedVehicle] = useState<TVehicle | undefined>();
  const [localization, setLocalization] = useState<string>("");
  const [problems, setProblems] = useState<string[]>([]);
  const [problemDescription, setProblemDescription] = useState<string>("");
  const [isCarLoaded, setIsCarLoaded] = useState<boolean | undefined>();
  const [weightInKg, setWeightInKg] = useState<number | undefined>();
  const [typeOfLoad, setTypeOfLoad] = useState<string[]>([]);

  // STEP 2
  const [frontPhoto, setFrontPhoto] = useState("");
  const [leftPhoto, setLeftPhoto] = useState("");
  const [rightPhoto, setRightPhoto] = useState("");
  const [backPhoto, setBackPhoto] = useState("");

  useEffect(() => {
    console.log({ frontPhoto, leftPhoto, rightPhoto, backPhoto });
  }, [frontPhoto, leftPhoto, rightPhoto, backPhoto]);

  useEffect(() => {
    if (!isCarLoaded) {
      setWeightInKg(undefined);
      setTypeOfLoad([]);
    }
  }, [isCarLoaded]);

  return (
    <RequestModalContext.Provider
      value={{
        stepFactory,
        activeStep,
        setActiveStep,
        steps,
        setSteps,
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
        setIsCarLoaded,
        isCarLoaded,
        weightInKg,
        setWeightInKg,
        typeOfLoad,
        setTypeOfLoad,
      }}
    >
      {children}
    </RequestModalContext.Provider>
  );
}

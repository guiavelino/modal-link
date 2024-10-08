import { createContext, useEffect, useState } from "react";

import { RequestModalProviderProps, IRequestModalContext, TProblem, TTypeLoad } from "./types";
import { ImageListType } from "react-images-uploading";
import { step1Validation } from "./stepsFormValidations/step1Validation";
import { stepPhotosValidation } from "./stepsFormValidations/stepPhotosValidation";
import { Vehicle } from "@prisma/client";

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
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | undefined>();
  const [localization, setLocalization] = useState<string>("");
  const [problems, setProblems] = useState<TProblem[]>([]);
  const [selectedProblems, setSelectedProblems] = useState<string[]>([]);
  const [problemDescription, setProblemDescription] = useState<string>("");
  const [isCarLoaded, setIsCarLoaded] = useState<boolean | undefined>();
  const [weightInKg, setWeightInKg] = useState<number | undefined>();
  const [typeOfLoad, setTypeOfLoad] = useState<TTypeLoad[]>([]);
  const [selectedTypeOfLoads, setSelectedTypeOfLoads] = useState<string[]>([]);
  const [lon, setLon] = useState<number>(0);
  const [lat, setLat] = useState<number>(0);

  const [frontPhoto, setFrontPhoto] = useState<ImageListType[]>([]);
  const [leftPhoto, setLeftPhoto] = useState<ImageListType[]>([]);
  const [rightPhoto, setRightPhoto] = useState<ImageListType[]>([]);
  const [backPhoto, setBackPhoto] = useState<ImageListType[]>([]);

  const resetContext = () => {
    setActiveStep(0);
    setSteps([
      stepFactory(0, "Solicitar Modal", false),
      stepFactory(1, "Foto frontal", false),
      stepFactory(2, "Foto da lateral esquerda", false),
      stepFactory(3, "Foto da lateral direita", false),
      stepFactory(4, "Foto da traseira", false),
      stepFactory(5, "Solicitar Modal", false),
    ]);
    setSelectedVehicle(undefined);
    setLocalization("");
    setProblems([]);
    setSelectedProblems([]);
    setProblemDescription("");
    setIsCarLoaded(undefined);
    setWeightInKg(undefined);
    setTypeOfLoad([]);
    setSelectedTypeOfLoads([]);
    setLon(0);
    setLat(0);
    setFrontPhoto([]);
    setLeftPhoto([]);
    setRightPhoto([]);
    setBackPhoto([]);
  };

  useEffect(() => {
    if (activeStep === 0) {
      step1Validation({
        problemDescription,
        localization,
        problems,
        setProblemDescription,
        setSteps,
        setTypeOfLoad,
        setWeightInKg,
        typeOfLoad,
        isCarLoaded,
        selectedVehicle,
        weightInKg,
      });
    } else if (activeStep > 0 && activeStep < 5) {
      stepPhotosValidation({
        frontPhoto,
        leftPhoto,
        rightPhoto,
        backPhoto,
        setSteps,
        activeStep,
      });
    } else if (activeStep === 5) {
      setSteps((prev) => prev.map((step) => ({ ...step, isCompleted: true })));
      return;
    }
  }, [
    selectedVehicle,
    localization,
    problems,
    problemDescription,
    isCarLoaded,
    weightInKg,
    typeOfLoad,
    frontPhoto,
    leftPhoto,
    rightPhoto,
    backPhoto,
  ]);

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
        selectedProblems,
        setSelectedProblems,
        selectedTypeOfLoads,
        setSelectedTypeOfLoads,
        lon, 
        setLon,
        lat,
        setLat,
        resetContext
      }}
    >
      {children}
    </RequestModalContext.Provider>
  );
}

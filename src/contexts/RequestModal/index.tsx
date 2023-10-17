import { createContext, useEffect, useState } from "react";

import { RequestModalProviderProps, IRequestModalContext, TVehicle } from "./types";
import { ImageListType } from "react-images-uploading";

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
  const [frontPhoto, setFrontPhoto] = useState<ImageListType[]>([]);
  const [leftPhoto, setLeftPhoto] = useState<ImageListType[]>([]);
  const [rightPhoto, setRightPhoto] = useState<ImageListType[]>([]);
  const [backPhoto, setBackPhoto] = useState<ImageListType[]>([]);

  useEffect(() => {
    if (!problems.includes("Outros")) {
      setProblemDescription("");
    }
    if (selectedVehicle && localization.length > 0 && problems.length > 0) {
      if (problems.includes("Outros") && problemDescription.length === 0) {
        setSteps((prev) => prev.map((step) => (step.id === 0 ? { ...step, isCompleted: false } : step)));

        return;
      } else {
        setSteps((prev) => prev.map((step) => (step.id === 0 ? { ...step, isCompleted: true } : step)));
      }

      if (isCarLoaded || !isCarLoaded) {
        if (isCarLoaded && weightInKg && typeOfLoad.length > 0) {
          setSteps((prev) => prev.map((step) => (step.id === 0 ? { ...step, isCompleted: true } : step)));
        } else if (!isCarLoaded) {
          setSteps((prev) => prev.map((step) => (step.id === 0 ? { ...step, isCompleted: true } : step)));
          setWeightInKg(undefined);
          setTypeOfLoad([]);
        } else {
          setSteps((prev) => prev.map((step) => (step.id === 0 ? { ...step, isCompleted: false } : step)));
        }
      }
    } else {
      setSteps((prev) => prev.map((step) => (step.id === 0 ? { ...step, isCompleted: false } : step)));
    }
  }, [selectedVehicle, localization, problems, problemDescription, isCarLoaded, weightInKg, typeOfLoad]);

  useEffect(() => {
    if (frontPhoto.length > 0) {
      setSteps((prev) => prev.map((step) => (step.id === 1 ? { ...step, isCompleted: true } : step)));
    }
    
    if (leftPhoto.length > 0) {
      setSteps((prev) => prev.map((step) => (step.id === 2 ? { ...step, isCompleted: true } : step)));
    }
    
    if (rightPhoto.length > 0) {
      setSteps((prev) => prev.map((step) => (step.id === 3 ? { ...step, isCompleted: true } : step)));
    }
    
    if (backPhoto.length > 0) {
      setSteps((prev) => prev.map((step) => (step.id === 4 ? { ...step, isCompleted: true } : step)));
    }
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

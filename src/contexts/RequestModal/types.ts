import { Problem, TypeLoad, Vehicle } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";
import { ImageListType } from "react-images-uploading";

export type TProblem = Pick<Problem, "id" | "name">;
export type TTypeLoad = Pick<TypeLoad, "id" | "name">;

export type TStep = {
  id: number;
  label: string;
  isCompleted: boolean;
};

export type TStepFactory = (id: number, label: string, isCompleted: boolean) => TStep;

export interface IRequestModalContext {
  activeStep: number;
  setActiveStep: Dispatch<SetStateAction<number>>;
  steps: TStep[];
  setSteps: Dispatch<SetStateAction<TStep[]>>;
  stepFactory: TStepFactory;

  frontPhoto: ImageListType[];
  leftPhoto: ImageListType[];
  rightPhoto: ImageListType[];
  backPhoto: ImageListType[];
  setFrontPhoto: Dispatch<SetStateAction<ImageListType[]>>;
  setLeftPhoto: Dispatch<SetStateAction<ImageListType[]>>;
  setRightPhoto: Dispatch<SetStateAction<ImageListType[]>>;
  setBackPhoto: Dispatch<SetStateAction<ImageListType[]>>;

  localization: string;
  problems: TProblem[];
  selectedProblems: string[];
  problemDescription: string;
  typeOfLoad: TTypeLoad[];
  selectedTypeOfLoads: string[];
  lon: number;
  lat: number;

  setLocalization: Dispatch<SetStateAction<string>>;
  setProblems: Dispatch<SetStateAction<TProblem[]>>;
  setSelectedProblems: Dispatch<SetStateAction<string[]>>;
  setSelectedVehicle: Dispatch<SetStateAction<Vehicle | undefined>>;
  setProblemDescription: Dispatch<SetStateAction<string>>;
  setIsCarLoaded: Dispatch<SetStateAction<boolean | undefined>>;
  setWeightInKg: Dispatch<SetStateAction<number | undefined>>;
  setTypeOfLoad: Dispatch<SetStateAction<TTypeLoad[]>>;
  setSelectedTypeOfLoads: Dispatch<SetStateAction<string[]>>;
  setLon: Dispatch<SetStateAction<number>>;
  setLat: Dispatch<SetStateAction<number>>;

  isCarLoaded?: boolean;
  weightInKg?: number;
  selectedVehicle?: Vehicle;

  resetContext: () => void;
}

export type RequestModalProviderProps = {
  children: React.ReactNode;
};

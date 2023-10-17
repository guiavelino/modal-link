import { Vehicle } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";

export type TVehicle = Pick<Vehicle, "id" | "transitBoard">;

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

  frontPhoto: never[];
  leftPhoto: never[];
  rightPhoto: never[];
  backPhoto: never[];
  setFrontPhoto: Dispatch<SetStateAction<never[]>>;
  setLeftPhoto: Dispatch<SetStateAction<never[]>>;
  setRightPhoto: Dispatch<SetStateAction<never[]>>;
  setBackPhoto: Dispatch<SetStateAction<never[]>>;

  localization: string;
  problems: string[];
  problemDescription: string;
  typeOfLoad: string[];

  setLocalization: Dispatch<SetStateAction<string>>;
  setProblems: Dispatch<SetStateAction<string[]>>;
  setSelectedVehicle: Dispatch<SetStateAction<TVehicle | undefined>>;
  setProblemDescription: Dispatch<SetStateAction<string>>;
  setIsCarLoaded: Dispatch<SetStateAction<boolean | undefined>>;
  setWeightInKg: Dispatch<SetStateAction<number | undefined>>;
  setTypeOfLoad: Dispatch<SetStateAction<string[]>>;

  isCarLoaded?: boolean;
  weightInKg?: number;
  selectedVehicle?: TVehicle;
}

export type RequestModalProviderProps = {
  children: React.ReactNode;
};

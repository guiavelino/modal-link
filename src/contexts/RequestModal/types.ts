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

  frontPhoto: string;
  leftPhoto: string;
  rightPhoto: string;
  backPhoto: string;
  setFrontPhoto: Dispatch<SetStateAction<string>>;
  setLeftPhoto: Dispatch<SetStateAction<string>>;
  setRightPhoto: Dispatch<SetStateAction<string>>;
  setBackPhoto: Dispatch<SetStateAction<string>>;

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

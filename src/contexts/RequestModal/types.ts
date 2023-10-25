import { Problem, TypeLoad, Vehicle } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";
import { ImageListType } from "react-images-uploading";

export type TVehicle = Pick<Vehicle, "id" | "transitBoard">;
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
  problemDescription: string;
  typeOfLoad: TTypeLoad[];

  setLocalization: Dispatch<SetStateAction<string>>;
  setProblems: Dispatch<SetStateAction<TProblem[]>>;
  setSelectedVehicle: Dispatch<SetStateAction<TVehicle | undefined>>;
  setProblemDescription: Dispatch<SetStateAction<string>>;
  setIsCarLoaded: Dispatch<SetStateAction<boolean | undefined>>;
  setWeightInKg: Dispatch<SetStateAction<number | undefined>>;
  setTypeOfLoad: Dispatch<SetStateAction<TTypeLoad[]>>;

  isCarLoaded?: boolean;
  weightInKg?: number;
  selectedVehicle?: TVehicle;
}

export type RequestModalProviderProps = {
  children: React.ReactNode;
};

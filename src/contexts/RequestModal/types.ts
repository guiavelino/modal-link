import { Vehicle } from "@prisma/client";

export type TVehicle = Pick<Vehicle, "id" | "transitBoard">;

export interface IRequestModalContext {
  frontPhoto: string;
  leftPhoto: string;
  rightPhoto: string;
  backPhoto: string;
  setFrontPhoto: (photo: string) => void;
  setLeftPhoto: (photo: string) => void;
  setRightPhoto: (photo: string) => void;
  setBackPhoto: (photo: string) => void;
  localization: string;
  setLocalization: (location: string) => void;
  problems: string[];
  setProblems: React.Dispatch<React.SetStateAction<string[]>>;
  selectedVehicle?: TVehicle | null;
  setSelectedVehicle: (vehicle: TVehicle) => void;
}

export type RequestModalProviderProps = {
  children: React.ReactNode;
};

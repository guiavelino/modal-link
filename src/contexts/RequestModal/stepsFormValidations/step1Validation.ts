import { IRequestModalContext } from "../types";

type Step1ValidationProps = Pick<
  IRequestModalContext,
  | "problems"
  | "selectedVehicle"
  | "localization"
  | "problemDescription"
  | "isCarLoaded"
  | "weightInKg"
  | "typeOfLoad"
  | "setSteps"
  | "setProblemDescription"
  | "setWeightInKg"
  | "setTypeOfLoad"
>;

export function step1Validation({
  problems,
  selectedVehicle,
  localization,
  problemDescription,
  isCarLoaded,
  weightInKg,
  typeOfLoad,
  setSteps,
  setProblemDescription,
  setWeightInKg,
  setTypeOfLoad,
}: Step1ValidationProps) {
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

    if (isCarLoaded || isCarLoaded === false) {
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
}

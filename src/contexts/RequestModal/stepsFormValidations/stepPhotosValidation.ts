import { IRequestModalContext } from "../types";

type StepPhotosValidationProps = Pick<
  IRequestModalContext,
  "frontPhoto" | "leftPhoto" | "rightPhoto" | "backPhoto" | "setSteps"
>;

export function stepPhotosValidation({
  frontPhoto,
  leftPhoto,
  rightPhoto,
  backPhoto,
  setSteps,
}: StepPhotosValidationProps) {
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
}

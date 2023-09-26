import { useState } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { IconButton } from "@mui/material";

import styles from "./styles.module.scss";
import SelectComponent from "@/components/Select";
import Input from "@/components/Input";
import MultipleSelectChip from "@/components/SelectChip";
import MultilineTextFields from "@/components/TextArea";
import Radio from "@/components/Radio";
import PhotoContainer from "@/components/PhotoContainer";
import frontTruck from "../../../public/front-truck.jpg";
import leftTruck from "../../../public/left-truck.jpg";
import rightTruck from "../../../public/right-truck.jpg";
import backTruck from "../../../public/back-truck.jpg";
import { useCarPhotos } from "@/hooks/useCarPhotos";

const FirstStep = () => {
  const optionsFactory = (id: number, description: string) => ({ id, description });

  const optionsVehicleProps = [
    optionsFactory(1, "Volvo - ABC-1234"),
    optionsFactory(2, "BMW - 1515"),
    optionsFactory(3, "FIAT - 6576"),
    optionsFactory(4, "Chevrolet - 4546"),
    optionsFactory(5, "Peugeot - 1212"),
  ];

  const optionsProblemsProps = [optionsFactory(1, "Falta combustível"), optionsFactory(2, "Pneu furado")];

  return (
    <div>
      <SelectComponent placeholder="Veículo" optionsProps={optionsVehicleProps} />

      <Input type="text" placeholder="Localização" name="location" />

      <MultipleSelectChip placeholder="Problema(s)" options={["Falta de combustível", "Pneu furado"]} />

      <MultilineTextFields />

      <Radio />

      <MultipleSelectChip placeholder="Tipo de carga" options={["Carga frágil", "Carga perecível"]} />

      <Input type="number" placeholder="Peso estimado da carga em kg" name="load" />
    </div>
  );
};

const SecondStep = () => {
  const { frontPhoto, setFrontPhoto } = useCarPhotos();

  return (
    <div>
      <PhotoContainer
        title="Posicione a parte frontal do veículo"
        exampleImage={frontTruck}
        photo={frontPhoto}
        setPhoto={setFrontPhoto}
      />
    </div>
  );
};

const ThirdStep = () => {
  const { leftPhoto, setLeftPhoto } = useCarPhotos();

  return (
    <div>
      <PhotoContainer
        title="Posicione a lateral esquerda do veículo"
        exampleImage={leftTruck}
        photo={leftPhoto}
        setPhoto={setLeftPhoto}
      />
    </div>
  );
};

const FourthStep = () => {
  const { rightPhoto, setRightPhoto } = useCarPhotos();

  return (
    <div>
      <PhotoContainer
        title="Posicione a lateral direita do veículo"
        exampleImage={rightTruck}
        photo={rightPhoto}
        setPhoto={setRightPhoto}
      />
    </div>
  );
};

const FifthStep = () => {
  const { backPhoto, setBackPhoto } = useCarPhotos();

  return (
    <div>
      <PhotoContainer
        title="Posicione a parte traseira do veículo"
        exampleImage={backTruck}
        photo={backPhoto}
        setPhoto={setBackPhoto}
      />
    </div>
  );
};

export default function RequestModal() {
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

  const handleNext = () => {
    if (activeStep === steps.length - 1) return;

    const newSteps = steps.map((step) => {
      if (step.id === activeStep) {
        step.isCompleted = true;
      }

      return step;
    });

    setSteps(newSteps);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    const lastStep = activeStep - 1;

    const newSteps = steps.map((step) => {
      if (step.id === lastStep) {
        step.isCompleted = false;
      }

      return step;
    });

    setSteps(newSteps);
    setActiveStep(lastStep);
  };

  return (
    <main className={styles.requestModal}>
      <section>
        <header className={styles.header}>
          <IconButton
            color="inherit"
            disabled={activeStep === 0}
            onClick={handleBack}
            style={{ margin: "0", padding: "0" }}
          >
            <MdKeyboardArrowLeft size={32} />
          </IconButton>
          <h1>{steps[activeStep].label}</h1>
          &nbsp;
        </header>
        <Stepper nonLinear activeStep={activeStep} className={styles.stepper}>
          {steps.map(({ id, isCompleted }) => (
            <Step key={id} completed={isCompleted}>
              <StepButton color="inherit" disabled />
            </Step>
          ))}
        </Stepper>
      </section>

      <section className={styles.content}>
        {activeStep === 0 && <FirstStep />}
        {activeStep === 1 && <SecondStep />}
        {activeStep === 2 && <ThirdStep />}
        {activeStep === 3 && <FourthStep />}
        {activeStep === 4 && <FifthStep />}
      </section>

      <Button onClick={handleNext} variant="contained" className={styles.nextButton}>
        Continuar
      </Button>
    </main>
  );
}

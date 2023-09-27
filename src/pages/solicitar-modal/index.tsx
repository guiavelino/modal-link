import { useEffect, useState } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { PiMapPinFill } from "react-icons/pi";
import { GiWeight } from "react-icons/gi";
import { IconButton } from "@mui/material";
import { useRouter } from "next/router";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import styles from "./styles.module.scss";
import SelectComponent from "@/components/Select";
import Input from "@/components/Input";
import MultipleSelectChip from "@/components/SelectChip";
import TextArea from "@/components/TextArea";
import Radio from "@/components/Radio";
import PhotoContainer from "@/components/PhotoContainer";
import frontTruck from "../../../public/front-truck.jpg";
import leftTruck from "../../../public/left-truck.jpg";
import rightTruck from "../../../public/right-truck.jpg";
import backTruck from "../../../public/back-truck.jpg";
import { useCarPhotos } from "@/hooks/useCarPhotos";
import CustomizedDialogs from "@/components/Modal";

const FirstStep = () => {
  const [localization, setLocalization] = useState("");
  const [weightInKg, setWeightInKg] = useState(0);
  const [lon, setLon] = useState<number>();
  const [lat, setLat] = useState<number>();
  const [checkedProblems, setCheckedProblems] = useState<string[]>([]);
  const [checkedLoads, setCheckedLoads] = useState<string[]>([]);
  const [radio, setRadio] = useState<boolean>();

  const optionsFactory = (id: number, description: string) => ({ id, description });

  const optionsVehicleProps = [optionsFactory(1, "Volvo - ABC-1234")];

  const position = async () => {
    await navigator.geolocation.getCurrentPosition(
      position => {
        setLon(position?.coords?.longitude)
        setLat(position?.coords?.latitude)
      }
    );
  }

  const getLocation = async () => {
    const baseUrl = 'https://api.tiles.mapbox.com';
    const data = await fetch(`${baseUrl}/v4/geocode/mapbox.places/${lon},${lat}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_GL_ACCESS_TOKEN ?? ''}`);
    const json = await data.json();
    setLocalization(json.features[0].place_name);
  }

  useEffect(() => {
    position()
  }, [])

  return (
    <div className={styles.firstStepFormulary}>
      <SelectComponent placeholder="Veículo" optionsProps={optionsVehicleProps} />

      <Input
        type="text"
        placeholder="Localização"
        name="location"
        icon={<PiMapPinFill />}
        onClick={getLocation}
        value={localization}
      />

      <MultipleSelectChip 
        placeholder="Problema(s)" 
        options={["Falta de combustível", "Pneu furado", "Outros"]} 
        checkedOptions={checkedProblems}
        setCheckedOptions={setCheckedProblems}
      />

      <TextArea placeholder="Descreva o problema do veículo..." />

      <Radio 
        setRadio={setRadio}
      />

      {radio && (
        <>
          <MultipleSelectChip 
            placeholder="Tipo de carga" 
            options={["Carga frágil", "Carga perecível"]} 
            checkedOptions={checkedLoads} 
            setCheckedOptions={setCheckedLoads} 
          />

          <Input
            onChange={(event) => {
              const { value } = event.target;
              setWeightInKg(Number(value));
            }}
            type="number"
            placeholder="Peso estimado da carga em kg"
            name="load"
            icon={<GiWeight />}
          />
        </>
      )}
    </div>
  );
};

const SecondStep = () => {
  const { frontPhoto, setFrontPhoto } = useCarPhotos();

  return (
    <PhotoContainer
      title="Posicione a parte frontal do veículo"
      exampleImage={frontTruck}
      photo={frontPhoto}
      setPhoto={setFrontPhoto}
    />
  );
};

const ThirdStep = () => {
  const { leftPhoto, setLeftPhoto } = useCarPhotos();

  return (
    <PhotoContainer
      title="Posicione a lateral esquerda do veículo"
      exampleImage={leftTruck}
      photo={leftPhoto}
      setPhoto={setLeftPhoto}
    />
  );
};

const FourthStep = () => {
  const { rightPhoto, setRightPhoto } = useCarPhotos();

  return (
    <PhotoContainer
      title="Posicione a lateral direita do veículo"
      exampleImage={rightTruck}
      photo={rightPhoto}
      setPhoto={setRightPhoto}
    />
  );
};

const FifthStep = () => {
  const { backPhoto, setBackPhoto } = useCarPhotos();

  return (
    <PhotoContainer
      title="Posicione a parte traseira do veículo"
      exampleImage={backTruck}
      photo={backPhoto}
      setPhoto={setBackPhoto}
    />
  );
};

const LastStep = () => {

  return (
    <div>
      
    </div>
  );
};

export default function RequestModal() {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Procurando Modal adequado...");
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
    if (activeStep === 5) {
      setOpenBackdrop(!openBackdrop)

      setTimeout(() => {
        setLoadingMessage("Procurando motorista...")
      }, 2000);

      setTimeout(() => {
        setOpenBackdrop(!openBackdrop)

        router.push('/solicitacoes/1');
      }, 4000);
    }

    if (activeStep === 4) {
      setOpenModal(!openModal)
    }

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
        {activeStep === 5 && <LastStep />}
      </section>

      <Button onClick={handleNext} variant="contained" className={styles.nextButton}>
        {activeStep === 5 ? 'Confirmar' : 'Continuar'}
      </Button>
          
      <CustomizedDialogs open={openModal} setOpen={setOpenModal} />

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openBackdrop}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          textAlign: 'center',
          gap: 16
        }}
      >
        <CircularProgress color="inherit" />
        <h3>{loadingMessage}</h3>
      </Backdrop>
    </main>
  );
}

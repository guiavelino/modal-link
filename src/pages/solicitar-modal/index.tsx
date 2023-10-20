import { useState } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { PiMapPinFill } from "react-icons/pi";
import { GiWeight } from "react-icons/gi";
import { Grid, IconButton, Popover, Radio, Snackbar, Typography } from "@mui/material";
import { useRouter } from "next/router";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import styles from "./styles.module.scss";
import SelectComponent from "@/components/Select";
import Input from "@/components/Input";
import MultipleSelectChip from "@/components/SelectChip";
import TextArea from "@/components/TextArea";
import RadioButtonsGroup from "@/components/RadioButtonsGroup";
import PhotoContainer from "@/components/PhotoContainer";
import frontTruck from "../../../public/front-truck.jpg";
import leftTruck from "../../../public/left-truck.jpg";
import rightTruck from "../../../public/right-truck.jpg";
import backTruck from "../../../public/back-truck.jpg";
import { useRequestModal } from "@/hooks/useRequestModal";
import CustomizedDialogs from "@/components/Modal";
import Image from "next/image";
import { Vehicle } from "@prisma/client";
import { ImageType } from "react-images-uploading";

const FirstStep = () => {
  const [vehicles] = useState<Pick<Vehicle, "id" | "transitBoard">[]>([
    { id: 1, transitBoard: "Volvo FH16 - ABC-1234" },
  ]);

  const {
    selectedVehicle,
    setSelectedVehicle,
    localization,
    setLocalization,
    problems,
    setProblems,
    problemDescription,
    setProblemDescription,
    isCarLoaded,
    setIsCarLoaded,
    weightInKg,
    setWeightInKg,
    typeOfLoad,
    setTypeOfLoad,
  } = useRequestModal();

  const [lon, setLon] = useState<number>();
  const [lat, setLat] = useState<number>();

  const [alertPermissionLocationOpen, setAlertPermissionLocationOpen] = useState(false);

  const vertical = "bottom";
  const horizontal = "center";

  const getLocation = async () => {
    await navigator.geolocation.getCurrentPosition(
      (position) => {
        setLon(position?.coords?.longitude);
        setLat(position?.coords?.latitude);
      },
      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          setAlertPermissionLocationOpen(true);
        }
      },
      { enableHighAccuracy: true }
    );

    if (lon && lat) {
      const baseUrl = "https://api.tiles.mapbox.com";
      const data = await fetch(
        `${baseUrl}/v4/geocode/mapbox.places/${lon},${lat}.json?access_token=${
          process.env.NEXT_PUBLIC_MAPBOX_GL_ACCESS_TOKEN ?? ""
        }`
      );
      const json = await data.json();
      setLocalization(json.features[0].place_name);
    }
  };

  return (
    <div className={styles.firstStepFormulary}>
      <SelectComponent
        placeholder="Veículo"
        optionsProps={vehicles.map((vehicle) => {
          return { id: vehicle.id, description: vehicle.transitBoard };
        })}
        selected={selectedVehicle?.id}
        setSelected={(id) =>
          setSelectedVehicle(
            vehicles.find((vehicle) => vehicle.id === id) ?? { id: 1, transitBoard: "Volvo FH16 - ABC-1234" }
          )
        }
      />

      <Input
        type="text"
        placeholder="Localização"
        name="location"
        icon={
          <PiMapPinFill />
        }
        iconOnClick={getLocation}
        onChange={(event) => {
          const { value } = event.target;
          setLocalization(value);
        }}
        value={localization}
      />

      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={alertPermissionLocationOpen}
        onClose={() => setAlertPermissionLocationOpen(false)}
        message="Ative a permissão de localização para localização automática."
        key={vertical + horizontal}
      />

      <MultipleSelectChip
        placeholder="Problema(s)"
        options={["Falta de combustível", "Pneu furado", "Outros"]}
        checkedOptions={problems}
        setCheckedOptions={setProblems}
      />

      {problems.includes("Outros") && (
        <TextArea
          placeholder="Descreva o problema do veículo..."
          value={problemDescription}
          onChange={(event) => {
            const { value } = event.target;
            setProblemDescription(value);
          }}
        />
      )}

      <RadioButtonsGroup
        FormControlLabelChildren={[
          { value: 1, label: "Sim", control: <Radio /> },
          { value: 0, label: "Não", control: <Radio /> },
        ]}
        formLabel="O veículo possui carga?"
        value={isCarLoaded ? 1 : 0}
        onChange={(event) => {
          setIsCarLoaded(Number(event.target.value) === 1);
        }}
      />

      {isCarLoaded && (
        <>
          <MultipleSelectChip
            placeholder="Tipo de carga"
            options={["Carga frágil", "Carga perecível"]}
            checkedOptions={typeOfLoad}
            setCheckedOptions={setTypeOfLoad}
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
            value={String(weightInKg) ?? undefined}
          />
        </>
      )}
    </div>
  );
};

const SecondStep = () => {
  const { frontPhoto, setFrontPhoto } = useRequestModal();

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
  const { leftPhoto, setLeftPhoto } = useRequestModal();

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
  const { rightPhoto, setRightPhoto } = useRequestModal();

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
  const { backPhoto, setBackPhoto } = useRequestModal();

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
  const {
    selectedVehicle,
    localization,
    problems,
    problemDescription,
    typeOfLoad,
    weightInKg,
    isCarLoaded,
    frontPhoto,
    leftPhoto,
    rightPhoto,
    backPhoto,
  } = useRequestModal();

  return (
    <div className={styles.lastStepContainer}>
      <article>
        <h3>Veículo</h3>
        <p>{selectedVehicle?.transitBoard}</p>
      </article>

      <article>
        <h3>Localização</h3>
        <p>{localization}</p>
      </article>

      <article>
        <h3>Problema</h3>
        <div className={styles.pillContainer}>
          {problems.map((problem, idx) => (
            <span key={`${problem}-${idx}`}>{problem}</span>
          ))}
        </div>
        {problems.includes("Outros") && (
          <>
            <h3 style={{ marginTop: 8 }}>Descrição do Problema</h3>
            <p>{problemDescription}</p>
          </>
        )}
      </article>

      {isCarLoaded && (
        <article>
          <h3>Carga do veículo</h3>
          <div className={styles.pillContainer}>
            {typeOfLoad.map((load, idx) => (
              <span key={`${load}-${idx}`}>{load}</span>
            ))}
          </div>
          <h3 style={{ marginTop: 8 }}>Peso estimado da carga (Kg)</h3>
          <p>{weightInKg}</p>
        </article>
      )}

      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        style={{ margin: 0, height: "100%", width: "100%" }}
      >
        <Grid item xs={6} style={{ margin: 0, padding: "0 4px 4px 0", width: "50%" }}>
          <Image
            src={(frontPhoto[0] as ImageType).dataURL ?? ""}
            width={180}
            height={120}
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "4px",
            }}
          />
        </Grid>
        <Grid item xs={6} style={{ margin: 0, padding: "0 0 4px 4px", width: "50%" }}>
          <Image
            src={(leftPhoto[0] as ImageType).dataURL ?? ""}
            width={180}
            height={120}
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "4px",
            }}
          />
        </Grid>
        <Grid item xs={6} style={{ margin: 0, padding: "0 4px 0 0", width: "50%" }}>
          <Image
            src={(rightPhoto[0] as ImageType).dataURL ?? ""}
            width={180}
            height={120}
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "4px",
            }}
          />
        </Grid>
        <Grid item xs={6} style={{ margin: 0, padding: "0 0 0 4px", width: "50%" }}>
          <Image
            src={(backPhoto[0] as ImageType).dataURL ?? ""}
            width={180}
            height={120}
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "4px",
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default function RequestModal() {
  const router = useRouter();
  const { activeStep, setActiveStep, steps, setSteps } = useRequestModal();
  const [openModal, setOpenModal] = useState(false);
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Procurando Modal adequado...");

  const handleNext = () => {
    if (activeStep === 5) {
      setOpenBackdrop(!openBackdrop);

      setTimeout(() => {
        setLoadingMessage("Procurando motorista...");
      }, 2000);

      setTimeout(() => {
        setOpenBackdrop(!openBackdrop);

        router.push("/solicitacoes/1");
      }, 4000);
    }

    if (activeStep === 4) {
      setOpenModal(!openModal);
    }

    if (activeStep === steps.length - 1) return;

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    const lastStep = activeStep - 1;

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
            <Step key={id} completed={activeStep === id ? false : activeStep !== id && isCompleted}>
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

      <Button
        disabled={!steps[activeStep].isCompleted}
        onClick={handleNext}
        variant="contained"
        className={styles.nextButton}
      >
        {activeStep === 5 ? "Confirmar" : "Continuar"}
      </Button>

      <CustomizedDialogs open={openModal} setOpen={setOpenModal} />

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openBackdrop}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          textAlign: "center",
          gap: 16,
        }}
      >
        <CircularProgress color="inherit" />
        <h3>{loadingMessage}</h3>
      </Backdrop>
    </main>
  );
}

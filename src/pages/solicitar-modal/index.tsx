import { GetServerSideProps } from "next";
import Image from "next/image";
import { Problem, TypeLoad, Vehicle } from "@prisma/client";
import { ImageType } from "react-images-uploading";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { PiMapPinFill } from "react-icons/pi";
import { GiWeight } from "react-icons/gi";
import { AiOutlineLoading } from "react-icons/ai";
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
import { useSession } from "next-auth/react";

type RequestsProps = {
  vehicles: Vehicle[];
  problems: Problem[];
  typeLoads: TypeLoad[];
};

const FirstStep = ({ vehicles: vehiclesData, problems: problemsData, typeLoads: typeLoadsData }: RequestsProps) => {
  const [vehicles] = useState<Vehicle[]>(vehiclesData);
  const [alertPermissionLocationOpen, setAlertPermissionLocationOpen] = useState(false);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

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
    selectedTypeOfLoads,
    setSelectedTypeOfLoads,
    selectedProblems,
    setSelectedProblems,
  } = useRequestModal();

  const vertical = "bottom";
  const horizontal = "center";

  const getLocation = async () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        setIsLoadingLocation(true);
        const { latitude, longitude } = position.coords;

        if (latitude && longitude) {
          const baseUrl = "https://api.tiles.mapbox.com";
          const data = await fetch(
            `${baseUrl}/v4/geocode/mapbox.places/${longitude},${latitude}.json?access_token=${
              process.env.NEXT_PUBLIC_MAPBOX_GL_ACCESS_TOKEN ?? ""
            }`
          ).then((res) => res.json());

          const placeName = data.features[0].place_name;

          setLocalization(placeName);
          setIsLoadingLocation(false);
        }
      },
      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          setAlertPermissionLocationOpen(true);
          setIsLoadingLocation(false);
        }
      },
      { enableHighAccuracy: true }
    );
  };

  useEffect(() => {
    setProblems(problemsData.filter((problem) => selectedProblems.includes(problem.name)));
  }, [selectedProblems]);

  useEffect(() => {
    setTypeOfLoad(typeLoadsData.filter((typeLoad) => selectedTypeOfLoads.includes(typeLoad.name)));
  }, [selectedTypeOfLoads]);

  return (
    <div className={styles.firstStepFormulary}>
      <SelectComponent
        placeholder="Veículo"
        optionsProps={vehicles.map((vehicle) => ({
          id: vehicle.id,
          description: `${vehicle.brand} ${vehicle.model} - ${vehicle.transitBoard}`,
        }))}
        selected={selectedVehicle?.id}
        setSelected={(id) => setSelectedVehicle(vehicles?.find((vehicle) => vehicle.id === id))}
      />

      <Input
        type="text"
        placeholder="Localização"
        name="location"
        icon={isLoadingLocation ? <AiOutlineLoading className={styles.loadingIcon} /> : <PiMapPinFill />}
        iconOnClick={getLocation}
        inputOnClick={getLocation}
        value={localization}
        readOnly={true}
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
        options={problemsData.map((problem) => problem.name)}
        checkedOptions={problems.map((problem) => problem.name)}
        setCheckedOptions={setSelectedProblems}
      />

      {problems.find((problem) => problem.id === 15) && (
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
            options={typeLoadsData.map((typeLoad) => typeLoad.name)}
            checkedOptions={typeOfLoad.map((typeLoad) => typeLoad.name)}
            setCheckedOptions={setSelectedTypeOfLoads}
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
            <span key={`${problem}-${idx}`}>{problem.name}</span>
          ))}
        </div>

        {problems.find((problem) => problem.id === 15) && (
          <>
            <h3 style={{ marginTop: 8 }}>Descrição do problema</h3>
            <p>{problemDescription}</p>
          </>
        )}
      </article>

      {isCarLoaded && (
        <article>
          <h3>Carga do veículo</h3>
          <div className={styles.pillContainer}>
            {typeOfLoad.map((load, idx) => (
              <span key={`${load}-${idx}`}>{load.name}</span>
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
              width: "180px",
              height: "180px",
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
              width: "180px",
              height: "180px",
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
              width: "180px",
              height: "180px",
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
              width: "180px",
              height: "180px",
              objectFit: "cover",
              borderRadius: "4px",
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default function RequestModal({ vehicles, problems, typeLoads }: RequestsProps) {
  const { data: session } = useSession();

  const router = useRouter();
  const {
    activeStep,
    setActiveStep,
    steps,
    setSteps,
    setSelectedVehicle,
    selectedVehicle,
    problems: problemsData,
    problemDescription,
    typeOfLoad,
    weightInKg,
    lon,
    lat,
  } = useRequestModal();

  const [openModal, setOpenModal] = useState(false);
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Procurando Modal adequado...");

  const handleNext = () => {
    if (activeStep === 5) {
      const payload = {
        vehicleId: selectedVehicle?.id,
        userId: session?.user.id,
        orderStatusId: 3,
        userLatitude: lat,
        userLongitude: lon,
        problemDescription,
        loadWeight: weightInKg,
      };

      // setOpenBackdrop(!openBackdrop);

      // setTimeout(() => {
      //   setLoadingMessage("Procurando motorista...");
      // }, 2000);

      // setTimeout(() => {
      //   setOpenBackdrop(!openBackdrop);

      //   router.push("/solicitacoes/1");
      // }, 4000);
    }

    if (activeStep === 4) {
      setOpenModal(!openModal);
    }

    if (activeStep === steps.length - 1) return;

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    if (activeStep === 0) {
      router.push("/solicitacoes");
      return;
    }

    const lastStep = activeStep - 1;

    setActiveStep(lastStep);
  };

  return (
    <main className={styles.requestModal}>
      <section>
        <header className={styles.header}>
          <IconButton color="inherit" onClick={handleBack} style={{ margin: "0", padding: "0" }}>
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
        {activeStep === 0 && <FirstStep vehicles={vehicles} problems={problems} typeLoads={typeLoads} />}
        {activeStep === 1 && <SecondStep />}
        {activeStep === 2 && <ThirdStep />}
        {activeStep === 3 && <FourthStep />}
        {activeStep === 4 && <FifthStep />}
        {activeStep === 5 && <LastStep />}
      </section>

      <Button
        disabled={!steps[activeStep].isCompleted && activeStep !== 5}
        onClick={handleNext}
        variant="contained"
        className={styles.nextButton}
      >
        {activeStep === 5 ? "Confirmar" : "Continuar"}
      </Button>

      <CustomizedDialogs
        open={openModal}
        setOpen={setOpenModal}
        vehicle={selectedVehicle}
        setVehicle={setSelectedVehicle as Dispatch<SetStateAction<Vehicle>>}
      />

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

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const token = req.cookies["next-auth.session-token"];

  const vehiclesResponse = await fetch(`${process.env.BASE_URL}/api/user/vehicles`, {
    headers: {
      Cookie: `next-auth.session-token=${token}`,
    },
  });
  const problemsResponse = await fetch(`${process.env.BASE_URL}/api/problem`);
  const typeLoadsResponse = await fetch(`${process.env.BASE_URL}/api/type-load`);

  const vehicles = await vehiclesResponse.json();
  const { problems } = await problemsResponse.json();
  const { typeLoads } = await typeLoadsResponse.json();

  return { props: { vehicles, problems, typeLoads } };
};

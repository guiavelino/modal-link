import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { MdClose } from "react-icons/md";
import { Dispatch, FormEvent, SetStateAction, forwardRef, useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Alert, AlertColor, Backdrop, CircularProgress, Snackbar } from "@mui/material";

import styles from "./styles.module.scss";
import Input from "../Input";
import Logo from "../../../public/logo.png";
import { Vehicle } from "@prisma/client";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide className={styles.vehicleModalContainer} direction="up" ref={ref} {...props} />;
});

type VehicleModalProps = {
  ownsVehicle: boolean;
  isOpen: boolean;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
  vehicle?: Vehicle;
};

export default function VehicleModal({ ownsVehicle, isOpen, setIsOpen, vehicle }: VehicleModalProps) {
  const { data: session } = useSession();

  const [open, setOpen] = useState(isOpen);
  const [loading, setLoading] = useState(false);
  const [brand, setBrand] = useState(vehicle?.brand || "");
  const [model, setModel] = useState(vehicle?.model || "");
  const [year, setYear] = useState((vehicle?.year || "") as string);
  const [transitBoard, setTransitBoard] = useState(vehicle?.transitBoard || "");
  const [height, setHeight] = useState((vehicle?.height || "") as string);
  const [width, setWidth] = useState((vehicle?.width || "") as string);
  const [weight, setWeight] = useState((vehicle?.weight || "") as string);
  const [alert, setAlert] = useState({ severity: "success", message: "Cadastro realizado com sucesso!" });
  const [showAlert, setShowAlert] = useState(false);

  const [isDisabledSubmitButton, setIsDisabledSubmitButton] = useState(true);

  useEffect(() => {
    if (brand && model && year && transitBoard && height && width && weight) {
      setIsDisabledSubmitButton(false);
    } else {
      setIsDisabledSubmitButton(true);
    }
  }, [brand, model, year, transitBoard, height, width, weight]);

  const handleClose = () => {
    setOpen(false);

    if (setIsOpen) {
      setIsOpen(false);
    }
  };

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    let response: Response;

    if (ownsVehicle) {
      response = await fetch("/api/vehicle", {
        method: "PUT",
        body: JSON.stringify({
          id: vehicle?.id,
          userId: session?.user.id,
          brand,
          model,
          year: parseInt(year),
          transitBoard,
          height: parseFloat(height),
          width: parseFloat(width),
          weight: parseFloat(weight),
        }),
      });
    } else {
      response = await fetch("/api/vehicle", {
        method: "POST",
        body: JSON.stringify({
          userId: session?.user.id,
          brand,
          model,
          year: parseInt(year),
          transitBoard,
          height: parseFloat(height),
          width: parseFloat(width),
          weight: parseFloat(weight),
        }),
      });
    }

    setShowAlert(true);

    const data = await response.json();

    if (response.status === 201 || response.status === 200) {
      handleClose();
    } else {
      setAlert({ severity: "error", message: data.message });
    }

    setLoading(false);
  };

  return (
    <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
      {ownsVehicle ? (
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Atualização de veículo
            </Typography>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <MdClose />
            </IconButton>
          </Toolbar>
        </AppBar>
      ) : (
        <header className={styles.newVehicleHeader}>
          <Image src={Logo} width={200} alt="" />
          <h3>Informe os dados do seu veículo</h3>
        </header>
      )}

      <form onSubmit={submit}>
        <Input
          type="text"
          placeholder="Marca"
          name="brand"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          required
        />

        <Input
          type="text"
          placeholder="Modelo"
          name="model"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          required
        />

        <Input
          type="number"
          placeholder="Ano"
          name="year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          required
        />

        <Input
          type="text"
          placeholder="Placa"
          name="transitBoard"
          value={transitBoard}
          onChange={(e) => setTransitBoard(e.target.value)}
          required
        />

        <Input
          type="number"
          placeholder="Altura"
          name="height"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          required
        />

        <Input
          type="number"
          placeholder="Largura"
          name="width"
          value={width}
          onChange={(e) => setWidth(e.target.value)}
          required
        />

        <Input
          type="number"
          placeholder="Peso em (KG)"
          name="weight"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          required
        />

        <Button type="submit" variant="contained" className={styles.submitButton} disabled={isDisabledSubmitButton}>
          {ownsVehicle ? "Atualizar" : "Cadastrar"}
        </Button>
      </form>

      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <Snackbar open={showAlert} autoHideDuration={6000} onClose={() => setShowAlert(false)}>
        <Alert
          onClose={() => setShowAlert(false)}
          variant="filled"
          severity={alert.severity as AlertColor}
          sx={{ width: "100%" }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </Dialog>
  );
}

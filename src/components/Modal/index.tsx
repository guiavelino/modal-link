import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import { MdClose } from "react-icons/md";
import { Dispatch, SetStateAction, useState } from "react";

import styles from "./styles.module.scss";
import { Alert, Grid } from "@mui/material";
import VehicleModal from "../VehicleModal";
import { Vehicle } from "@prisma/client";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

type ModalProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  vehicle?: Vehicle;
  setVehicle: Dispatch<SetStateAction<Vehicle>>;
};

export default function CustomizedDialogs({ open, setOpen, vehicle, setVehicle }: ModalProps) {
  const [openVehicleModal, setOpenVehicleModal] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      className={styles.modalContainer}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Atualização veicular
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <MdClose />
      </IconButton>
      <DialogContent style={{ padding: 8 }}>
        <article className={styles.dataContainer}>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} style={{ margin: 0, height: "100%" }}>
            <Grid item xs={3}>
              <h3>Marca</h3>
              <p>{vehicle?.brand}</p>
            </Grid>
            <Grid item xs={3}>
              <h3>Modelo</h3>
              <p>{vehicle?.model}</p>
            </Grid>
            <Grid item xs={3}>
              <h3>Ano</h3>
              <p>{vehicle?.year}</p>
            </Grid>
            <Grid item xs={3}>
              <h3>Placa</h3>
              <p>{vehicle?.transitBoard}</p>
            </Grid>
            <Grid item xs={3}>
              <h3>Altura</h3>
              <p>{vehicle?.height}m</p>
            </Grid>
            <Grid item xs={3}>
              <h3>Largura</h3>
              <p>{vehicle?.width}m</p>
            </Grid>
            <Grid item xs={3}>
              <h3>Peso</h3>
              <p>{vehicle?.weight} kg</p>
            </Grid>
          </Grid>
        </article>
        <Alert className={styles.alertContainer} variant="outlined" severity="warning">
          Antes de solicitar um modal, atualize os dados do seu veículo.
        </Alert>
      </DialogContent>

      <DialogActions>
        <Button variant="contained" fullWidth onClick={() => setOpenVehicleModal(true)}>
          Atualizar
        </Button>
        <Button autoFocus onClick={handleClose} variant="outlined" fullWidth>
          Pular
        </Button>
      </DialogActions>

      {openVehicleModal && (
        <VehicleModal
          ownsVehicle={true}
          isOpen={openVehicleModal}
          setIsOpen={setOpenVehicleModal}
          vehicle={vehicle}
          setVehicle={setVehicle}
        />
      )}
    </BootstrapDialog>
  );
}

import { useRef, useState } from "react";
import Image, { StaticImageData } from "next/image";
import { Camera } from "react-camera-pro";
import Alert from "@mui/material/Alert";
import { BiSolidCamera } from "react-icons/bi";

import styles from "./styles.module.scss";

type PhotoContainerProps = {
  title: string;
  exampleImage: StaticImageData;
  setPhoto: (photo: string) => void;
  photo: string;
};

export default function PhotoContainer({ title, exampleImage, photo, setPhoto }: PhotoContainerProps) {
  const camera = useRef(null);
  const [openCam, setOpenCam] = useState(false);

  return (
    <main className={styles.photoContainer}>
      <div className={styles.photoCard}>
        <h1>{title}</h1>
        <div className={styles.picture}>
          <button onClick={() => setOpenCam(!openCam)}>Tirar Foto <BiSolidCamera size={24} /></button>
        </div>
      </div>

      <Alert className={styles.alertContainer} variant="outlined" severity="info">
        Fica a dica: tente fazer a foto na horizontal.
      </Alert>

      <div className={styles.photoCard}>
        <h1>Exemplo</h1>
        <Image src={exampleImage} width={332} height={216} alt="" />
      </div>

      {/* {openCam && <Camera ref={camera}  errorMessages={{}} />} */}
    </main>
  );
}

import Image, { StaticImageData } from "next/image";
import { Camera } from "react-camera-pro";
import Alert from "@mui/material/Alert";
import { BiSolidCamera } from "react-icons/bi";

import { useCarPhotos } from "@/hooks/useCarPhotos";

import styles from "./styles.module.scss";
import { useRef } from "react";

type PhotoContainerProps = {
  title: string;
  exampleImage: StaticImageData;
  setPhoto: (photo: string) => void;
  photo: string;
};

export default function PhotoContainer({ title, exampleImage, photo, setPhoto }: PhotoContainerProps) {
  const camera = useRef(null);

  return (
    <main className={styles.photoContainer}>
      <div className={styles.photoCard}>
        <Camera ref={camera} errorMessages={{}} />
        <h1>{title}</h1>

        <div className={styles.picture}>
          {/* <button onClick={() => setPhoto(camera.current.takePhoto())}> */}
          <button>
            Tirar Foto <BiSolidCamera size={24} />
          </button>
        </div>
      </div>

      <Alert className={styles.alertContainer} variant="outlined" severity="info">
        Fica a dica: tente fazer a foto na horizontal.
      </Alert>

      <div className={styles.photoCard}>
        <h1>Exemplo</h1>
        <Image src={exampleImage} width={332} height={200} alt="" />
      </div>
    </main>
  );
}

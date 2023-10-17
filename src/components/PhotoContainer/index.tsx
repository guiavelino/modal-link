import { Dispatch, SetStateAction } from "react";
import Image, { StaticImageData } from "next/image";
import Alert from "@mui/material/Alert";

import styles from "./styles.module.scss";
import { UploadImage } from "../UploadImage";
import { ImageListType } from "react-images-uploading";

type PhotoContainerProps = {
  title: string;
  exampleImage: StaticImageData;
  photo: ImageListType[];
  setPhoto: Dispatch<SetStateAction<ImageListType[]>>;
};

export default function PhotoContainer({ title, exampleImage, photo, setPhoto }: PhotoContainerProps) {
  return (
    <main className={styles.photoContainer}>
      <div className={styles.photoCard}>
        <h1>{title}</h1>
        <div className={styles.picture}>
          <UploadImage image={photo} setImage={setPhoto} />
        </div>
      </div>

      <Alert className={styles.alertContainer} variant="outlined" severity="info">
        Fica a dica: tente fazer a foto na horizontal.
      </Alert>

      <div className={styles.photoCard}>
        <h1>Exemplo</h1>
        <Image src={exampleImage} width={332} height={216} alt="" />
      </div>
    </main>
  );
}

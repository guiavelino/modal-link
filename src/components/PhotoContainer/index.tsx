import Image, { StaticImageData } from "next/image";
import Alert from "@mui/material/Alert";
import { BiSolidCamera } from "react-icons/bi";

import { title } from "process";

import styles from "./styles.module.scss";

type PhotoContainerProps = {
  title: string;
  exampleImage: StaticImageData;
};

export default function PhotoContainer({ title, exampleImage }: PhotoContainerProps) {
  return (
    <main className={styles.photoContainer}>
      <div className={styles.photoCard}>
        <h1>{title}</h1>

        <div className={styles.picture}>
          <button>
            Tirar Foto <BiSolidCamera size={24} />
          </button>
        </div>
      </div>

      <Alert className={styles.alertContainer} variant="outlined" severity="info" style={{ color: "#03a9f4" }}>
        Fica a dica: tente fazer a foto na horizontal.
      </Alert>

      <div className={styles.photoCard}>
        <h1>Exemplo</h1>
        <Image src={exampleImage} width={332} height={200} alt="" />
      </div>
    </main>
  );
}

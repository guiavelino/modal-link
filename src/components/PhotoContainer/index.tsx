import { title } from 'process';
import styles from './styles.module.scss';
import Image, { StaticImageData } from 'next/image';
import Alert from '@mui/material/Alert';

type PhotoContainerProps = {
    title: string;
    exampleImage: StaticImageData;
}

export default function PhotoContainer({ title, exampleImage }: PhotoContainerProps) {

    return (
        <main className={styles.photoContainer}>
            <h1>{title}</h1>
            <Image
                src={exampleImage}
                width={332}
                height={200}
                alt=''
                objectFit='fill'
            />
            <Alert className={styles.alertContainer} variant="outlined" severity="info" style={{ color: '#03a9f4' }}>
                Fica a dica: tente fazer a foto na horizontal.
            </Alert>
            <h1>Exemplo</h1>
            <Image
                src={exampleImage}
                width={332}
                height={200}
                alt=''
            />
        </main>
    );
}
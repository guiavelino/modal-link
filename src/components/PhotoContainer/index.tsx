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
            <Alert variant="outlined" severity="info">
                This is an info alert — check it out!
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
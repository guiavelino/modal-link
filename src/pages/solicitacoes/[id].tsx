import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useEffect, useRef, useState } from 'react';
import { Avatar, IconButton, Step, StepLabel, Stepper, Typography } from '@mui/material';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import { useRouter } from 'next/router';

import styles from './styles.module.scss';

function VerticalLinearStepper() {
    const [activeStep] = useState(2);
  
    const steps = [
        { label: 'Solicitação realizada', description: '19:37' },
        { label: 'Procurando Modal adequado', description: '19:38' },
        { label: 'Bruno Henrique está a caminho', description: '19:40' }
    ];

    return (
        <Stepper activeStep={activeStep} orientation="vertical" className={styles.stepper}>
            {steps.map((step, index) => (
                <Step key={step.label} completed={activeStep !== index}>
                    <StepLabel>
                        {step.label}
                        <Typography fontSize={13}>{step.description}</Typography>
                    </StepLabel>
                </Step>
            ))}
        </Stepper>
    );
}

export default function Requests() {
    const mapContainer = useRef<any>(null);
    const map = useRef<mapboxgl.Map | any>(null);
    const router = useRouter();
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_GL_ACCESS_TOKEN ?? '';
    
    const position = async () => {
        await navigator.geolocation.getCurrentPosition(
          position => {
            map.current = new mapboxgl.Map({
                container: mapContainer.current,
                style: 'mapbox://styles/mapbox/streets-v12',
                center: [position?.coords?.longitude, position?.coords?.latitude],
                zoom: 15
            });

            new mapboxgl.Marker().setLngLat([position?.coords?.longitude, position?.coords?.latitude]).addTo(map.current);
          }
        );
    }

    useEffect(() => {
        position();
    }, []);

    return (
        <main className={styles.reqContainer}>
            <header className={styles.header}>
                <IconButton color="inherit" onClick={() => router.back()} style={{ margin: "0", padding: "0" }}>
                    <MdKeyboardArrowLeft size={32}/>
                </IconButton>
                <h1>Status da solicitação</h1>
                &nbsp;
            </header>

            <VerticalLinearStepper />

            <div  ref={mapContainer} className={styles.map} />

            <section className={styles.modalInfoContainer}>
                <div className={styles.driverContainer}>
                    <div className={styles.driverInfo}>
                        <Avatar>BH</Avatar>
                        <div>
                            <h3>Bruno Henrique</h3>
                            <p>Guincho Accelo 1016</p>
                        </div>
                    </div>

                    <div className={styles.transitBoard}>
                        <div>BRASIL</div>
                        <div>FIA-1E89</div>
                    </div>
                </div>
                <div className={styles.statisticsInfo}>
                    <div className={styles.distanceInfoContainer}>
                        <h3>1,2 km</h3>
                        <p>Distância</p>
                    </div>
                    <div className={styles.timeInfoContainer}>
                        <h3>5 min</h3>
                        <p>Tempo estimado</p>
                    </div>
                </div>
            </section>
        </main>
    )
}
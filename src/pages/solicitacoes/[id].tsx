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
    const [minutes, setMinutes] = useState("");
    const [kilometers, setKilometers] = useState("");
    const mapContainer = useRef<any>(null);
    const map = useRef<mapboxgl.Map | any>(null);
    const router = useRouter();
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_GL_ACCESS_TOKEN ?? '';
    
    const convertToMinutes = (durationInSeconds: number) => (durationInSeconds / 60).toFixed(0);
    
    const convertToKilometers = (distanceInMeters: number) => (distanceInMeters / 1000).toFixed(2).replace('.', ',');

    const calculateModalDriverCoordinates = (lat: number, lon: number, bearing: number = 45, radiusInKilometers: number = 1) => {
        const radiusOfEarth = 6371; // Raio médio da Terra em quilômetros
      
        // Converte os ângulos de graus para radianos
        const lat1 = (lat * Math.PI) / 180;
        const lon1 = (lon * Math.PI) / 180;
        const angularDistance = radiusInKilometers / radiusOfEarth;
      
        // Converte o rumo de graus para radianos
        const bearingRad = (bearing * Math.PI) / 180;
      
        // Calcula as coordenadas da nova posição
        const lat2 = Math.asin(Math.sin(lat1) * Math.cos(angularDistance) + Math.cos(lat1) * Math.sin(angularDistance) * Math.cos(bearingRad));
        const lon2 = lon1 + Math.atan2(Math.sin(bearingRad) * Math.sin(angularDistance) * Math.cos(lat1), Math.cos(angularDistance) - Math.sin(lat1) * Math.sin(lat2));
      
        // Converte as coordenadas de volta para graus
        const newLat = (lat2 * 180) / Math.PI;
        const newLon = (lon2 * 180) / Math.PI;
      
        return { latitude: newLat, longitude: newLon };
    }

    const position = () => {
        navigator.geolocation.getCurrentPosition(
          async userPosition => {
            const modalDriverPosition = calculateModalDriverCoordinates(userPosition.coords.latitude, userPosition.coords.longitude, userPosition.timestamp);
            
            const query = await fetch(`https://api.mapbox.com/directions/v5/mapbox/driving/${userPosition.coords.longitude},${userPosition.coords.latitude};${modalDriverPosition.longitude},${modalDriverPosition.latitude}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`);
            const json = await query.json();
            const data = json.routes[0];
            const route = data.geometry.coordinates;

            setMinutes(convertToMinutes(data.duration))

            setKilometers(convertToKilometers(data.distance))

            map.current = new mapboxgl.Map({
                container: mapContainer.current,
                style: 'mapbox://styles/mapbox/streets-v12',
                center: [userPosition.coords.longitude, userPosition.coords.latitude],
                zoom: 14
            });
    
            new mapboxgl.Marker({ color: 'red' }).setLngLat([userPosition.coords.longitude, userPosition.coords.latitude]).addTo(map.current);
    
            new mapboxgl.Marker().setLngLat([modalDriverPosition.longitude, modalDriverPosition.latitude]).addTo(map.current);
    
            map.current.on('load', function() {
                if (!map.current.getLayer('route')) {
                    map.current.addLayer({
                        id: 'route',
                        type: 'line',
                        source: {
                            type: 'geojson',
                            data: {
                                type: 'Feature',
                                properties: {},
                                geometry: { type: 'LineString', coordinates: route }
                            }
                        },
                        layout: { 'line-join': 'round', 'line-cap': 'round' },
                        paint: { 'line-color': '#1976d2', 'line-width': 8 }
                    });
                }
            });
          }
        );
    };

    useEffect(() => {
        position();
    }, []);

    return (
        <main className={styles.reqContainer}>
            <header className={styles.header}>
                <IconButton color="inherit" onClick={() => router.push('/solicitacoes')} style={{ margin: "0", padding: "0" }}>
                    <MdKeyboardArrowLeft size={32}/>
                </IconButton>
                <h1>Status da solicitação</h1>
                &nbsp;
            </header>

            <VerticalLinearStepper />

            <div ref={mapContainer} className={styles.map} />

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
                        <h3>{kilometers} km</h3>
                        <p>Distância</p>
                    </div>
                    <div className={styles.timeInfoContainer}>
                        <h3>{minutes} min</h3>
                        <p>Tempo estimado</p>
                    </div>
                </div>
            </section>
        </main>
    )
}
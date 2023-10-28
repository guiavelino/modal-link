import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useEffect, useRef, useState } from 'react';
import { Avatar, IconButton, Step, StepLabel, Stepper, Typography } from '@mui/material';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import { useRouter } from 'next/router';

import styles from './styles.module.scss';
import { GetServerSideProps } from 'next';
import { Modal, ModalCategory, OrderService, User } from '@prisma/client';
import moment from 'moment';

type RequestsProps = {
    orderService: OrderService & {
        modal: Modal & {
            user: User
        } & {
            modalCategory: ModalCategory
        }
    };
}

function VerticalLinearStepper({ orderService }: RequestsProps) {
    const [activeStep] = useState(2);

    const createdAt = moment(orderService.createdAt);
    
    var subtractTime = moment.duration("00:01");
    const datetime = moment(createdAt);
    const requestHour =  datetime.subtract(subtractTime).format("HH:mm");

    const hour = createdAt.format("HH:mm");

    const steps = [
        { label: 'Solicitação realizada', description: requestHour },
        { label: 'Procurando Modal adequado', description: hour },
        { label: `${orderService.modal.user.fullName} está a caminho`, description: hour }
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

export default function Requests({ orderService }: RequestsProps) {
    const router = useRouter();
    const [minutes, setMinutes] = useState("");
    const [kilometers, setKilometers] = useState("");
    const mapContainer = useRef<any>(null);
    const map = useRef<mapboxgl.Map | any>(null);
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
            const latitude = parseFloat(orderService.userLatitude);
            const longitude = parseFloat(orderService.userLongitude);

            const modalDriverPosition = calculateModalDriverCoordinates(latitude, longitude, userPosition.timestamp);
            
            const query = await fetch(`https://api.mapbox.com/directions/v5/mapbox/driving/${longitude},${latitude};${modalDriverPosition.longitude},${modalDriverPosition.latitude}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`);
            const json = await query.json();
            const data = json.routes[0];
            const route = data.geometry.coordinates;

            setMinutes(convertToMinutes(data.duration))

            setKilometers(convertToKilometers(data.distance))

            map.current = new mapboxgl.Map({
                container: mapContainer.current,
                style: 'mapbox://styles/mapbox/streets-v12',
                center: [longitude, latitude],
                zoom: 15
            });
    
            new mapboxgl.Marker({ color: 'red' }).setLngLat([longitude, latitude]).addTo(map.current);
    
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

            <VerticalLinearStepper orderService={orderService} />

            <div ref={mapContainer} className={styles.map} />

            <section className={styles.modalInfoContainer}>
                <div className={styles.driverContainer}>
                    <div className={styles.driverInfo}>
                        <Avatar alt={orderService.modal.user.fullName} src="/static/images/avatar/2.jpg" />
                        <div>
                            <h3>{orderService.modal.user.fullName}</h3>
                            <p>{orderService.modal.modalCategory.name}</p>
                        </div>
                    </div>

                    <div className={styles.transitBoard}>
                        <div>BRASIL</div>
                        <div>{orderService.modal.transitBoard}</div>
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

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
    const response = await fetch(`${process.env.BASE_URL}/api/order-service/${query.id}`, {
      headers: {
        Cookie: `next-auth.session-token=${req.cookies['next-auth.session-token']}`
      }
    });
  
    const orderService = await response.json();

    if (!orderService.id) {
        return { 
            redirect: {
                destination: '/solicitacoes',
                permanent: false
            }
        };
    }
  
    return { props: { orderService } };
}
import Header from '@/components/Header';
import { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { Vehicle } from '@prisma/client';
import { Box, Button, Card, CardContent, Fab, Grid, Tab, Tabs } from '@mui/material';

import styles from './styles.module.scss';
import VehicleModal from '@/components/VehicleModal';
import Link from 'next/link';
import { BiPlus } from 'react-icons/bi';

type RequestsProps = {
  vehicles: Vehicle[];
  addVehicle: () => void;
}

const VehiclesTab = ({ vehicles, addVehicle }: RequestsProps) => {
  return (
    <main className={styles.vehicleContainer}>
      {vehicles.map(vehicle => (
        <Card key={vehicle.id} className={styles.cardVehicleContainer}>
          <CardContent>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} style={{ margin: 0, height: '100%' }}>
              <Grid item xs={3}>
                  <h3>Marca</h3>
                  <p>{vehicle.brand}</p>
              </Grid>
              <Grid item xs={3}>
                  <h3>Modelo</h3>
                  <p>{vehicle.model}</p>
              </Grid>
              <Grid item xs={3}>
                  <h3>Ano</h3>
                  <p>{vehicle.year}</p>
              </Grid>
              <Grid item xs={3}>
                  <h3>Placa</h3>
                  <p>{vehicle.transitBoard}</p>
              </Grid>
              <Grid item xs={3}>
                  <h3>Altura</h3>
                  <p>{vehicle.height}m</p>
              </Grid>
              <Grid item xs={3}>
                  <h3>Largura</h3>
                  <p>{vehicle.width}m</p>
              </Grid>
              <Grid item xs={3}>
                  <h3>Peso</h3>
                  <p>{vehicle.weight} kg</p>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ))}

      <Fab 
        sx={{ position: 'absolute', bottom: 100, right: 16 }} 
        className={styles.addButton}
        onClick={addVehicle}
      >
        <BiPlus />
      </Fab>
    </main>
  )
}

const RequestTab = () => {
  return (
    <main>
    </main>
  )
}

export default function Requests({ vehicles : vehiclesData }: RequestsProps) {
  const [vehicles, setVehicles] = useState(vehiclesData);
  const [tab, setTab] = useState(0);
  const [addNewVehicle, setAddNewVehicle] = useState(false);
  
  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(`/api/user/vehicles`, { credentials: 'include' });
      const vehicles = await response.json();

      setVehicles(vehicles);
    }

    getData();
  }, [addNewVehicle]);

  return (
    <>
      <main className={styles.requestsContainer}>
        <Header />

        <Box sx={{ borderBottom: 2, borderColor: 'divider' }}>
          <Tabs value={tab} onChange={handleChangeTab} className={styles.tabsContainer}>
            <Tab label="Meus veículos"  />
            <Tab label="Minhas solicitações"  />
          </Tabs>
        </Box>

        {tab === 0 && <VehiclesTab vehicles={vehicles} addVehicle={() => { setAddNewVehicle(true) }} />}
        {tab === 1 && <RequestTab />}

        <footer className={styles.appBar}>
          <Link href={vehicles.length === 0 ? "/solicitacoes" : "/solicitar-modal"}>
            <Button 
              disabled={vehicles.length === 0}
              variant='contained'
            >
              Solicitar Modal
            </Button>
          </Link>
        </footer>
      </main>
      
      { addNewVehicle && <VehicleModal isOpen={addNewVehicle} ownsVehicle={false} addNewVehicle={true} setIsOpen={setAddNewVehicle} /> }
      
      <VehicleModal isOpen={vehicles.length === 0} ownsVehicle={vehicles.length > 0}/>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const response = await fetch(`${process.env.BASE_URL}/api/user/vehicles`, {
    headers: {
      Cookie: `next-auth.session-token=${req.cookies['next-auth.session-token']}`
    }
  });

  const vehicles = await response.json();

  return { props: { vehicles } };
}
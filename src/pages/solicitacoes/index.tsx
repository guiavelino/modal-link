import Header from '@/components/Header';
import { useState } from 'react';
import { GetServerSideProps } from 'next';
import { Vehicle } from '@prisma/client';
import { Box, Button, IconButton, Tab, Tabs, Tooltip } from '@mui/material';
import { BiPlus } from 'react-icons/bi';

import styles from './styles.module.scss';
import VehicleModal from '@/components/VehicleModal';
import Link from 'next/link';

type RequestsProps = {
  vehicles: Vehicle[]
}

const VehiclesTab = () => {
  return (
    <main>
      <header className={styles.actionsVehicleContainer}>
        <Tooltip title="Cadastrar veículo">
          <IconButton color='default' className={styles.registerButton}>
            <BiPlus />
          </IconButton>
        </Tooltip>
      </header>


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
  const [vehicles] = useState(vehiclesData);
  const [tab, setTab] = useState(0);
  
  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

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

        {tab === 0 && <VehiclesTab />}
        {tab === 1 && <RequestTab />}

        <footer className={styles.appBar}>
          <Link href="/solicitar-modal">
            <Button variant='contained' color='primary'>Solicitar Modal</Button>
          </Link>
        </footer>
      </main>
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
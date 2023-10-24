import Header from '@/components/Header';
import styles from './styles.module.scss';
import VehicleModal from '@/components/VehicleModal';
import { useState } from 'react';
import { GetServerSideProps } from 'next';
import { Vehicle } from '@prisma/client';

type RequestsProps = {
  vehicles: Vehicle[]
}

export default function Requests({ vehicles : vehiclesData }: RequestsProps) {
  const [vehicles] = useState(vehiclesData);
  
  return (
    <main className={styles.requestsContainer}>
        <Header />

        <VehicleModal 
          isOpen={vehicles.length === 0}
          ownsVehicle={vehicles.length > 0}
        />
    </main>
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
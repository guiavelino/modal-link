import Header from '@/components/Header';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { OrderService, OrderStatus, Vehicle } from '@prisma/client';
import { Alert, AlertColor, Backdrop, Box, Button, Card, CardActions, CardContent, CircularProgress, Fab, Grid, Snackbar, Tab, Tabs } from '@mui/material';

import styles from './styles.module.scss';
import VehicleModal from '@/components/VehicleModal';
import Link from 'next/link';
import { BiPlus } from 'react-icons/bi';
import moment from 'moment';

type VehiclesTabProps = {
  vehicles: Vehicle[];
  addVehicle: () => void;
}

const VehiclesTab = ({ vehicles, addVehicle }: VehiclesTabProps) => {
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

type Order = OrderService & {
  vehicle: Vehicle;
  orderStatus: OrderStatus;
};

type ServiceOrders = {
  serviceOrders: Order[];
  setServiceOrders: Dispatch<SetStateAction<Order[]>>;
}

const RequestTab = ({ serviceOrders, setServiceOrders }: ServiceOrders) => {
  const [alert, setAlert] = useState({ severity: "success", message: "Solicitação cancelada com sucesso!" });
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const getRequestDate = (orderServiceCreatedAt: Date) => {
    const createdAt = moment(orderServiceCreatedAt);
    
    var subtractTime = moment.duration("00:01");
    const datetime = moment(createdAt);
    const requestHour =  datetime.subtract(subtractTime).format("DD/MM/YYYY - HH:mm");

    return requestHour;
  }

  const cancelOrder = async (orderServiceId: number) => {
    setLoading(true);

    const response = await fetch("/api/order-status", {
      method: "PATCH",
      body: JSON.stringify({ orderServiceId, orderStatusId: 6 }),
    });

    setShowAlert(true);

    if (response.status === 200) {
      const response = await fetch('/api/order-service', { credentials: 'include' });
      const data = await response.json()
      setServiceOrders(data);
    } else {
      setAlert({ severity: "error", message: "Erro ao cancelar solicitação, tente novamente!" });
    }

    setLoading(false);
  }

  return (
    <main className={styles.orderServiceContainer}>
      {serviceOrders.map(orderService => (
        <Card key={orderService.id} className={styles.cardOrderServiceContainer}>
          <CardContent>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} style={{ margin: 0, height: '100%' }}>
              <Grid item xs={6}>
                  <h3>Marca</h3>
                  <p>{orderService.vehicle.brand}</p>
              </Grid>
              <Grid item xs={6}>
                  <h3>Modelo</h3>
                  <p>{orderService.vehicle.model}</p>
              </Grid>
              <Grid item xs={6}>
                  <h3>Ano</h3>
                  <p>{orderService.vehicle.year}</p>
              </Grid>
              <Grid item xs={6}>
                  <h3>Placa</h3>
                  <p>{orderService.vehicle.transitBoard}</p>
              </Grid>

              <Grid item xs={12}>
                  <h3>Status</h3>
                  <p>{orderService.orderStatus.name}</p>
              </Grid>
              
              <Grid item xs={12}>
                  <h3>Data da solicitação</h3>
                  <p>{getRequestDate(orderService.createdAt)}</p>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions className={styles.actions}>
            {orderService.orderStatusId !== 6 && (
              <>
                <Link href={orderService.orderStatusId === 6 ? "/solicitacoes" : `solicitacoes/${orderService.id}`}>
                  <Button disabled={orderService.orderStatusId === 6} variant='outlined' className={styles.showMore} size='large'>
                    Ver mais
                  </Button>
                </Link>
                <Button 
                  variant='contained' 
                  className={styles.cancel} 
                  size='large'
                  onClick={() => cancelOrder(orderService.id)}
                >
                  Cancelar
                </Button>
              </>
            )}
          </CardActions>
        </Card>
      ))}

      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <Snackbar open={showAlert} autoHideDuration={6000} onClose={() => setShowAlert(false)}>
        <Alert
          onClose={() => setShowAlert(false)}
          variant="filled"
          severity={alert.severity as AlertColor}
          sx={{ width: "100%" }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </main>
  )
}

type RequestsProps = {
  vehicles: Vehicle[];
  serviceOrders: Order[];
}

export default function Requests({ vehicles: vehiclesData, serviceOrders: serviceOrdersData }: RequestsProps) {
  const [vehicles, setVehicles] = useState(vehiclesData);
  const [serviceOrders, setServiceOrders] = useState(serviceOrdersData);
  const [tab, setTab] = useState(0);
  const [addNewVehicle, setAddNewVehicle] = useState(false);
  const [addFirstVehicle, setAddFirstVehicle] = useState(true);
  
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
  }, [addNewVehicle, addFirstVehicle]);

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

        {tab === 0 && (
          <VehiclesTab 
            vehicles={vehicles} 
            addVehicle={() => { 
              setAddNewVehicle(true) 
            }}
          />
        )}

        {tab === 1 && (
          <RequestTab
            serviceOrders={serviceOrders}
            setServiceOrders={setServiceOrders}
          />
        )}

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
      
      {addNewVehicle && <VehicleModal isOpen={addNewVehicle} ownsVehicle={false} addNewVehicle={true} setIsOpen={setAddNewVehicle} />}
      
      <VehicleModal isOpen={vehicles.length === 0} ownsVehicle={vehicles.length > 0} setIsOpen={setAddFirstVehicle} />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const headers = { Cookie: `next-auth.session-token=${req.cookies['next-auth.session-token']}` };

  const responseFromVehicles = await fetch(`${process.env.BASE_URL}/api/user/vehicles`, { headers });
  const vehicles = await responseFromVehicles.json();

  const responseFromServiceOrders = await fetch(`${process.env.BASE_URL}/api/order-service`, { headers });
  const serviceOrders = await responseFromServiceOrders.json();

  return { props: { vehicles, serviceOrders } };
}
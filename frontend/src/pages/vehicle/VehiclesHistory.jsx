import React, { useEffect, useState } from "react";
import { Layout, Typography } from 'antd';

import VehiclesHeader from '../../../components/vehicleHistory/VehiclesHeader.jsx';
import VehiclesLayout from '../../../components/vehicleHistory/VehiclesLayout';
import VehiclesTable from '../../../components/vehicleHistory/VehiclesTable';

import '../../css/DashboardMenu.css';
import '../../css/VehiclesHistory.css';

const VehiclesHistory = () => {
  const [vehiclesHistory, setVehiclesHistory] = useState([]);

  useEffect(() => {
    fetchVehiclesHistory();
  }, []);

  const fetchVehiclesHistory = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/parking-space`);
      if (response.ok) {
        const data = await response.json();

        const mappedData = data.parkingSpaces.map(space => ({
          id: space.id,
          firstname_owner: space.customer.firstname_owner,
          lastname_owner: space.customer.lastname_owner,
          phone_number: space.customer.phone_number,
          license_plate: space.vehicle.license_plate,
          brand: space.vehicle.brand,
          type: space.vehicle.type,
          color: space.vehicle.color,
        }));

        // Assign random colors to phone numbers
        mappedData.forEach(item => {
          item.phone_number_color = getRandomColor();
        });

        setVehiclesHistory(mappedData);
      } else {
        console.error('Error getting parking spaces');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getRandomColor = () => {
    const colors = ['blue', 'red', 'yellow', 'green', 'purple', 'orange', 'gray', 'cyan', 'black', 'brown'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const typeColorMap = {
    SUV: 'blue',
    Pickup: 'red',
    Hatchback: 'yellow',
    Crossover: 'green',
    Convertible: 'purple',
    Sedan: 'orange',
    Coupe: 'gray',
    Minivan: 'cyan', 
    Otro: 'magenta'
  };

  const colorColorMap = {
    Rojo: 'volcano',
    Azul: 'geekblue',
    Negro: 'black',
    Blanco: 'lightgray',
    Verde: 'green',
    Amarillo: 'gold',
    Otro: 'cyan' 
  };

  return (
    <Layout>
      <VehiclesHeader />
      <VehiclesLayout>
        <Typography.Title className='table-title-vehicle-history' level={2}>
          Historial de Vehículos
        </Typography.Title>
        <VehiclesTable 
          vehiclesHistory={vehiclesHistory} 
          typeColorMap={typeColorMap} 
          colorColorMap={colorColorMap} 
          getRandomColor={getRandomColor} 
        />
      </VehiclesLayout>
    </Layout>
  );
}

export default VehiclesHistory;
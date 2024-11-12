// ParkingHistory.jsx
import React, { useEffect, useState } from "react";
import { Layout, Typography, Button, Modal, message } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import ParkingHistoryTable from '../../../components/parkingHistory/ParkingHistoryTable';
import ParkingHistoryHeader from '../../../components/parkingHistory/ParkingHistoryHeader';
import ParkingHistoryLayout from '../../../components/parkingHistory/ParkingHistoryLayout';

import '../../css/DashboardMenu.css';
import '../../css/ParkingHistory.css';

const { confirm } = Modal;

const ParkingHistory = () => {
  const [parkingspaces, setParkingSpaces] = useState([]);

  useEffect(() => {
    fetchParkingSpaces();
  }, []);

  const fetchParkingSpaces = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/parking-space`);
      if (response.ok) {
        const data = await response.json();
        setParkingSpaces(data.parkingSpaces.map(space => ({
          ...space,
          hour_date_entry: new Date(space.hour_date_entry).toLocaleString(),
          hour_date_output: space.hour_date_output ? new Date(space.hour_date_output).toLocaleString() : 'N/A',
          timed_parking_space: space.timed_parking_space ? new Date(space.timed_parking_space).toISOString().substr(11, 8) : 'N/A'
        })));
      } else {
        console.error('Error getting parking spaces');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = (id) => {
    confirm({
      title: '¿Estás seguro de eliminar este historial de parqueo?',
      content: 'Esta acción no se puede deshacer.',
      okText: 'Eliminar',
      okType: 'danger',
      cancelText: 'Cancelar',
      async onOk() {
        try {
          const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/parking-space/${id}`, {
            method: 'DELETE',
          });
          if (response.ok) {
            await fetchParkingSpaces();
            message.success('Historial de parqueo eliminado exitosamente.');
          } else if (response.status === 400) {
            const data = await response.json();
            message.warning(data.message);
          } else {
            console.error('Error to delete parking history');
          }
        } catch (error) {
          console.error('Error processing request:', error);
        }
      },
      onCancel() {
        console.log('Canceled');
      },
    });
  };

  return (
    <Layout>
      <ParkingHistoryHeader />
      <ParkingHistoryLayout>
        <Typography.Title className='table-title-parking-history' level={2}>
          Historial de Parqueo
          <Link to="/time-parking">
            <Button type="dashed" icon={<SearchOutlined />} style={{ marginLeft: 950, marginBottom: 3 }}>
              Ver Tiempos de Búsqueda de Estacionamiento
            </Button>
          </Link>
        </Typography.Title>
        <ParkingHistoryTable 
          parkingspaces={parkingspaces} 
          handleDelete={handleDelete} 
        />
      </ParkingHistoryLayout>
    </Layout>
  );
};

export default ParkingHistory;
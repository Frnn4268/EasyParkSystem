import React, { useEffect, useState } from 'react';
import { Layout, Typography, Modal, message } from 'antd';

import TimeParkingSearchTable from '../../../components/timeParkingSearch/TimeParkingSearchTable';
import TimeParkingSearchHeader from '../../../components/timeParkingSearch/TimeParkingSearchHeader';
import TimeParkingSearchLayout from '../../../components/timeParkingSearch/TimeParkingSearchLayout';

import '../../css/DashboardMenu.css';
import '../../css/ParkingHistory.css';

const { confirm } = Modal;

const TimeParkingSearch = () => {
  const [timeSearchParking, setTimeSearchParking] = useState([]);

  useEffect(() => {
    fetchTimeSearchParking();
  }, []);

  const fetchTimeSearchParking = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/parking-search`);
      if (response.ok) {
        const data = await response.json();
        setTimeSearchParking(data.data.map(space => ({
          ...space,
          hour_date_entry: new Date(space.hour_date_entry).toLocaleString(),
          hour_date_output: space.hour_date_output ? new Date(space.hour_date_output).toLocaleString() : 'N/A',
          time_search_parking: space.time_search_parking ? new Date(space.time_search_parking).toISOString().substr(11, 8) : 'N/A'
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
      title: '¿Estás seguro de eliminar este tiempo de búsqueda de estacionamiento?',
      content: 'Esta acción no se puede deshacer.',
      okText: 'Eliminar',
      okType: 'danger',
      cancelText: 'Cancelar',
      async onOk() {
        try {
          const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/parking-search/${id}`, {
            method: 'DELETE',
          });
          if (response.ok) {
            await fetchTimeSearchParking();
            message.success('Tiempo de búsqueda de parqueo eliminado exitosamente.');
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
      <TimeParkingSearchHeader />
      <TimeParkingSearchLayout>
        <Typography.Title className='table-title-parking-history' level={2}>
          Historial de Tiempos de Búsqueda de Estacionamiento
        </Typography.Title>
        <TimeParkingSearchTable 
          timeSearchParking={timeSearchParking} 
          handleDelete={handleDelete} 
        />
      </TimeParkingSearchLayout>
    </Layout>
  );
};

export default TimeParkingSearch;
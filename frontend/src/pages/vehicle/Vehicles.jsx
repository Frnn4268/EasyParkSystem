import React, { useEffect, useState } from 'react';
import { Layout, Typography, message, Modal, Form } from 'antd';

import VehiclesTable from '../../../components/vehicle/VehiclesTable';
import VehiclesDrawer from '../../../components/vehicle/VehiclesDrawer';
import VehiclesHeader from '../../../components/vehicle/VehiclesHeader';
import VehiclesLayout from '../../../components/vehicle/VehiclesLayout';

import '../../css/DashboardMenu.css';
import '../../css/Vehicle.css';

const { confirm } = Modal;

const Vehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/vehicle`);
      if (response.ok) {
        const data = await response.json();
        setVehicles(data.data);
      } else {
        console.error('Error getting vehicles');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getRandomColor = () => {
    const colors = ['blue', 'red', 'yellow', 'green', 'purple', 'orange', 'gray'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const handleDelete = (id) => {
    confirm({
      title: '¿Estás seguro de eliminar este vehículo?',
      content: 'Esta acción no se puede deshacer.',
      okText: 'Eliminar',
      okType: 'danger',
      cancelText: 'Cancelar',
      async onOk() {
        try {
          const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/vehicle/${id}`, {
            method: 'DELETE',
          });
          if (response.ok) {
            await fetchVehicles();
            message.success('Vehículo eliminado exitosamente.');
          } else if (response.status === 400) {
            const data = await response.json();
            message.warning(data.message);
          } else {
            console.error('Error to delete vehicle');
          }
        } catch (error) {
          console.error('Error processing request:', error);
          message.error('Error al eliminar el vehículo.');
        }
      },
      onCancel() {
        console.log('Canceled');
      },
    });
  };

  const handleUpdate = (vehicle) => {
    setSelectedVehicle(vehicle);
    form.setFieldsValue({
      license_plate: vehicle.license_plate,
      type: vehicle.type,
      brand: vehicle.brand,
      color: vehicle.color,
    });
    setDrawerVisible(true);
  };

  const onFinish = async (values) => {
    try {
      const typePlate = values.type_plate;
      let licensePlate = values.license_plate;
      licensePlate = licensePlate.replace(/^[A-Za-z]+-/, '');
      const mergedValue = `${typePlate}-${licensePlate}`;

      const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/vehicle/${selectedVehicle.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...values, license_plate: mergedValue }),
      });

      if (response.ok) {
        await fetchVehicles();
        setDrawerVisible(false);
        message.success('Vehículo editado exitosamente.');
      } else {
        console.error('Error updating vehicle');
      }
    } catch (error) {
      console.error('Error processing request:', error);
    }
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
    Otro: 'magenta',
  };

  const colorColorMap = {
    Rojo: 'volcano',
    Azul: 'geekblue',
    Negro: 'black',
    Blanco: 'lightgray',
    Verde: 'green',
    Amarillo: 'gold',
    Otro: 'cyan',
  };

  return (
    <Layout>
      <VehiclesHeader />
      <VehiclesLayout>
        <Typography.Title className='table-title-vehicle' level={2}>
          Vehículos
        </Typography.Title>
        <VehiclesTable
          vehicles={vehicles}
          handleUpdate={handleUpdate}
          handleDelete={handleDelete}
          getRandomColor={getRandomColor}
          typeColorMap={typeColorMap}
          colorColorMap={colorColorMap}
        />
      </VehiclesLayout>
      <VehiclesDrawer
        drawerVisible={drawerVisible}
        setDrawerVisible={setDrawerVisible}
        form={form}
        onFinish={onFinish}
      />
    </Layout>
  );
};

export default Vehicles;
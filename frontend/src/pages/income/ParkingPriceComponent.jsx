import React, { useState, useEffect } from 'react';
import { Row, Col, Layout, Card, Typography, message, Form } from 'antd';
import moment from 'moment'; 

import ParkingPriceHeader from '../../../components//parkingPrice/ParkingPriceHeader';
import ParkingPriceLayout from '../../../components//parkingPrice/ParkingPriceLayout';
import ParkingPriceForm from '../../../components//parkingPrice/ParkingPriceForm';
import LastParkingPriceCard from '../../../components//parkingPrice/LastParkingPriceCard';

import '../../css/DashboardMenu.css';
import '../../css/ParkingPriceComponent.css';

const { useForm } = Form;

const ParkingPriceComponent = () => {
  const [form] = useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [parkingPrice, setParkingPrice] = useState(0); 
  const [lastSavedParkingPrice, setLastSavedParkingPrice] = useState(0); 
  const [lastDateParkingPrice, setLastDateParkingPrice] = useState(null); 

  const success = async () => {
    messageApi
      .loading('Guardando precio de parqueo...', 2.5)
      .then(async () => {
        message.success('Precio de parqueo guardado correctamente', 2.5);
        form.resetFields();
        setLastSavedParkingPrice(parkingPrice);
        await fetchLastParkingIncome(); 
      })
      .catch(() => message.error('Error al guardar el precio de parqueo', 2.5));
  };

  useEffect(() => {
    fetchLastParkingIncome();
  }, []); 

  const fetchLastParkingIncome = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/parking-price/last-parking-price`); 
      const data = await response.json();
      if (data.status === 'success') {
        setParkingPrice(data.data.price);
        setLastSavedParkingPrice(data.data.price); 
        setLastDateParkingPrice(moment(data.data.hour_date).format('YYYY-MM-DD HH:mm:ss'));
      } else {
        throw new Error('Error al obtener el último precio de parqueo');
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const handleSubmit = async (values) => {
    try {
      const { price, time_in_hours } = values;

      const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/parking-price`, { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          price: price,
          time_in_hours: time_in_hours,
        }),
      });

      if (response.ok) {
        success();
      } else {
        throw new Error('Error al guardar el ingreso de dinero');
      }
    } catch (error) {
      message.error(error.message);
    }
  };      

  return (
    <Layout>
      <ParkingPriceHeader />
      <ParkingPriceLayout>
        <Card className="parking-price-block-section">
          <Typography.Title level={2} strong className='parking-price-title' style={{textAlign: 'center'}}>
            Precio de Tiempo de Estacionamiento
          </Typography.Title>
          <Row justify="space-around">
            <Col xs={22} sm={18} md={16} lg={8}>
              <ParkingPriceForm 
                form={form} 
                handleSubmit={handleSubmit} 
              />
            </Col>
          </Row>
        </Card>
        <Row gutter={10} style={{ marginLeft: '4.5%', width: '100%' }}>
          <Col span={6}>
            <LastParkingPriceCard 
              lastSavedParkingPrice={lastSavedParkingPrice} 
              lastDateParkingPrice={lastDateParkingPrice} 
            />
          </Col>
        </Row>
      </ParkingPriceLayout>
      {contextHolder}
    </Layout>
  );
}

export default ParkingPriceComponent;
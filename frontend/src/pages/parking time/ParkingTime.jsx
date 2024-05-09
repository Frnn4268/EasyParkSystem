import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, Layout, Spin } from 'antd';

import TopMenuCustomer from '../parking time/TopMenuCustomer';

import '../../css/ParkingTimeCustomer.css';
import background from '../../assets/home/Easy park.png';

const { Header, Footer } = Layout;

const ParkingTime = () => {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_APP_API_URL_PARKING_TIME_CUSTOMER_GET}/customer/${id}`);
                setData(response.data);
                setTimeout(() => setLoading(false), 3000);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [id]);

    if (loading) {
        return (
            <div className="loading-container">
                <Spin size="large" />
            </div>
        );
    }

    return (
        <div className="container">
            <Layout>
                <Header>
                    <TopMenuCustomer />
                </Header>
                <Layout.Content>
                    <div className="card-wrapper">
                        <Card title="Información de Tiempo de Parqueo" className='card-text-customer'>
                            <p>ID: {data.id}</p>
                            <p>Hora de entrada: {data.hour_date_entry}</p>
                            <p>Número de espacio de parqueo: {data.parking_space_id}</p>
                            <p>Estado: {data.state}</p>
                        </Card>
                    </div>
                </Layout.Content>
                <Footer className="footer">
                    Restaurante y Pastelería Florencia - 2024 ©EasyPark
                </Footer>
            </Layout>
        </div>
    );
};

export default ParkingTime;

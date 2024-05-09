import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, Layout, Spin, Tag, FloatButton } from 'antd';
import { 
    CheckCircleOutlined,
    CloseCircleOutlined,
    SyncOutlined,
    QuestionCircleOutlined
    } from '@ant-design/icons';

import TopMenuCustomer from '../parking time/TopMenuCustomer';

import '../../css/ParkingTimeCustomer.css';
import background from '../../assets/home/Easy park.png';

const { Header, Footer } = Layout;

const ParkingTime = () => {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [elapsedTime, setElapsedTime] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_APP_API_URL_PARKING_TIME_CUSTOMER_GET}/customer/${id}`);
                setData(response.data);
                setLoading(false);

                const entryTime = new Date(response.data.hour_date_entry).getTime();
                const currentTime = new Date().getTime();
                const elapsed = Math.floor((currentTime - entryTime) / 1000); 
                setElapsedTime(elapsed);
                
                const intervalId = setInterval(() => {
                    const currentTime = new Date().getTime();
                    const elapsed = Math.floor((currentTime - entryTime) / 1000);
                    setElapsedTime(elapsed);
                }, 1000);

                return () => clearInterval(intervalId);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [id]);

    const formatEntryTime = (entryTime) => {
        const date = new Date(entryTime);
        const formattedDate = date.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        const formattedTime = date.toLocaleTimeString('es-ES');
        return `${formattedDate} a las ${formattedTime}`;
    };

    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;

        if (hours > 0) {
            return `${hours} hrs ${minutes} min ${remainingSeconds} seg`;
        } else if (minutes > 0) {
            return `${minutes} min ${remainingSeconds} seg`;
        } else {
            return `${remainingSeconds} seg`;
        }
    };

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
                        <Card title="Información de uso de Parqueo" className='card-text-customer'>
                            <p>Hora de entrada:</p>
                            <Tag icon={<CheckCircleOutlined />} color="success" style={{ fontWeight: 'bold', marginBottom: 25, fontSize: 13 }}>
                                {formatEntryTime(data.hour_date_entry)}
                            </Tag>
                            <p>Tiempo estacionado: </p>
                            <Tag icon={<SyncOutlined spin />} color="processing" style={{ fontWeight: 'bold', marginBottom: 25, fontSize: 13 }}>
                                {formatTime(elapsedTime)}
                            </Tag>
                            <p>Número de espacio de parqueo: 
                                <Tag  color="default" style={{ fontWeight: 'bold', marginBottom: 25, fontSize: 13 }}>
                                    {data.parking_space_id}
                                </Tag>
                            </p>
                            <p>Estado: 
                                <Tag icon={<CloseCircleOutlined />} color="error" style={{ fontWeight: 'bold', marginBottom: 25, fontSize: 13 }}>
                                    {data.state}
                                </Tag>
                            </p>                          
                        </Card>
                    </div>
                    <FloatButton
                        icon={<QuestionCircleOutlined />}
                        type="primary"
                        style={{
                            right: 20,
                            bottom: 70
                        }}
                    />
                </Layout.Content>
                <Footer className="footer">
                    Restaurante y Pastelería Florencia - 2024 ©EasyPark
                </Footer>
            </Layout>
        </div>
    );
};

export default ParkingTime;

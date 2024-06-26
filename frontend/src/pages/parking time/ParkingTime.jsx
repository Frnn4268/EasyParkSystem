import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, Layout, Spin, Tag, FloatButton, Popover } from 'antd';
import { 
    CheckCircleOutlined,
    CloseCircleOutlined,
    SyncOutlined,
    QuestionCircleOutlined
} from '@ant-design/icons';

import TopMenuCustomer from '../parking time/TopMenuCustomer';

import '../../css/ParkingTimeCustomer.css';

const { Header, Footer } = Layout;

const ParkingTime = () => {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [parkingCost, setParkingCost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [popoverVisible, setPopoverVisible] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/parking-time-customer/customer/${id}`);
                setData(response.data);
    
                setLoading(false);
    
                const entryTime = new Date(response.data.hour_date_entry).getTime();
                const currentTime = new Date().getTime();
                const elapsed = Math.floor((currentTime - entryTime) / 1000); 
                setElapsedTime(elapsed);
                
                const intervalId = setInterval(async () => {
                    const currentTime = new Date().getTime();
                    const elapsed = Math.floor((currentTime - entryTime) / 1000);
                    setElapsedTime(elapsed);
    
                    if (elapsed % 900 === 0) {
                        const costResponse = await axios.get(`${import.meta.env.VITE_APP_API_URL}/parking-price/${id}`);
                        setParkingCost(costResponse.data);
                    }
                }, 1000);
    
                const costResponse = await axios.get(`${import.meta.env.VITE_APP_API_URL}/parking-price/${id}`);
                setParkingCost(costResponse.data);
    
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

    const handlePopoverVisibleChange = (visible) => {
        setPopoverVisible(visible);
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
                            <p>Costo de estacionamiento: 
                                <Tag color="warning" style={{ fontWeight: 'bold', marginBottom: 25, fontSize: 13 }}>
                                    Q{parkingCost && parkingCost.data && parkingCost.data.parkingCost}
                                </Tag>
                            </p>                        
                        </Card>
                    </div>
                    <Popover
                        content={(
                            <div>
                                <p>Por favor, ten en cuenta que todos los datos proporcionados son de referencia y podrían no ser completamente precisos al momento de realizar el pago por el servicio de estacionamiento.</p>
                                <p>Para obtener información más detallada sobre el costo actual del estacionamiento, te recomendamos verificar con el personal autorizado.</p>
                            </div>
                        )}
                        title="Aviso"
                        trigger="click"
                        visible={popoverVisible}
                        onVisibleChange={handlePopoverVisibleChange}
                        overlayClassName="custom-popover"
                    >
                        <FloatButton
                            icon={<QuestionCircleOutlined />}
                            type="primary"
                            style={{
                                right: 20,
                                bottom: 70
                            }}
                        />
                    </Popover>
                </Layout.Content>
                <Footer className="footer">
                    Restaurante y Pastelería Florencia - 2024 ©EasyPark
                </Footer>
            </Layout>
        </div>
    );
};

export default ParkingTime;

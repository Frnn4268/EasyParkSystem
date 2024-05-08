import React, { useState, useEffect } from 'react';
import { Layout, Typography } from 'antd';
import TopMenuClient from './TopMenuCustomer';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Importa useParams de React Router para obtener los parámetros de la URL

import '../../css/DashboardMenu.css';

const { Header } = Layout;
const { Text } = Typography;

const ParkingTime = () => {
    const [latestParkingSpace, setLatestParkingSpace] = useState(null);
    const { id } = useParams(); // Obtén el parámetro 'id' de la URL

    useEffect(() => {
        fetchTimeCustomer();
    }, [id]); // Ejecuta fetchTimeCustomer cuando cambie el 'id'

    const fetchTimeCustomer = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_APP_API_URL_PARKING_TIME_CUSTOMER_GET}/customer/${id}`);
            if (response.status === 200) {
                console.log(response.data); 
                setLatestParkingSpace(response.data);
            } else {
                console.error('Error getting data');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Header className='home-header-dashboard'>
            <TopMenuClient />
            <div style={{ padding: '20px' }}>
            </div>
        </Header>
    )
}

export default ParkingTime;

import React from 'react';
import { Layout } from 'antd';

import TopMenuClient from './TopMenuCustomer';

import '../../css/DashboardMenu.css';

const { Header } = Layout;

const ParkingTime = () => {
    return (
        <Header className='home-header-dashboard'>
            <TopMenuClient />
        </Header>
    )
}

export default ParkingTime;
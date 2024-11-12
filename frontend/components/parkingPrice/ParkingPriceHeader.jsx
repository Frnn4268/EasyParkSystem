import React from 'react';
import { Layout } from 'antd';
import TopMenu from '../../src/pages/dashboard/TopMenu.jsx';

const { Header } = Layout;

const ParkingPriceHeader = () => (
  <Header className='parking-price-header-dashboard'>
    <TopMenu />
  </Header>
);

export default ParkingPriceHeader;
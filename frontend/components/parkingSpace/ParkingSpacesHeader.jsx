import React from 'react';
import { Layout } from 'antd';
import TopMenu from '../../src/pages/dashboard/TopMenu.jsx';

const { Header } = Layout;

const ParkingSpacesHeader = () => (
  <Header className='home-header-dashboard'>
    <TopMenu />
  </Header>
);

export default ParkingSpacesHeader;
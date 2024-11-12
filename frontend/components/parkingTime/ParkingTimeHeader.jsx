import React from 'react';
import { Layout } from 'antd';
import TopMenuCustomer from '../../src/pages/parkingTime/TopMenuCustomer.jsx';

const { Header } = Layout;

const ParkingTimeHeader = () => (
  <Header>
    <TopMenuCustomer />
  </Header>
);

export default ParkingTimeHeader;
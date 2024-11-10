import React from 'react';
import { Alert } from 'antd';
import Marquee from 'react-fast-marquee';

const DashboardAlert = () => (
  <Alert
    banner
    type="info"
    className='alert-layout'
    message={
      <Marquee pauseOnHover gradient={false}>
        Bienvenido a Easy Park - Restaurante y Pastelería Florencia © {new Date().getFullYear()}
      </Marquee>
    }
  />
);

export default DashboardAlert;
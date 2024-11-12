// ParkingPriceLayout.jsx
import React from 'react';
import { Layout } from 'antd';
import LeftMenu from '../../src/pages/dashboard/LeftMenu.jsx';

const ParkingPriceLayout = ({ children }) => (
  <Layout>
    <Layout.Sider>
      <LeftMenu />
    </Layout.Sider>
    <Layout.Content>
      {children}
    </Layout.Content>
  </Layout>
);

export default ParkingPriceLayout;
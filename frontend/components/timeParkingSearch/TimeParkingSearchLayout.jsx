import React from 'react';
import { Layout } from 'antd';
import LeftMenu from '../../src/pages/dashboard/LeftMenu.jsx';

const TimeParkingSearchLayout = ({ children }) => (
  <Layout>
    <Layout.Sider>
      <LeftMenu />
    </Layout.Sider>
    <Layout.Content className='layout-content-parking-history'>
      {children}
    </Layout.Content>
  </Layout>
);

export default TimeParkingSearchLayout;
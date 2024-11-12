import React from 'react';
import { Layout } from 'antd';
import LeftMenu from '../../src/pages/dashboard/LeftMenu.jsx';

const VehiclesLayout = ({ children }) => (
  <Layout>
    <Layout.Sider>
      <LeftMenu />
    </Layout.Sider>
    <Layout.Content className='layout-content-vehicle'>
      {children}
    </Layout.Content>
  </Layout>
);

export default VehiclesLayout;
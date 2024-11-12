import React from 'react';
import { Layout } from 'antd';
import LeftMenu from '../../src/pages/dashboard/LeftMenu.jsx';

const UsersLayout = ({ children }) => (
  <Layout>
    <Layout.Sider>
      <LeftMenu />
    </Layout.Sider>
    <Layout.Content className='layout-content-user'>
      {children}
    </Layout.Content>
  </Layout>
);

export default UsersLayout;
import React, { useEffect, useState } from 'react';
import { Layout, Typography } from 'antd';

import TopMenu from '../dashboard/TopMenu.jsx';
import LeftMenu from '../dashboard/LeftMenu.jsx';
import UsualCustomersTable from '../../../components/usualCustomer/UsualCustomersTable.jsx';

import '../../css/DashboardMenu.css';
import '../../css/UsualCustomers.css';

const { Header } = Layout;

const UsualCustomers = () => {
  const [usualCustomers, setUsualCustomers] = useState([]);

  useEffect(() => {
    fetchUsualCustomers();
  }, []);

  const fetchUsualCustomers = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/parking-space/usual-customers`);
      if (response.ok) {
        const data = await response.json();
        setUsualCustomers(data.frequentCustomers);
      } else {
        console.error('Error fetching frequent customers');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <Header className='home-header-dashboard'>
        <TopMenu />
      </Header>
      <Layout>
        <Layout.Sider>
          <LeftMenu />
        </Layout.Sider>
        <Layout.Content className='layout-content-usual-customers'>
          <Typography.Title className='table-title-usual-customers' level={2}>
            Clientes Frecuentes
          </Typography.Title>
          <UsualCustomersTable usualCustomers={usualCustomers} />
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default UsualCustomers;
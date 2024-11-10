import React from 'react';
import { Layout } from 'antd';
import TopMenu from '../../src/pages/dashboard/TopMenu.jsx';

const { Header } = Layout;

const IncomeHeader = () => (
  <Header className='daily-income-header-dashboard'>
    <TopMenu />
  </Header>
);

export default IncomeHeader;
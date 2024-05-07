import React, { useRef, useState } from 'react';
import { Layout, Result } from 'antd';

import TopMenu from '../src/pages/dashboard/TopMenu.jsx';
import LeftMenu from '../src/pages/dashboard/LeftMenu.jsx';

import '../src/css/DashboardMenu.css';
import '../src/css/InformationComponent.css';

const { Header } = Layout;

const InformationComponent = () => {

    return (
      <Layout>
          <Header className='home-header-dashboard'>
              <TopMenu />
          </Header>
          <Layout>
              <Layout.Sider>
                  <LeftMenu />
              </Layout.Sider>
              <Layout.Content>
                  <div className='center-div-notfound-container'>
                      <Result
                          status="404"
                          title="404"
                          subTitle="Perdón, la página que intentas visitar aún no existe."
                      />
                  </div>
              </Layout.Content>
          </Layout>
      </Layout>
    );
};

export default InformationComponent;

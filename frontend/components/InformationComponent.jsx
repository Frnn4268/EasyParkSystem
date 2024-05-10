import React, { useRef, useState } from 'react';
import { Layout, Divider, Steps } from 'antd';

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
                  <div className='center-div-about-container'>
                    <Steps
                            progressDot
                            current={1}
                            items={[
                                {
                                title: 'EasyPark',
                                description: 'Sitema de gestión de parqueo.',
                                },
                                {
                                title: 'En Progreso...',
                                description: 'Generación de QR y obtención de Información.',
                                },
                                {
                                title: 'Esperando...',
                                description: 'Estadísticas del sistema y roles para usuarios.',
                                },
                            ]}
                            />
                        <Divider />
                    <div className='bottom-div-about-container'>
                        <Steps
                            progressDot
                            current={2}
                            direction="vertical"
                            items={[
                                {
                                title: 'Terminado.',
                                description: 'Home, Login, Register, Información, Contacto',
                                },
                                {
                                title: 'Terminado',
                                description: 'Inicio, Parqueo, Historial de Parqueo, Usuarios, Clientes, Vehículos, Ingresos, Precio de Estacionamiento, Información, Contacto',
                                },
                                {
                                title: 'En Progreso',
                                description: 'Generación de QR y obtención de Información',
                                },
                                {
                                title: 'Esperando',
                                description: 'Estadísticas de Parqueo e Ingresos',
                                },
                                {
                                title: 'Esperando',
                                description: 'Asignación de roles para usuarios',
                                },
                            ]}
                        />
                    </div>
                  </div>
              </Layout.Content>
          </Layout>
      </Layout>
    );
};

export default InformationComponent;

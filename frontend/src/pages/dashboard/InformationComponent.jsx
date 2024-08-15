import React, { useRef, useState } from 'react';
import { Layout, Divider, Steps } from 'antd';

import TopMenu from './TopMenu.jsx';
import LeftMenu from './LeftMenu.jsx';

import '../../css/DashboardMenu.css';
import '../../css/InformationComponent.css';

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
                                description: 'Edición de perfil de usuario.',
                                },
                                {
                                title: 'Esperando...',
                                description: '...',
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
                                description: 'Inicio, Parqueo, Historial de Parqueo, Usuarios, Clientes, Vehículos, Ingresos, Precio de Estacionamiento, Información, Contacto, QR de Cliente y obtención de Información, Estadísticas de Ingresos, Estadísticas de parqueo, Roles para usuarios',
                                },
                                {
                                title: 'En Progreso',
                                description: 'Perfil de Usuario',
                                },
                                {
                                title: 'Esperando',
                                description: '...',
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

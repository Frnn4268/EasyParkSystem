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
                                description: 'Estadísticas de parqueo.',
                                },
                                {
                                title: 'Esperando...',
                                description: 'Roles para usuarios y Edición de perfil de usuario.',
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
                                description: 'Inicio, Parqueo, Historial de Parqueo, Usuarios, Clientes, Vehículos, Ingresos, Precio de Estacionamiento, Información, Contacto, QR de Cliente y obtención de Información, Estadísticas de Ingresos',
                                },
                                {
                                title: 'En Progreso',
                                description: 'Estadísticas de Parqueo',
                                },
                                {
                                title: 'Esperando',
                                description: 'Asignación de roles para usuarios',
                                },
                                {
                                title: 'Esperando',
                                description: 'Perfil de Usuario',
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

import React, { useRef, useState } from 'react';
import { Layout, Button, Divider, Space, Tour } from 'antd'
import { 
    CarOutlined,
    UsergroupAddOutlined ,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PieChartOutlined,
    HomeOutlined, 
    InfoCircleOutlined, 
    PhoneOutlined, 
    UserOutlined,
    AreaChartOutlined,
    HistoryOutlined,
    BarChartOutlined 
    } from '@ant-design/icons';

import TopMenu from '../src/pages/dashboard/TopMenu.jsx';
import LeftMenu from '../src/pages/dashboard/LeftMenu.jsx';

import '../src/css/DashboardMenu.css';
import '../src/css/InformationComponent.css'

const { Header } = Layout;

const InformationComponent = () => {
    const ref1 = useRef(null);
    const ref2 = useRef(null);
    const ref3 = useRef(null);
    const ref4 = useRef(null);
    const ref5 = useRef(null);
    const ref6 = useRef(null);
    const ref7 = useRef(null);
    const ref8 = useRef(null);
    const ref9 = useRef(null);
    const ref10 = useRef(null);
    const ref11 = useRef(null);
    const ref12 = useRef(null);
    const ref13 = useRef(null);
    const ref14 = useRef(null);
    const ref15 = useRef(null);
    const [open, setOpen] = useState(false);

    const steps = [
        {
          title: 'Inicio',
          description: 'En la pestaña de Inicio podrás ver información básica del estado actual del parqueo.',
          target: () => ref1.current,
        },
        {
          title: 'Parqueo',
          description: 'En la pestaña de Parqueo podrás ver información de los estados del parqueo y podrás ingresar nuevos clientes y vehículos al mismo.',
          target: () => ref2.current,
        },
        {
          title: 'Historial de Parqueo',
          description: 'En la pestaña de Historial de Parqueo podrás ver información detallada de todos los espacios de parqueo, sus tiempos de ocupación, los clientes y vehículos que lo utilizaron, etc',
          target: () => ref3.current,
        },
        {
          title: 'Estadísticas de Parqueo',
          description: 'En la pestaña de Estadísticas de Parqueo podrás ver información del parqueo basada en gráficas estadísticas.',
          target: () => ref4.current,
        },
        {
          title: 'Clientes',
          description: 'El módulo Clientes nos permitirá poder ingresar a otras pestañas relacionadas con el cliente.',
          target: () => ref5.current,
        },
        {
          title: 'Ver Clientes',
          description: 'La pestaña Ver Clientes nos permitirá ver la información de todos los clientes registrados en el sistema.',
          target: () => ref6.current,
        },
        {
          title: 'Clientes Frecuentes',
          description: 'En la pestaña Clientes Frecuentes se nos mostrarán los clientes que más frecuentan el parqueo mensualmente.',
          target: () => ref7.current,
        },
        {
          title: 'Vehículos',
          description: 'El módulo Vehículos nos permitirá poder ingresar a otras pestañas relacionadas con los vehículos.',
          target: () => ref8.current,
        },
        {
          title: 'Ver Vehículos',
          description: 'La pestaña Ver Vehículos nos permitirá ver la información de todos los vehículos registrados en el sistema.',
          target: () => ref9.current,
        },
        {
          title: 'Historial de Vehículos',
          description: 'En la pestaña de Historial de Vehículos podrás ver todo el historial de vehículos y clientes registrados en el sistema.',
          target: () => ref10.current,
        },
        {
          title: 'Ingresos',
          description: 'El módulo Ingresos nos permitirá poder ingresar a otras pestañas relacionadas con los ingresos.',
          target: () => ref11.current,
        },
        {
          title: 'Estadísticas de Ingresos',
          description: 'En la pestaña de Estadísticas de Ingresos podrás ver información del parqueo basada en gráficas estadísticas.',
          target: () => ref12.current,
        },
        {
          title: 'Ingresos diarios',
          description: 'En la pestaña de Ingresos diarios podrás ingresar el ingreso diario y además podrás ver cual fue el monto y fecha del último ingreso registrado.',
          target: () => ref13.current,
        },
        {
          title: 'Historial de Ingresos',
          description: 'En la pestaña de Historial de Ingresos podrás ver todo el historial de ingresos registrados en el sistema.',
          target: () => ref14.current,
        },
        {
          title: 'Contacto',
          description: 'En la pestaña de Contacto podrás ver todos los registros de contacto que los usuarios han enviado al sistema.',
          target: () => ref15.current,
        }
    ];

    return (
        <Layout>
            <Header className='home-header-dashboard'>
                <TopMenu />
            </Header>
            <Layout>
                <Layout.Sider>
                    <LeftMenu />
                </Layout.Sider>
                <Layout.Content style={{ marginTop: 50 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Button onClick={() => setOpen(true)}>
                            Iniciar Tour de Información
                        </Button>
                        <Divider />
                        <Space direction="vertical">
                            <Button ref={ref1} type="primary">Inicio</Button>
                            <Button ref={ref2} type="primary">Parqueo</Button>
                            <Button ref={ref3} type="primary">Historial de Parqueo</Button>
                            <Button ref={ref4} type="primary">Estadísticas de Parqueo</Button>
                            <Button ref={ref5} type="primary">Clientes</Button>
                            <Button ref={ref6} type="primary">Ver Clientes</Button>
                            <Button ref={ref7} type="primary">Clientes Frecuentes</Button>
                            <Button ref={ref8} type="primary">Vehículos</Button>
                            <Button ref={ref8} type="primary">Ver Vehículos</Button>
                            <Button ref={ref9} type="primary">Historial de Vehículos</Button>
                            <Button ref={ref10} type="primary">Ingresos</Button>
                            <Button ref={ref11} type="primary">Ver Estadísticas de Ingresos</Button>
                            <Button ref={ref12} type="primary">Ingresos diarios</Button>
                            <Button ref={ref13} type="primary">Historial de Ingresos</Button>
                            <Button ref={ref14} type="primary">Información</Button>
                            <Button ref={ref15} type="primary">Contacto</Button>
                        </Space>
                    </div>
                    <Tour open={open} onClose={() => setOpen(false)} steps={steps} />
                </Layout.Content>
            </Layout>
        </Layout>
    )
}

export default InformationComponent;

import React, {useRef} from 'react'
import { Descriptions, Layout, Card, Typography } from 'antd';

import MainMenu from './MainMenu'; 

import '../../css/Home.css';
import form_home from '../../assets/home/form_card1.png'

const { Header, Content } = Layout;

const backgroundStyle = {
    backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1.5)), url(${form_home})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
    borderRadius: '0 100% 25% 15%'
  };

const items = [
    {
        key: '1',
        label: 'Nombre: ',
        children: 'Restaurante y Pastelería Florencia',
    },
    {
        key: '2',
        label: 'Telefóno',
        children: '7922 4557',
    },
    {
        key: '3',
        label: 'Horario de atención: ',
        children: 'Lunes a Domingo: 7:00 A.M. - 9:00 P.M.',
    },
    {
        key: '4',
        label: 'Departamento: ',
        children: 'Jalapa, Jalapa',
    },
    {
        key: '5',
        label: 'Dirección',
        children: 'Avenida Chipilapa 1-72, Jalapa 21001',
    },
  ];
const Information = () => {
    

    return (
        <>
            <Layout className="layout" style={backgroundStyle}>    
                <Header className='home-header'> 
                    <MainMenu />
                </Header>
                <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                    <Card className="home-block-section">
                        <Typography.Title level={3} strong className='title' style={{textAlign: 'center'}}>
                            Información
                        </Typography.Title>
                        <Descriptions title="Información sobre el lugar" items={items} />;
                    </Card>   
                </Content>
            </Layout>
        </>
    )
}

export default Information;
import React from 'react';
import { Layout, Typography, Col, Row } from 'antd';

import MainMenu from '../../../components/home/MainMenu.jsx';
import HomeCarousel from '../../../components/home/Carousel.jsx';
import WelcomeSection from '../../../components/home/WelcomeSection.jsx';
import FeatureCard from '../../../components/home/FeatureCard.jsx';
import AppFooter from '../../../components/home/Footer.jsx';

import '../../css/Home.css';

const { Title } = Typography;
const { Header, Content } = Layout;

const backgroundStyle = {
  backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1.5)), url('https://i.postimg.cc/8cyTs44c/form-card.png')`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  position: 'relative',
  borderRadius: '100% 0 0 30%',
  width: '100%'
};

const Home = () => {
  return (
    <Layout className="layout" style={backgroundStyle}>
      <Header className='home-header'>
        <MainMenu />
      </Header>
      <Content>
        <WelcomeSection />
        <Title className='title-middle-layout'>¿Qué novedades tenemos en EasyPark?</Title>
        <Row className='home-card' gutter={16}> 
          <Col span={8}>
            <FeatureCard
              title="Búsqueda de Estacionamiento"
              description="Los empleados pueden buscar y reservar espacios de estacionamiento disponibles en áreas específicas utilizando el sitio web de EasyPark."
              image="https://i.postimg.cc/1Xyz8fZC/card-image1.jpg"
            />
          </Col>
          <Col span={8}>
            <FeatureCard
              title="Tiempo de Estacionamiento"
              description="EasyPark permite a los conductores ver por anticipado su tiempo de estacionamiento de manera conveniente a través del sitio web."
              image="https://i.postimg.cc/fTTLZtCk/card-image2.jpg"
            />
          </Col>
          <Col span={8}>
            <FeatureCard
              title="Recordatorio"
              description="EasyPark es un sistema de gestión de parqueo que tiene como principal función optimizar tus tareas diarias."
              image="https://i.postimg.cc/ZRxbz4yr/card-image3.jpg"
            />
          </Col>
        </Row>
        <HomeCarousel />
      </Content>
      <AppFooter />
    </Layout>
  );
};

export default Home;
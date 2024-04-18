import React from 'react';
import { Layout, Card, Button, Typography, Divider, Col, Row, Carousel } from 'antd';
import { Link } from 'react-router-dom';
import { FacebookFilled } from '@ant-design/icons';

import MainMenu from './MainMenu.jsx';

import '../../css/Home.css';
import logo_card from '../../assets/home/logo_card.png'
import form_home from '../../assets/home/form_card.png'
import card_image1 from '../../assets/home/card_image1.jpg'
import card_image2 from '../../assets/home/card_image2.jpg'
import card_image3 from '../../assets/home/card_image3.jpg'

const { Title, Text } = Typography;
const { Header, Content, Footer } = Layout;
const { Meta } = Card;

const backgroundStyle = {
  backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1.5)), url(${form_home})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  position: 'relative',
  borderRadius: '100% 0 0 30%',
  width: '100%'
};

const cardStyle = { 
  width: 500,
  height: 'auto', 
  borderRadius: "20px", 
  margin: '50px auto',
  overflow: 'hidden',
}

const contentStyle = {
  margin: 0,
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

const Home = () => {
  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };

  return (
    <Layout className="layout" style={backgroundStyle}>
      <Header className='home-header'>
        <MainMenu />
      </Header>
      <Content>
      <Card className="home-block-section">
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <Title level={2} className="home-welcome-text" style={{ fontSize: 55 }}>Bienvenido a EasyPark</Title>
            <Text level={3} className="home-welcome-message">Por favor, inicia sesión o regístrate para continuar</Text>
          </div>
            <img src={logo_card} alt="EasyPark Logo" className='logo-card' />
        </div>
        <div className="home-buttons-container">
          <Link to="/login">
            <Button ghost type="primary" className="home-button">Iniciar sesión</Button>
          </Link>
          <Divider type='vertical' className='home-divider'></Divider>
          <Link to="/register">
            <Button type="primary" className="home-button">Registrarse</Button>
          </Link>
        </div>
        <Link to='https://www.facebook.com/florencia.gt'>
          <Button type='primary' icon={<FacebookFilled />} size='small' className='home-btn'>
            Facebook
          </Button>
        </Link>
      </Card>
          <Title className='title-middle-layout'>¿Qué novedades tenemos en EasyPark?</Title>
          <Row className='home-card' gutter={16}> 
            <Col span={8}>
              <Card
                hoverable
                style={cardStyle}
                cover={<img alt="example" src={card_image1} />}
              >
                <Meta title="Búsqueda de Estacionamiento" description=" "/>
                Los empleados pueden buscar y reservar espacios de estacionamiento disponibles en áreas específicas utilizando el sitio web de EasyPark.
              </Card>
            </Col>
            <Col span={8}>
              <Card
                hoverable
                style={cardStyle}
                cover={<img alt="example" src={card_image2}  />}
              >
                <Meta title="Tiempo de Estacionamiento" description=" " />
                EasyPark permite a los conductores ver por anticipado su tiempo de estacionamiento de manera conveniente a través del sitio web.
              </Card>
            </Col>
            <Col span={8}>
              <Card
                hoverable
                style={cardStyle}
                cover={<img alt="example" src={card_image3}  />}
              >
                <Meta title="Recordatorio" description=" " />
                EasyPark es un sistema de gestión de parqueo que tiene como principal función optimizar tus tareas diarias.
              </Card>
            </Col>
          </Row>
          <Carousel afterChange={onChange} style={{ margin: '30px 0 0 0' }}>
            <div>
              <h3 style={contentStyle}>1</h3>
            </div>
            <div>
              <h3 style={contentStyle}>2</h3>
            </div>
            <div>
              <h3 style={contentStyle}>3</h3>
            </div>
          </Carousel>
      </Content>
      { /* Comment section */}
      <Footer style={{ textAlign: 'center' }}>Restaurante y Pastelería Florencia - ©2024 EasyPark</Footer>
    </Layout>
  );
};

export default Home;

import React from 'react';
import { Card, Button, Typography, Divider } from 'antd';
import { Link } from 'react-router-dom';
import { FacebookFilled } from '@ant-design/icons';

const { Title, Text } = Typography;

const WelcomeSection = () => {
  return (
    <Card className="home-block-section">
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <Title level={2} className="home-welcome-text" style={{ fontSize: 55 }}>Bienvenido a EasyPark</Title>
          <Text level={3} className="home-welcome-message">Por favor, inicia sesión o regístrate para continuar.</Text>
        </div>
        <img src="https://i.postimg.cc/Y2X76XNq/logo-card.png" alt="EasyPark Logo" className='logo-card' />
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
  );
};

export default WelcomeSection;
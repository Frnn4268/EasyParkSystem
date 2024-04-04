import React from 'react';
import { Card, Button, Typography, Layout } from 'antd';
import { Link } from 'react-router-dom';
import { FacebookFilled  } from '@ant-design/icons';

const { Header, Content } = Layout;
const { Title, Text } = Typography;

const Home = () => {
  return (
    <Layout>
      <Header className="header">
        <Title level={1} className="title">EasyPark - Restaurante Florencia</Title>
      </Header>
      <Content className="content">
        <Card className="form-container">
          <Title level={2} className="welcome-text">Bienvenido a EasyPark</Title>
          <Text className="welcome-message">Por favor, inicia sesión o regístrate para continuar</Text>
          <div className="buttons-container">
            <Link to="/login">
              <Button type="primary" className="button">Iniciar sesión</Button>
            </Link>
            <Link to="/register">
              <Button type="primary" className="button">Registrarse</Button>
            </Link>
          </div>

          <Link to='https://www.facebook.com/florencia.gt'>
            <Button type='primary' icon={<FacebookFilled />} size='small' className='btn'>
              Facebook
            </Button>
          </Link>
        </Card>
      </Content>
    </Layout>
  );
};

export default Home;

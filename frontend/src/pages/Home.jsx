import React from 'react';
import { Button, Layout } from 'antd';
import { Link } from 'react-router-dom';

const { Header, Content } = Layout;

const Home = () => {
  return (
    <Layout>
      <Header className="header">
        <h1>EasyPark - Restaurante Florencia</h1>
      </Header>
      <Content className="content">
        <div className="content-container">
          <h2 className="welcome-text">Bienvenido a EasyPark</h2>
          <p className="welcome-message">Por favor, inicia sesión o regístrate para continuar</p>
          <div className="buttons-container">
            <Link to="/login">
              <Button type="primary" className="button">Iniciar sesión</Button>
            </Link>
            <Link to="/register">
              <Button type="primary" className="button">Registrarse</Button>
            </Link>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default Home;

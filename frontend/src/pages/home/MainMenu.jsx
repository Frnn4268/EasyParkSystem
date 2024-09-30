import React from 'react';
import { Menu, Popover } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined, InfoCircleOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';

const popoverContent = (
  <div>
    <p>Inicia sesión en nuestra web!</p>
  </div>
);

const MainMenu = () => {
  return (
    <div style={{ position: 'fixed', width: '100%', zIndex: 1000 }}>
      <Menu theme='dark' mode="horizontal" defaultSelectedKeys={['2']} style={{ display: 'flex' }}>
        <Menu.Item className='login-menu-image' key="1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: 200 }}>
          <img src="https://i.postimg.cc/jdmr9Lkp/logo-home.png" style={{ width: 45, height: 35, display: 'flex', alignItems: 'center', justifyContent: 'center' }} alt="Logo" />
          <Link to="/" ></Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<HomeOutlined />}>
          <Link to="/" >Inicio</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<InfoCircleOutlined />}>
          <Link to="/about">Información</Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<PhoneOutlined />}>
          <Link to="/contact">Contacto</Link>
        </Menu.Item>
        <Menu.Item key="5" icon={<UserOutlined />} style={{ marginLeft: 'auto', marginRight: 200 }}>
          <Popover content={popoverContent} title='EasyPark'>
            <Link to="/login">Iniciar sesión</Link>
          </Popover>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default MainMenu;

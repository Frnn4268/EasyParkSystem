import React from 'react';
import { Menu, Popover } from 'antd';
import { Link } from 'react-router-dom';

import logo_home from '../../assets/home/logo_home.png';

const popoverContent = (
  <div>
    <p>Inicia sesión en nuestra web!</p>
  </div>
);

const MainMenu = () => {
  return (
    <Menu theme='dark' mode="horizontal" defaultSelectedKeys={['2']} >
      <Menu.Item className='login-menu-image' key="1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img src={logo_home} style={{ width: 45, height: 35, display: 'flex', alignItems: 'center', justifyContent: 'center' }} alt="Logo" />
        <Link to="/" ></Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="/" >Inicio</Link>
      </Menu.Item>
      <Menu.Item key="3">
        <Link to="/about">Información</Link>
      </Menu.Item>
      <Menu.Item key="4">
        <Link to="/contact">Contacto</Link>
      </Menu.Item>
      <Popover content={popoverContent} title='EasyPark'>
        <Menu.Item key="5">
          <Link to="/login">Iniciar sesión</Link>
        </Menu.Item>
      </Popover>
    </Menu>
  );
};

export default MainMenu;

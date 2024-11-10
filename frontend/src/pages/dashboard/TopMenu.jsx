import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Avatar, Button, Popover, Typography, Divider } from 'antd';
import { UserOutlined, LogoutOutlined, EditOutlined } from '@ant-design/icons';

import { useAuth } from '../../contexts/AuthContext.jsx';

import '../../css/DashboardMenu.css';

const TopMenu = () => {
  const { logout, userData } = useAuth();

  const avatarImages = [
    'https://i.postimg.cc/R0z1gL1N/icon-1.png',
    'https://i.postimg.cc/hGbL6QMM/icon-2.png',
    'https://i.postimg.cc/Qt8Q3NyD/icon-3.png',
    'https://i.postimg.cc/63Md5skv/icon-4.png',
    'https://i.postimg.cc/Kj4t1qbs/icon-5.png',
  ];

  const randomAvatarIndex = Math.floor(Math.random() * avatarImages.length);
  const avatarSrc = avatarImages[randomAvatarIndex];

  const handleLogout = async () => {
    await logout();
  };

  const popoverContent = (
    <div>
      <p>
        <strong>Rol:</strong> {userData && userData.role}
      </p>
      <p>
        <strong>Correo:</strong> {userData && userData.email}
      </p>
      <Link to='/user-profile'>
        <Button type='link' icon={<EditOutlined />} style={{ marginLeft: 45 }}>
          Editar perfil
        </Button>
      </Link>
    </div>
  );

  return (
    <div style={{ position: 'fixed', width: '100%', zIndex: 1000 }}>
      <Menu
        theme='dark'
        mode='horizontal'
        style={{ display: 'flex' }}
        selectable={false}
      >
        <Menu.Item key='1'>
          <Typography.Text className='top-nav-text'>EasyPark</Typography.Text>
        </Menu.Item>
        <div
          style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}
        >
          <div>
            <Popover content={popoverContent}>
              <Avatar src={avatarSrc} icon={<UserOutlined />} />
              <Typography.Text className='top-nav-username'>
                {userData && userData.name}
              </Typography.Text>
            </Popover>
          </div>
          <Divider type='vertical' className='top-menu-divider' />
          <Button
            icon={<LogoutOutlined />}
            size='large'
            type='primary'
            className='profile-btn'
            onClick={handleLogout}
          >
            Cerrar sesión
          </Button>
        </div>
      </Menu>
    </div>
  );
};

export default TopMenu;

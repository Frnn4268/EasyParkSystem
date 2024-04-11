import React, { useEffect } from 'react';
import { Avatar, Button, Card, Flex, Typography } from 'antd';
import { useAuth } from '../contexts/AuthContext.jsx';

import '../css/Auth.css'

import icon_1 from '../assets/icons/icon_1.png';
import icon_2 from '../assets/icons/icon_2.png';
import icon_3 from '../assets/icons/icon_3.png';
import icon_4 from '../assets/icons/icon_4.png';
import icon_5 from '../assets/icons/icon_5.png';

const Dashboard = () => {
  const { logout, userData } = useAuth();

  const avatarImages = [icon_1, icon_2, icon_3, icon_4, icon_5];

  const randomAvatarIndex = Math.floor(Math.random() * avatarImages.length);
  const avatarSrc = avatarImages[randomAvatarIndex];
  
  const handleLogout = async () => {
    await logout()
  }

  return (
    <Card className="profile-card">
      <Flex vertical gap="small" align="center">
        <Avatar
          src={avatarSrc}
          size={100}
        />
        <Typography.Title 
          level={2} 
          strong 
          className="username">
            {userData && userData.name}
        </Typography.Title>
        <Typography.Text 
          type="secondary" 
          strong>
            Email: {userData && userData.email}
        </Typography.Text>
        <Typography.Text 
          type="secondary"
          strong>
            Rol: {userData && userData.role}
        </Typography.Text>
        <Button 
          size="large" 
          type="primary" 
          className="profile-btn" 
          onClick={handleLogout}>
            Cerrar sesión
        </Button>
      </Flex>
    </Card>
  );
};

export default Dashboard;

import React from 'react';
import { Avatar, Button, Card, Flex, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useAuth } from '../contexts/AuthContext.jsx';

const Dashboard = () => {
  const { userData, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  const gravatarUrl = `https://www.gravatar.com/avatar/${userData.emailHash}?s=150&d=identicon`;

  return (
    <Card className='profile-card'>
      <Flex vertical gap='small' align='center'>
        <Avatar size={150} src={gravatarUrl} icon={<UserOutlined />} className='avatar' />
        <Typography.Title level={2} strong className='username'>
          {userData.name}
        </Typography.Title>
        <Typography.Text type='secondary'>Email: {userData.email}</Typography.Text>
        <Typography.Text type='secondary'>Rol: {userData.role}</Typography.Text>
        <Button size='large' type='primary' className='profile-btn' onClick={handleLogout}>
          Cerrar sesión
        </Button>
      </Flex>
    </Card>
  );
};

export default Dashboard;

import React from 'react';
import { Avatar, Button, Card, Flex, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useAuth } from '../contexts/AuthContext.jsx';

const Dashboard = () => {
  const { logout, userData } = useAuth();

  console.log(userData, "Desde dashboard")

  const handleLogout = async () => {
    await logout()
  }

  return (
    <Card className="profile-card">
      <Flex vertical gap="small" align="center">
        <Avatar 
          size={125} 
          icon={<UserOutlined />}
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

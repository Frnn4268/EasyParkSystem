import React from 'react';
import { Card, Flex, Typography, Layout } from 'antd';
import FloatingButtons from '../../../components/auth/FloatingButtons.jsx';
import LoginForm from '../../../components/auth/LoginForm.jsx';
import useLogin from '../../hooks/useLogin.jsx';
import '../../css/Auth.css';

const backgroundStyle = {
  backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 3)), url('https://i.postimg.cc/vZ5HtrHq/form-card2.png')`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  position: 'relative',
  borderRadius: '100% 0 0 50%',
  width: '100%'
};

const Login = () => {
  const { loading, error, loginUser } = useLogin();

  const handleLogin = async (values) => {
    await loginUser(values);
  };

  const [options, setOptions] = React.useState([]);
  const handleSearch = (value) => {
    setOptions(() => {
      if (!value || value.includes('@')) {
        return [];
      }
      return ['gmail.com', 'hotmail.com', 'outlook.com'].map((domain) => ({
        label: `${value}@${domain}`,
        value: `${value}@${domain}`,
      }));
    });
  };

  return (
    <Layout className="layout" style={backgroundStyle}>
      <div className='login-container'>
        <FloatingButtons />
        <Card className='form-container'>
          <Flex gap='large' align='center'>
            <Flex flex={1}>
              <img src='https://i.postimg.cc/fbZW2VVw/login-logo1.jpg' className='auth-image' alt='Login Logo' />
            </Flex>
            <Flex vertical flex={1}>
              <Typography.Title level={3} strong className='title'>
                Iniciar sesión
              </Typography.Title>
              <Typography.Text type='secondary' strong className='slogan'>
                EasyPark - Restaurante Florencia
              </Typography.Text>
              <LoginForm 
                handleLogin={handleLogin} 
                handleSearch={handleSearch} 
                options={options} 
                loading={loading} 
                error={error} 
              />
            </Flex>
          </Flex>
        </Card>
      </div>
    </Layout>
  );
};

export default Login;
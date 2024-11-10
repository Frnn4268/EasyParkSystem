import React from 'react';
import { Card, Flex, Typography, Layout } from 'antd';
import FloatingButtons from '../../../components/auth/FloatingButtons.jsx';
import RegisterForm from '../../../components/auth/RegisterForm.jsx';
import useSignup from '../../hooks/useSingup';
import { useAuth } from '../../contexts/AuthContext.jsx';
import '../../css/Auth.css';

const backgroundStyle = {
  backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 3)), url('https://i.postimg.cc/vZ5HtrHq/form-card2.png')`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  position: 'relative',
  borderRadius: '100% 0 0 50%',
  width: '100%'
};

const Register = () => {
  const { loading, error, registerUser } = useSignup();
  const { login } = useAuth();

  const handleRegister = async (values) => {
    const response = await registerUser(values);
    if (response && response.token && response.user) {
      login(response.token, response.user);
    }
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
    <Layout style={backgroundStyle}>
      <div className='register-container'>
        <FloatingButtons />
        <Card className='form-container'>
          <Flex gap='large' align='center'>
            <Flex vertical flex={1}>
              <Typography.Title level={3} strong className='title'>
                Crear una cuenta
              </Typography.Title>
              <Typography.Text type='secondary' strong className='slogan'>
                Crea una cuenta para ingresar a nuestra web!
              </Typography.Text>
              <RegisterForm 
                handleRegister={handleRegister} 
                handleSearch={handleSearch} 
                options={options} 
                loading={loading} 
                error={error} 
              />
            </Flex>
            <Flex flex={1}>
              <img src='https://i.postimg.cc/nzrJgBpt/register-logo1.jpg' className='auth-image' alt='Register Logo' />
            </Flex>
          </Flex>
        </Card>
      </div>
    </Layout>
  );
};

export default Register;
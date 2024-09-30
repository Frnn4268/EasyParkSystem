import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Flex, Typography, Form, Input, Button, Alert, Spin, AutoComplete, FloatButton, Layout } from 'antd' 
import { HomeFilled, InfoCircleFilled, PhoneFilled } from '@ant-design/icons';

import '../../css/Auth.css'

import useLogin from '../../hooks/useLogin.jsx'

const backgroundStyle = {
  backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 3)), url('https://i.postimg.cc/vZ5HtrHq/form-card2.png')`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  position: 'relative',
  borderRadius: '100% 0 0 50%',
  width: '100%'
};

const Login = () => {
  const { loading, error, loginUser } = useLogin()

  const handleLogin = async(values) => {
    await loginUser(values)
  }

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
    <>
      <Layout className="layout" style={backgroundStyle}>
        <div className='login-container'>
          {/* Floating button Home and Information */}
          <div className='float-button'>
            <FloatButton.Group shape="square" style={{ marginRight: 20 }} >
              <Link to="/">
                <FloatButton className='float-button-color' style={{marginBottom: 20}} icon={<HomeFilled />} />
              </Link>
              <Link to="/about">  
                <FloatButton className='float-button-color' style={{marginBottom: 20}} icon={<InfoCircleFilled />} >
                </FloatButton>
              </Link>
              <Link to="/contact">  
                <FloatButton className='float-button-color' icon={<PhoneFilled />} >
                </FloatButton>
              </Link>
            </FloatButton.Group>
          </div>

          {/* Content */}
          <Card className='form-container'>
            <Flex gap='large' align='center'>
              {/* Image */}
              <Flex flex={1}>
                <img src='https://i.postimg.cc/fbZW2VVw/login-logo1.jpg' className='auth-image'></img>
              </Flex>

              {/* Form */}
              <Flex vertical flex={1}>
                <Typography.Title level={3} strong className='title'>
                  Iniciar sesión
                </Typography.Title>
                <Typography.Text type='secondary' strong className='slogan'>
                  EasyPark - Restaurante Florencia
                </Typography.Text>
                
                <Form 
                  layout='vertical' 
                  onFinish={handleLogin} 
                  autoComplete='off'>

                  <Form.Item
                    label='Email'
                    name='email'
                    rules={[
                      {
                        required: true,
                        message: 'Por favor ingresa tu email',
                      },
                      {
                        type: 'email',
                        message: 'Este no es un email válido',
                      },
                    ]}
                  >
                    <AutoComplete
                      size='large'
                      style={{ width: '100%' }}
                      onSearch={handleSearch}
                      placeholder="Ingresa tu email"
                      options={options}
                    />
                  </Form.Item>

                    <Form.Item 
                      label='Contraseña' 
                      name='password' 
                      rules={[{
                        required: true,
                        message: 'Por favor ingresa tu contraseña'
                      }]}>
                        <Input.Password size='large' placeholder='Ingresa tu contraseña'/>
                    </Form.Item>

                    {
                      error && (
                      <Alert 
                        description={error} 
                        type='error' 
                        showIcon 
                        closable 
                        className='alert' />
                      )
                    }

                    <Form.Item >
                      <Button 
                        type={`${loading ? '': 'primary'}`}
                        htmlType='submit' 
                        size='large' 
                        className='btn'>
                          { loading ? <Spin /> : 'Iniciar sesión' }
                      </Button>
                    </Form.Item>

                    {/* Registro */}
                    <Flex className="register-container">
                      <Form.Item>
                        <Typography.Text>
                          ¿No tienes una cuenta?
                          <Link to='/register' style={{ margin: 5}}>
                            <Typography.Link>
                              Registrate
                            </Typography.Link>
                          </Link>
                        </Typography.Text>
                      </Form.Item>
                    </Flex>
                </Form>  
              </Flex>
            </Flex>
          </Card>
        </div>
      </Layout>
    </>
  ) 
}

export default Login
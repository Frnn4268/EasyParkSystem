import { Card, Flex, Typography, Form, Input, Button, Alert, Spin } from 'antd' 
import React from 'react'
import { Link } from 'react-router-dom'

import loginImage from '../assets/login_logo1.jpg'
import useLogin from '../hooks/useLogin.jsx'
const Login = () => {

  const { loading, error, loginUser } = useLogin()
  const handleLogin = async(values) => {
    await loginUser(values)
  }

  return (
    <Card className='form-container'>
      <Flex gap='large' align='center'>
        {/* Image */}
        <Flex flex={1}>
          <img src={loginImage} className='auth-image'></img>
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
                rules={[{
                  required: true,
                  message: 'Por favor ingresa tu email'
                },
                {
                  type: 'email',
                  message: 'Este no es un email válido',
                }]}>
                  <Input size='large' placeholder='Ingresa tu email'/>
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
                  </Typography.Text>
                </Form.Item>
              </Flex>
            
              <Form.Item>
                <Link to='/register'>
                  <Button size='large' className='btn'>
                    Registrarse
                  </Button>
                </Link>
              </Form.Item>
              
          </Form>  
        </Flex>
      </Flex>
    </Card>
  )
}

export default Login
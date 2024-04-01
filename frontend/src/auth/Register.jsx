import { Card, Flex, Typography, Form, Input, Button, Alert, Spin, Select  } from 'antd' 
import React from 'react'
import { Link } from 'react-router-dom'

import registerImage from '../assets/register_logo.jpg'
import useSignup from '../hooks/useSingup'

const Register = () => {

  const { loading, error, registerUser } = useSignup()
  const handleRegister = (values) => {
    registerUser(values)
  }

  return (
    <Card className='form-container'>
      <Flex gap='large' align='center'>
        {/* Form */}
        <Flex vertical flex={1}>
          <Typography.Title level={3} strong className='title'>
            Crear una cuenta
          </Typography.Title>
          <Typography.Text type='secondary' strong className='slogan'>
            Crea una cuenta para ingresar a nuestra web!
          </Typography.Text>
          
          <Form 
            layout='vertical' 
            onFinish={handleRegister} 
            autoComplete='off'>

              <Form.Item 
                label='Nombre completo' 
                name='name' 
                rules={[{
                  required: true,
                  message: 'Por favor ingresa tu nombre'
                }]}>
                <Input size='large' placeholder='Ingresa tu nombre completo'/>
              </Form.Item>

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

              <Form.Item 
                label='Confirmación de contraseña' 
                name='passwordConfirm' 
                rules={[{
                  required: true,
                  message: 'Por favor confirma tu contraseña'
                }]}>
                <Input.Password size='large' placeholder='Ingresa de nuevo tu contraseña'/>
              </Form.Item>

              <Form.Item 
                label='Rol'
                name='role'
                rules={[{
                  required: true,
                  message: 'Por favor selecciona tu rol'
                }]}>
                <Select size='large' placeholder='Selecciona tu rol'>
                  <Select.Option value='Administrador'>Administrador</Select.Option>
                  <Select.Option value='Empleado'>Empleado</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item 
                label='Estado'
                name='active'
                rules={[{
                  required: true,
                  message: 'Por favor selecciona tu estado'
                }]}>
                <Select size='large' placeholder='Selecciona tu estado'>
                  <Select.Option value='1'>Activo</Select.Option>
                  <Select.Option value='0'>Inactivo</Select.Option>
                </Select>
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
                    {loading ? <Spin /> : 'Crear cuenta'}
                </Button>
              </Form.Item>

              <Form.Item>
                <Link to='/login'>
                  <Button size='large' className='btn'>
                  Iniciar sesión
                  </Button>
                </Link>
              </Form.Item>
              
          </Form>  
        </Flex>

        {/* Image */}
        <Flex flex={1}>
          <img src={registerImage} className='auth-image'></img>
        </Flex>
      </Flex>
    </Card>
  )
}

export default Register
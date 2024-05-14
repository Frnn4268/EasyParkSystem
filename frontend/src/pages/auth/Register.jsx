import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Flex, Typography, Form, Input, Button, Alert, Spin, Select, AutoComplete, FloatButton, Layout } from 'antd' 
import { HomeFilled, InfoCircleFilled, PhoneFilled } from '@ant-design/icons';

import '../../css/Auth.css'
import form_card from '../../assets/home/form_card2.png'
import registerImage from '../../assets/register_logo1.jpg'

import useSignup from '../../hooks/useSingup'

const backgroundStyle = {
  backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 3)), url(${form_card})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  position: 'relative',
  borderRadius: '100% 0 0 50%',
  width: '100%'
};

const Register = () => {
  const { loading, error, registerUser } = useSignup()

  const handleRegister = (values) => {
    registerUser(values)
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
      <Layout style={backgroundStyle}>
        <div className='register-container' >
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

                    <Flex className="login-container">
                      <Form.Item>
                        <Typography.Text>
                          ¿Ya tienes una cuenta?
                          <Link to='/login' style={{ margin: 5}}>
                            <Typography.Link>
                              Inicia sesión
                            </Typography.Link>
                          </Link>
                        </Typography.Text>
                      </Form.Item>
                    </Flex>
                </Form>  
              </Flex>

              {/* Image */}
              <Flex flex={1}>
                <img src={registerImage} className='auth-image'></img>
              </Flex>
            </Flex>
          </Card>
        </div>
      </Layout>
    </>
  )
}

export default Register
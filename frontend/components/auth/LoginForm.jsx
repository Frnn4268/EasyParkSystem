import React from 'react';
import { Form, Input, Button, Alert, Spin, AutoComplete, Typography, Flex } from 'antd';
import { Link } from 'react-router-dom';

const LoginForm = ({ handleLogin, handleSearch, options, loading, error }) => (
  <Form layout='vertical' onFinish={handleLogin} autoComplete='off'>
    <Form.Item
      label='Email'
      name='email'
      rules={[
        { required: true, message: 'Por favor ingresa tu email' },
        { type: 'email', message: 'Este no es un email válido' },
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
      rules={[{ required: true, message: 'Por favor ingresa tu contraseña' }]}
    >
      <Input.Password size='large' placeholder='Ingresa tu contraseña'/>
    </Form.Item>

    {error && (
      <Alert description={error} type='error' showIcon closable className='alert' />
    )}

    <Form.Item>
      <Button type={`${loading ? '' : 'primary'}`} htmlType='submit' size='large' className='btn'>
        {loading ? <Spin /> : 'Iniciar sesión'}
      </Button>
    </Form.Item>

    <Flex className="register-container">
      <Form.Item>
        <Typography.Text>
          ¿No tienes una cuenta?
          <Link to='/register' style={{ margin: 5 }}>
            <Typography.Link>Registrate</Typography.Link>
          </Link>
        </Typography.Text>
      </Form.Item>
    </Flex>
  </Form>
);

export default LoginForm;
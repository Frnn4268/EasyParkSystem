import React from 'react';
import { Form, Input, Button, Alert, Spin, Select, AutoComplete, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { Flex } from 'antd'; 

const RegisterForm = ({ handleRegister, handleSearch, options, loading, error }) => (
  <Form layout='vertical' onFinish={handleRegister} autoComplete='off'>
    <Form.Item
      label='Nombre completo'
      name='name'
      rules={[{ required: true, message: 'Por favor ingresa tu nombre' }]}
    >
      <Input size='large' placeholder='Ingresa tu nombre completo' />
    </Form.Item>

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
      <Input.Password size='large' placeholder='Ingresa tu contraseña' />
    </Form.Item>

    <Form.Item
      label='Confirmación de contraseña'
      name='passwordConfirm'
      rules={[{ required: true, message: 'Por favor confirma tu contraseña' }]}
    >
      <Input.Password size='large' placeholder='Ingresa de nuevo tu contraseña' />
    </Form.Item>

    <Form.Item
      label='Rol'
      name='role'
      rules={[{ required: true, message: 'Por favor selecciona tu rol' }]}
    >
      <Select size='large' placeholder='Selecciona tu rol'>
        <Select.Option value='Administrador'>Administrador</Select.Option>
        <Select.Option value='Empleado'>Empleado</Select.Option>
      </Select>
    </Form.Item>

    {error && (
      <Alert description={error} type='error' showIcon closable className='alert' />
    )}

    <Form.Item>
      <Button type={`${loading ? '' : 'primary'}`} htmlType='submit' size='large' className='btn'>
        {loading ? <Spin /> : 'Crear cuenta'}
      </Button>
    </Form.Item>

    <Flex className="login-container">
      <Form.Item>
        <Typography.Text>
          ¿Ya tienes una cuenta?
          <Link to='/login' style={{ margin: 5 }}>
            <Typography.Link>Inicia sesión</Typography.Link>
          </Link>
        </Typography.Text>
      </Form.Item>
    </Flex>
  </Form>
);

export default RegisterForm;
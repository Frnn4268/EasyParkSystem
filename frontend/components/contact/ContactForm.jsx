import React, { useState } from 'react';
import { Form, Input, AutoComplete, Button, message } from 'antd';
const { TextArea } = Input;

const ContactForm = ({ handleSubmit }) => {
  const [options, setOptions] = useState([]);

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
    <Form layout="vertical" onFinish={handleSubmit}>
      <Form.Item 
        label='Nombre completo' 
        name='name' 
        rules={[
          {
            required: true,
            message: 'Por favor ingresa tu nombre'
          }
        ]}
      >
        <Input size='large' placeholder='Ingresa tu nombre completo'/>
      </Form.Item>
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
          placeholder="Email"
          options={options}
        />
      </Form.Item>
      <Form.Item 
        label="Mensaje"
        name="message"
        rules={[
          { 
            required: true, 
            message: 'Por favor ingresa tu mensaje.' 
          }
        ]}
      >
        <TextArea placeholder="Tu mensaje" rows={5} />
      </Form.Item>
      <Form.Item>
        <Button type='primary' size='large' className='btn' htmlType="submit">
          Enviar
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ContactForm;
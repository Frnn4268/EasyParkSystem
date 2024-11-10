import React from 'react';
import { Drawer, Form, Input, Button } from 'antd';

const ContactDrawer = ({ drawerVisible, setDrawerVisible, form, onFinish }) => (
  <Drawer
    title="Editar contacto"
    width={500}
    onClose={() => setDrawerVisible(false)}
    visible={drawerVisible}
  >
    <Form form={form} onFinish={onFinish}>
      <Form.Item 
        label="Nombre" 
        name="name"
        rules={[{ required: true, message: '¡Por favor ingresa el nombre del contacto!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item 
        label="Email" 
        name="email"
        rules={[{ required: true, message: '¡Por favor ingresa el email del contacto!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item 
        label="Mensaje" 
        name="message"
        rules={[{ required: true, message: '¡Por favor ingresa el mensaje del contacto!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ textAlign: 'center' }}>Guardar cambios</Button>
      </Form.Item>
    </Form>
  </Drawer>
);

export default ContactDrawer;
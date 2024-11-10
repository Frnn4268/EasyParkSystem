import React from 'react';
import { Drawer, Form, Input, Button } from 'antd';

const CustomerDrawer = ({ drawerVisible, setDrawerVisible, form, onFinish }) => (
  <Drawer
    title="Editar cliente"
    width={500}
    onClose={() => setDrawerVisible(false)}
    visible={drawerVisible}
  >
    <Form form={form} onFinish={onFinish}>
      <Form.Item 
        label="Nombre" 
        name="firstname_owner"
        rules={[{ required: true, message: '¡Por favor ingrese el nombre del cliente!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item 
        label="Apellido" 
        name="lastname_owner"
        rules={[{ required: true, message: '¡Por favor ingrese el apellido del cliente!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item 
        label="Número de teléfono" 
        name="phone_number"
        rules={[{ required: true, message: '¡Por favor ingrese el número telefónico del cliente!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ textAlign: 'center' }}>Guardar cambios</Button>
      </Form.Item>
    </Form>
  </Drawer>
);

export default CustomerDrawer;
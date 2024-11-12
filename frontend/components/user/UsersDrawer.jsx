import React from 'react';
import { Drawer, Form, Input, Radio, Button } from 'antd';

const UsersDrawer = ({ drawerVisible, setDrawerVisible, form, onFinish, selectedRole, setSelectedRole }) => (
  <Drawer
    title="Editar usuario"
    width={500}
    onClose={() => setDrawerVisible(false)}
    visible={drawerVisible}
  >
    <Form form={form} onFinish={onFinish}>
      <Form.Item 
        label="Nombre" 
        name="name"
        rules={[
          {
            required: true,
            message: '¡Por favor ingrese el nombre del usuario!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item 
        label="Email" 
        name="email"
        rules={[
          {
            required: true,
            message: '¡Por favor ingrese el email del usuario!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item 
        label="Rol" 
        name="role"
      >
        <Radio.Group onChange={(e) => setSelectedRole(e.target.value)}>
          <Radio.Button value="Empleado">Empleado</Radio.Button>
          <Radio.Button value="Administrador">Administrador</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ textAlign: 'center' }}>Guardar cambios</Button>
      </Form.Item>
    </Form>
  </Drawer>
);

export default UsersDrawer;
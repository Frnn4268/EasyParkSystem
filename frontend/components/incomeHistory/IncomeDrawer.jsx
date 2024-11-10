import React from 'react';
import { Drawer, Form, Input, Button } from 'antd';

const IncomeDrawer = ({ drawerVisible, setDrawerVisible, form, onFinish }) => (
  <Drawer
    title="Editar historial de ingresos"
    width={500}
    onClose={() => setDrawerVisible(false)}
    visible={drawerVisible}
  >
    <Form form={form} onFinish={onFinish}>
      <Form.Item 
        label="Día" 
        name="day"
        rules={[{ required: true, message: '¡Por favor ingresa el día del ingreso!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item 
        label="Mes" 
        name="month"
        rules={[{ required: true, message: '¡Por favor ingresa el mes del ingreso!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item 
        label="Año" 
        name="year"
        rules={[{ required: true, message: '¡Por favor ingresa el año del ingreso!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item 
        label="Monto monetario" 
        name="income"
        rules={[{ required: true, message: '¡Por favor ingresa el monto del ingreso!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item 
        label="Fecha y hora" 
        name="hour_date"
        rules={[{ required: true, message: '¡Por favor ingresa la fecha y hora del ingreso!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ textAlign: 'center' }}>Guardar cambios</Button>
      </Form.Item>
    </Form>
  </Drawer>
);

export default IncomeDrawer;
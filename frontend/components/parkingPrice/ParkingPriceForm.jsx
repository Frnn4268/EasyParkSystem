import React from 'react';
import { Form, InputNumber, Button } from 'antd';

const ParkingPriceForm = ({ form, handleSubmit }) => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
    <Form layout="vertical" onFinish={handleSubmit} form={form} style={{ width: '100%', maxWidth: '400px' }}>
      <Form.Item 
        label='Precio:' 
        name='price' 
        rules={[{ required: true, message: 'Por favor ingresa el precio' }]}
        style={{ marginTop: 15, textAlign: 'center' }}
      >
        <InputNumber
          size='large'
          placeholder='Ingresa el precio'
          defaultValue={0}
          formatter={(value) => `Q ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          parser={(value) => value.replace(/\Q\s?|(,*)/g, '')} 
          style={{ width: '100%' }}
        />
      </Form.Item>
      <Form.Item 
        label='Tiempo:' 
        name='time_in_hours' 
        rules={[{ required: true, message: 'Por favor ingresa la cantidad en horas' }]}
        style={{ marginTop: 15, textAlign: 'center' }}
      >
        <InputNumber
          size='large'
          placeholder='Ingresa la cantidad en horas'
          defaultValue={0}
          formatter={value => `${value} horas`}
          parser={value => value.replace(' horas', '')}
          style={{ width: '100%' }}
        />
      </Form.Item>
      <Form.Item style={{ textAlign: 'center' }}>
        <Button type='primary' size='large' className='btn' htmlType="submit" style={{ width: '100%' }}>
          Guardar
        </Button>
      </Form.Item>
    </Form>
  </div>
);

export default ParkingPriceForm;
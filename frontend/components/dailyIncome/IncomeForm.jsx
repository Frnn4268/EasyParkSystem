import React from 'react';
import { Form, DatePicker, InputNumber, Button } from 'antd';

const IncomeForm = ({ form, handleSubmit, handleDateChange, income, setIncome, parseIncome }) => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
    <Form layout="vertical" onFinish={handleSubmit} form={form} style={{ width: '100%', maxWidth: '400px' }}>
      <Form.Item 
        label='Fecha de ingreso:' 
        name='date' 
        rules={[{ required: true, message: 'Por favor selecciona la fecha' }]}
        style={{ marginTop: 15 }}
      >
        <DatePicker 
          format="YYYY-MM-DD" 
          style={{ width: '100%' }}  
          placeholder='Selecciona la fecha'
          onChange={handleDateChange}
        />
      </Form.Item>
      <Form.Item 
        label='Monto:'
        name='income'
        rules={[{ required: true, message: 'Por favor ingresa el monto.' }]}
      >
        <InputNumber
          size='large'
          placeholder='Ingresa el monto'
          defaultValue={0}
          value={income} 
          formatter={(value) => `Q ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          parser={parseIncome} 
          onChange={setIncome} 
          style={{ width: '100%' }}
        />
      </Form.Item>
      <Form.Item>
        <Button type='primary' size='large' className='btn' htmlType="submit" style={{ width: '100%' }}>
          Guardar
        </Button>
      </Form.Item>
    </Form>
  </div>
);

export default IncomeForm;
import React from 'react';
import { Drawer, Form, Input, Select, Row, Col, Button } from 'antd';

const { Option } = Select;

const VehiclesDrawer = ({ drawerVisible, setDrawerVisible, form, onFinish }) => (
  <Drawer
    title="Editar vehículo"
    width={500}
    onClose={() => setDrawerVisible(false)}
    visible={drawerVisible}
  >
    <Form form={form} onFinish={onFinish}>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Placa"
            name="license_plate"
            rules={[
              {
                required: true,
                message: '¡Por favor ingresa el número de placa!',
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Tipo"
            name="type_plate"
            rules={[
              {
                required: true,
                message: '¡Por favor selecciona el tipo de placa!',
              },
            ]}
          >
            <Select>
              <Option value="P">Particulares (P)</Option>
              <Option value="M">Mercantiles (M)</Option>
              <Option value="C">Comerciales (C)</Option>
              <Option value="O">Oficiales (O)</Option>
              <Option value="CD">Cuerpo diplomático, organismos, misiones y funcionarios internacionales (CD)</Option>
              <Option value="De emergencia">De emergencia</Option>
              <Option value="De aprendizaje">De aprendizaje</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Form.Item
        label="Tipo de Vehículo"
        name="type"
        rules={[
          {
            required: true,
            message: '¡Por favor ingresa el tipo de vehículo!',
          },
        ]}
      >
        <Select>
          <Option value="SUV">SUV</Option>
          <Option value="Pickup">Pickup</Option>
          <Option value="Hatchback">Hatchback</Option>
          <Option value="Crossover">Crossover</Option>
          <Option value="Convertible">Convertible</Option>
          <Option value="Sedan">Sedan</Option>
          <Option value="Coupe">Coupe</Option>
          <Option value="Minivan">Minivan</Option>
          <Option value="Otro">Otro</Option>
        </Select>
      </Form.Item>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Marca"
            name="brand"
            rules={[
              {
                required: true,
                message: '¡Por favor ingresa la marca del vehículo!',
              },
            ]}
          >
            <Select>
              <Option value="Toyota">Toyota</Option>
              <Option value="Mitsubishi">Mitsubishi</Option>
              <Option value="Chevrolet">Chevrolet</Option>
              <Option value="Honda">Honda</Option>
              <Option value="Mazda">Mazda</Option>
              <Option value="Suzuki">Suzuki</Option>
              <Option value="Ford">Ford</Option>
              <Option value="KIA">KIA</Option>
              <Option value="Hyundai">Hyundai</Option>
              <Option value="Otro">Otro</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Color"
            name="color"
            rules={[
              {
                required: true,
                message: '¡Por favor ingresa el color del vehículo!',
              },
            ]}
          >
            <Select>
              <Option value="Rojo">Rojo</Option>
              <Option value="Azul">Azul</Option>
              <Option value="Negro">Negro</Option>
              <Option value="Blanco">Blanco</Option>
              <Option value="Verde">Verde</Option>
              <Option value="Amarillo">Amarillo</Option>
              <Option value="Otro">Otro</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ textAlign: 'center' }}>
          Guardar cambios
        </Button>
      </Form.Item>
    </Form>
  </Drawer>
);

export default VehiclesDrawer;
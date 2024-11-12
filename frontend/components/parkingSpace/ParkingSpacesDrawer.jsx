import React from 'react';
import { Drawer, Form, Input, Row, Col, Select, Button, Space, Typography, Divider, Tag } from 'antd';

const { Option } = Select;

const ParkingSpacesDrawer = ({
  openDrawer,
  onCloseDrawer,
  handleParkingEntry,
  form,
  buttonNumber,
  selectedParkingSpaceState
}) => (
  <Drawer
    title={`Espacio de parqueo ${buttonNumber}`}
    width={610}
    onClose={onCloseDrawer}
    visible={openDrawer}
    styles={{
      body: {
        paddingBottom: 80,
      },
    }}
    extra={
      <Space>
        <Button onClick={onCloseDrawer}>Cancelar</Button>
        <Button onClick={() => handleParkingEntry()} type="primary">Guardar</Button>
      </Space>
    }
  >
    <Form form={form} layout="vertical" hideRequiredMark>
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', height: '13%', flexDirection: 'column' }}>
        <div style={{ marginLeft: 'auto' }}>
          Estado del espacio de estacionamiento:  
          <Tag color={selectedParkingSpaceState === 'Ocupado' ? 'red' : 'green'}>
            {selectedParkingSpaceState}
          </Tag>
        </div>
      </div>
      <Typography.Title level={3}>
        Cliente
      </Typography.Title>
      <Divider />
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="firstname_owner"
            label="Nombre"
            rules={[
              {
                required: true,
                message: '¡Por favor ingrese el nombre del cliente!',
              },
            ]}
          >
            <Input placeholder="Nombre del cliente" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="lastname_owner"
            label="Apellido"
            rules={[
              {
                required: true,
                message: '¡Por favor ingrese el apellido del cliente!',
              },
            ]}
          >
            <Input placeholder="Apellido del cliente" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="phone_number"
            label="Número de teléfono"
            rules={[
              {
                required: true,
                message: '¡Por favor ingrese el número telefónico del cliente!',
              },
            ]}
          >
            <Input placeholder="Número de teléfono del cliente" />
          </Form.Item>
        </Col>
      </Row>
      <Typography.Title level={3}>
        Vehículo
      </Typography.Title>
      <Divider />
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item 
            label="Placa" 
            name="license_plate"
            rules={[
              {
                required: true,
                message: '¡Por favor ingresa el número de placa del vehículo!',
              },
            ]}
          >
            <Input placeholder="Número de placa del vehículo"/>
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
            <Select placeholder="Tipo de placa del vehículo">
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
      <Col span={12}>
        <Form.Item 
          label="Tipo de Vehículo" 
          name="type"
          rules={[
            {
              required: true,
              message: '¡Por favor selecciona el tipo de vehículo!',
            },
          ]}
        >
          <Select placeholder="Tipo de vehículo">
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
      </ Col>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item 
            label="Marca" 
            name="brand"
            rules={[
              {
                required: true,
                message: '¡Por favor selecciona la marca del vehículo!',
              },
            ]}
          >
            <Select placeholder="Marca del vehículo">
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
                message: '¡Por favor selecciona el color del vehículo!',
              },
            ]}
          >
            <Select placeholder="Color del vehículo">
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
    </Form>
  </Drawer>
);

export default ParkingSpacesDrawer;
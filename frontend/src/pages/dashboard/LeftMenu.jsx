import React, { useState } from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import {
  CarOutlined,
  UsergroupAddOutlined,
  PieChartOutlined,
  HomeOutlined,
  InfoCircleOutlined,
  PhoneOutlined,
  UserOutlined,
  AreaChartOutlined,
  HistoryOutlined,
  BarChartOutlined,
  DollarOutlined,
} from '@ant-design/icons';

function getItem(label, key, icon, children, type, link) {
  return {
    key,
    icon,
    children,
    label,
    type,
    link,
  };
}

const items = [
  getItem('Inicio', '1', <HomeOutlined />, null, null, '/dashboard'),
  getItem('Parqueo', '2', <PieChartOutlined />, null, null, '/park'),
  getItem(
    'Historial de Parqueo',
    '3',
    <HistoryOutlined />,
    null,
    null,
    '/parkhistory'
  ),
  getItem(
    'Estadísticas de Parqueo',
    '4',
    <BarChartOutlined />,
    null,
    null,
    '/parkingstatistics'
  ),
  getItem('Usuarios', '5', <UserOutlined />, null, null, '/users'),
  getItem('Clientes', 'sub2', <UsergroupAddOutlined />, [
    getItem('Ver Clientes', '6', null, null, null, '/customers'),
    getItem('Clientes frecuentes', '7', null, null, null, '/usual_customers'),
  ]),
  getItem('Vehículos', 'sub1', <CarOutlined />, [
    getItem('Ver Vehículos', '8', null, null, null, '/vehicles'),
    getItem(
      'Historial de Vehículos',
      '9',
      null,
      null,
      null,
      '/vehicleshistory'
    ),
  ]),
  getItem('Ingresos', 'sub3', <AreaChartOutlined />, [
    getItem('Ingresos diarios', '10', null, null, null, '/dailyincome'),
    getItem('Historial de Ingresos', '11', null, null, null, '/incomehistory'),
    getItem(
      'Estadísticas de Ingresos',
      '12',
      null,
      null,
      null,
      '/incomestatistics'
    ),
  ]),
  getItem(
    'Precio Estacionamiento',
    '13',
    <DollarOutlined />,
    null,
    null,
    '/module_parking_price'
  ),
  getItem(
    'Información',
    '14',
    <InfoCircleOutlined />,
    null,
    null,
    '/module_about'
  ),
  getItem('Contacto', '15', <PhoneOutlined />, null, null, '/module_contact'),
];

const LeftMenu = () => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className='left-menu-div'>
      <Menu
        defaultOpenKeys={items.map((item) => item.key)}
        mode='inline'
        theme='dark'
        inlineCollapsed={collapsed}
        style={{}}
        className='left-menu'
      >
        {items.map((item) =>
          item.children ? (
            <Menu.SubMenu key={item.key} icon={item.icon} title={item.label}>
              {item.children.map((subItem) => (
                <Menu.Item key={subItem.key} icon={subItem.icon}>
                  <Link to={subItem.link}>{subItem.label}</Link>
                </Menu.Item>
              ))}
            </Menu.SubMenu>
          ) : (
            <Menu.Item key={item.key} icon={item.icon}>
              <Link to={item.link}>{item.label}</Link>
            </Menu.Item>
          )
        )}
      </Menu>
    </div>
  );
};

export default LeftMenu;

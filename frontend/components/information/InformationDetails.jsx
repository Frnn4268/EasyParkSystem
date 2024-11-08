import React from 'react';
import { Descriptions } from 'antd';

const items = [
  {
    key: '1',
    label: 'Nombre',
    children: 'Restaurante y Pastelería Florencia',
  },
  {
    key: '2',
    label: 'Telefóno',
    children: '7922 4557',
  },
  {
    key: '3',
    label: 'Horario de atención',
    children: 'Lunes a Domingo: 7:00 A.M. - 9:00 P.M.',
  },
  {
    key: '4',
    label: 'Departamento',
    children: 'Jalapa, Jalapa',
  },
  {
    key: '5',
    label: 'Dirección',
    children: 'Avenida Chipilapa 1-72, Jalapa 21001',
  },
];

const InformationDetails = () => {
  return (
    <Descriptions title="Información sobre el lugar" items={items} />
  );
};

export default InformationDetails;
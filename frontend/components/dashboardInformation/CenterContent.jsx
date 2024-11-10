import React from 'react';
import { Divider } from 'antd';
import ProgressSteps from './ProgressSteps';

const CenterContent = () => (
  <div className='center-div-about-container'>
    <ProgressSteps
      current={1}
      items={[
        {
          title: 'EasyPark',
          description: 'Sistema de gestión de parqueo.',
        },
        {
          title: 'En Progreso...',
          description: 'Edición de perfil de usuario.',
        },
        {
          title: 'Esperando...',
          description: '...',
        },
      ]}
    />
    <Divider />
    <div className='bottom-div-about-container'>
      <ProgressSteps
        current={2}
        direction="vertical"
        items={[
          {
            title: 'Terminado.',
            description: 'Home, Login, Register, Información, Contacto',
          },
          {
            title: 'Terminado',
            description: 'Inicio, Parqueo, Historial de Parqueo, Usuarios, Clientes, Vehículos, Ingresos, Precio de Estacionamiento, Información, Contacto, QR de Cliente y obtención de Información, Estadísticas de Ingresos, Estadísticas de parqueo, Roles para usuarios',
          },
          {
            title: 'En Progreso',
            description: 'Perfil de Usuario',
          },
          {
            title: 'Esperando',
            description: '...',
          },
        ]}
      />
    </div>
  </div>
);

export default CenterContent;
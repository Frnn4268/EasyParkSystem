import React from 'react';
import { Typography } from 'antd';

const ContactHeader = () => {
  return (
    <>
      <Typography.Title level={3} strong className='title' style={{textAlign: 'center'}}>
        Contacto
      </Typography.Title>
      <Typography.Title level={5} strong className='title' style={{textAlign: 'center'}}>
        Contáctanos para obtener más información.
      </Typography.Title>
    </>
  );
};

export default ContactHeader;
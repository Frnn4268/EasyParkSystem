import React from 'react';
import { Typography } from 'antd';

const InformationHeader = () => {
  return (
    <>
      <Typography.Title level={3} strong className='title' style={{textAlign: 'center'}}>
        Información
      </Typography.Title>
    </>
  );
};

export default InformationHeader;
import React from 'react';
import { Link } from 'react-router-dom';
import { FloatButton } from 'antd';
import { HomeFilled, InfoCircleFilled, PhoneFilled } from '@ant-design/icons';

const FloatingButtons = () => (
  <div className='float-button'>
    <FloatButton.Group shape="square" style={{ marginRight: 20 }} >
      <Link to="/">
        <FloatButton className='float-button-color' style={{marginBottom: 20}} icon={<HomeFilled />} />
      </Link>
      <Link to="/about">  
        <FloatButton className='float-button-color' style={{marginBottom: 20}} icon={<InfoCircleFilled />} />
      </Link>
      <Link to="/contact">  
        <FloatButton className='float-button-color' icon={<PhoneFilled />} />
      </Link>
    </FloatButton.Group>
  </div>
);

export default FloatingButtons;
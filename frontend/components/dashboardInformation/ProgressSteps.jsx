import React from 'react';
import { Steps } from 'antd';

const ProgressSteps = ({ current, items, direction = 'horizontal' }) => (
  <Steps
    progressDot
    current={current}
    direction={direction}
    items={items}
  />
);

export default ProgressSteps;
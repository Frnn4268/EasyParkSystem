import React from 'react';
import { Button, ConfigProvider } from 'antd';

const buttonWidth = 60;
const buttonHeight = 120;

const ParkingSpacesButtons = ({ handleParkingSpaceClick, getButtonColor }) => (
  <ConfigProvider
    button={{
      style: {
        width: buttonWidth,
        height: buttonHeight,
        margin: 6,
      },
    }}
  >
    <div className="park-spaces-container">
      <div
        style={{
          marginInlineStart: buttonWidth,
        }}
      >
        {[...Array(14)].map((_, index) => (
          <Button 
            key={index}
            onClick={() => handleParkingSpaceClick(index + 6)}
            style={{ 
              backgroundColor: getButtonColor(index + 6), 
              color: 'white',
              fontWeight: 'bold',
              borderColor: 'white'
            }}
          >
            {index + 6}
          </Button>
        ))}
      </div>
      <div
        style={{
          marginInlineStart: buttonWidth * -5,
        }}
      >
        {[...Array(5)].map((_, index) => (
          <Button 
            key={index}
            onClick={() => handleParkingSpaceClick(index + 1)}
            style={{ 
              backgroundColor: getButtonColor(index + 1), 
              color: 'white',
              fontWeight: 'bold',
              borderColor: 'white'
            }}
          >
            {index + 1}
          </Button>
        ))}
      </div>
    </div>
  </ConfigProvider>
);

export default ParkingSpacesButtons;
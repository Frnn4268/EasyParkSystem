import React from 'react';
import { Card } from 'antd';

const { Meta } = Card;

const FeatureCard = ({ title, description, image }) => {
  const cardStyle = { 
    width: 500,
    height: 'auto', 
    borderRadius: "20px", 
    margin: '50px auto',
    overflow: 'hidden',
  };

  return (
    <Card
      hoverable
      style={cardStyle}
      cover={<img alt="example" src={image} />}
    >
      <Meta title={title} description=" " />
      {description}
    </Card>
  );
};

export default FeatureCard;
import React from 'react';
import { Layout, Card } from 'antd';
import MainMenu from '../home/MainMenu.jsx';
import InformationHeader from './InformationHeader.jsx';
import InformationDetails from './InformationDetails.jsx';
import MapComponent from './MapComponent.jsx';

const { Header, Content } = Layout;

const backgroundStyle = {
  backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1.5)), url('https://i.postimg.cc/3wBGn5Jc/form-card1.png')`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  position: 'relative',
  borderRadius: '0 100% 25% 15%'
};

const InformationLayout = () => {
  return (
    <Layout className="layout" style={backgroundStyle}>    
      <Header className='home-header'> 
        <MainMenu />
      </Header>
      <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Card className="home-block-section-information">
          <InformationHeader />
          <InformationDetails />
          <MapComponent />
        </Card>   
      </Content>
    </Layout>
  );
};

export default InformationLayout;
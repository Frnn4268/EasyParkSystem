import React from 'react';
import { Layout, Card, Row, Col } from 'antd';
import MainMenu from '../../components/home/MainMenu.jsx';
import ContactHeader from './ContactHeader.jsx';
import ContactForm from './ContactForm.jsx';

const { Header, Content } = Layout;

const backgroundStyle = {
  backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1.5)), url('https://i.postimg.cc/3wBGn5Jc/form-card1.png')`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  position: 'relative',
  borderRadius: '0 100% 25% 15%'
};

const ContactLayout = ({ handleSubmit, contextHolder }) => {
  return (
    <Layout className="layout" style={backgroundStyle}>    
      <Header className='home-header'> 
        <MainMenu />
      </Header>
      <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Card className="home-block-section-contact">
          <ContactHeader />
          <Row justify="space-around">
            <Col xs={22} sm={18} md={16} lg={8}>
              <ContactForm handleSubmit={handleSubmit} />
            </Col>
          </Row>
        </Card>
      </Content>
      {contextHolder}
    </Layout>
  );
};

export default ContactLayout;
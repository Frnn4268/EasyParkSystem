import { Carousel } from 'antd';

const contentStyle = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

const MyCarousel = () => {
  return (
    <Carousel autoplay autoplaySpeed={5000} className='home-carousel'>
      <div>
        <h3 style={contentStyle}>Información 1</h3>
        <p style={{ textAlign: 'center' }}>Detalles sobre el tema 1</p>
      </div>
      <div>
        <h3 style={contentStyle}>Información 2</h3>
        <p style={{ textAlign: 'center' }}>Detalles sobre el tema 2</p>
      </div>
      <div>
        <h3 style={contentStyle}>Información 3</h3>
        <p style={{ textAlign: 'center' }}>Detalles sobre el tema 3</p>
      </div>
      <div>
        <h3 style={contentStyle}>Información 4</h3>
        <p style={{ textAlign: 'center' }}>Detalles sobre el tema 4</p>
      </div>
    </Carousel>
  );
};

export default MyCarousel;

import { Carousel } from 'antd';
import '../../css/Home.css';

const contentStyle = {
  height: '110px',
  color: '#fff',
  lineHeight: '110px',
  textAlign: 'center',
  background: '#364d79',
};

const HomeCarousel = () => {
  return (
    <Carousel autoplay autoplaySpeed={5000} className='home-carousel'>
      <div>
        <h3 style={contentStyle}>
          Gestión de Estacionamiento Eficiente
        </h3>
        <p style={{ textAlign: 'center', fontSize: '14px' }}>
          Optimiza el tiempo de búsqueda de estacionamiento para empleados y clientes.
        </p>
      </div>
      <div>
        <h3 style={contentStyle}>
          Control de Tiempo y Costo en Tiempo Real
        </h3>
        <p style={{ textAlign: 'center', fontSize: '14px' }}>
          Visualiza el tiempo estacionado y el costo aproximado en tiempo real.
        </p>
      </div>
      <div>
        <h3 style={contentStyle}>
          Gestión Integral de Usuarios y Vehículos
        </h3>
        <p style={{ textAlign: 'center', fontSize: '14px' }}>
          Sistema para gestionar usuarios y vehículos de forma sencilla y rápida.
        </p>
      </div>
      <div>
        <h3 style={contentStyle}>
          Estadísticas y Reportes de Ingresos y Espacios Disponibles
        </h3>
        <p style={{ textAlign: 'center', fontSize: '14px' }}>
          Consulta estadísticas de ocupación y reportes de ingresos diarios.
        </p>
      </div>
    </Carousel>
  );
};

export default HomeCarousel;
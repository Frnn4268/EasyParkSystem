import React, {useLayoutEffect, useRef} from 'react'
import { Descriptions, Layout, Card, Typography } from 'antd';
import { Map, Marker, NavigationControl } from 'mapbox-gl';

import MainMenu from './MainMenu'; 

import '../../css/Home.css';

const { Header, Content } = Layout;

const backgroundStyle = {
    backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1.5)), url('https://i.postimg.cc/3wBGn5Jc/form-card1.png')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
    borderRadius: '0 100% 25% 15%'
  };

const items = [
    {
        key: '1',
        label: 'Nombre',
        children: 'Restaurante y Pastelería Florencia',
    },
    {
        key: '2',
        label: 'Telefóno',
        children: '7922 4557',
    },
    {
        key: '3',
        label: 'Horario de atención',
        children: 'Lunes a Domingo: 7:00 A.M. - 9:00 P.M.',
    },
    {
        key: '4',
        label: 'Departamento',
        children: 'Jalapa, Jalapa',
    },
    {
        key: '5',
        label: 'Dirección',
        children: 'Avenida Chipilapa 1-72, Jalapa 21001',
    },
  ];
  
const Information = () => {
    
    const mapDiv = useRef(null)

    useLayoutEffect(() => {
        const map = new Map({
            container: mapDiv.current , // container ID
            style: 'mapbox://styles/mapbox/streets-v12', // style URL
            center: [-89.98599, 14.63415], // starting position [lng, lat]
            zoom: 18, // starting zoom
        });

        // Marker
        new Marker()
            .setLngLat([-89.98599, 14.63415])
            .addTo(map);

        // Personaliza el estilo del mapa
        map.on('load', () => {
            map.addLayer({
                id: 'example',
                type: 'circle',
                source: {
                    type: 'geojson',
                    data: {
                        type: 'FeatureCollection',
                        features: [{
                            type: 'Feature',
                            properties: {},
                            geometry: {
                                type: 'Point',
                                coordinates: [-89.98599, 14.63415]
                            }
                        }]
                    }
                },
                paint: {
                    'circle-radius': 4,
                    'circle-color': '#007cbf'
                }
            });
        });

        // Adding navigation control
        map.addControl(new NavigationControl());
    })

    return (
        <>
            <Layout className="layout" style={backgroundStyle}>    
                <Header className='home-header'> 
                    <MainMenu />
                </Header>
                <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Card className="home-block-section-information">
                        <Typography.Title level={3} strong className='title' style={{textAlign: 'center'}}>
                            Información
                        </Typography.Title>
                        <Descriptions title="Información sobre el lugar" items={items} />;
                        <div ref={mapDiv}
                            style={{
                                height: '400px',
                                width: 'auto',
                                position: 'sticky',
                                top: 0,
                                left: 0, 
                                borderRadius: 15,
                            }}
                        />
                    </Card>   
                </Content>
            </Layout>
        </>
    )
}

export default Information;
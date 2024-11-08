import React, { useLayoutEffect, useRef } from 'react';
import { Map, Marker, NavigationControl } from 'mapbox-gl';

const MapComponent = () => {
  const mapDiv = useRef(null);

  useLayoutEffect(() => {
    const map = new Map({
      container: mapDiv.current, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-89.98599, 14.63415], // starting position [lng, lat]
      zoom: 18, // starting zoom
    });

    // Marker
    new Marker()
      .setLngLat([-89.98599, 14.63415])
      .addTo(map);

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
  }, []);

  return (
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
  );
};

export default MapComponent;
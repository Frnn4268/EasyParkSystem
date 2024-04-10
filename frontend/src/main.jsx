import React from 'react'
import ReactDOM from 'react-dom/client'

import mapboxgl from 'mapbox-gl'; 
mapboxgl.accessToken = 'pk.eyJ1IjoiZnJubiIsImEiOiJjbHV0MGJjaWgwMTc4Mm1vMDY0Z3ZnNHRuIn0.J-snju_pNPKITA45wu4sXQ';

import App from './App.jsx'
import { AuthProvider } from '../src/contexts/AuthContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
) 

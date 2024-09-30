import React from 'react'
import ReactDOM from 'react-dom/client'

import mapboxgl from 'mapbox-gl'; // Adding Mapbox
mapboxgl.accessToken = import.meta.env.VITE_APP_MAPBOX_URL;

import App from './App.jsx'
import { AuthProvider } from '../src/contexts/AuthContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
) 

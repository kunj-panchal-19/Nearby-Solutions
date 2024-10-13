import React from 'react';
import { MapContainer, TileLayer, Polyline } from 'react-leaflet';



const MapComponent = (routeData) => {
  const routeCoordinates=routeData.routeData.route.geometry.coordinates;
  console.log(routeCoordinates.length/2)
  return (
    <MapContainer className='h-1/3 w-2/3' center={routeCoordinates[parseInt(routeCoordinates.length/2)]} zoom={15} style={{ height: '500px' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Polyline positions={routeCoordinates} color="blue" weight={5} />
    </MapContainer>
  );
};

export default MapComponent;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const SERVICE = 'http://localhost:8875/buildings';

function App() {
  const [buildings, setBuildings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(SERVICE)
      .then((response) => {
        setBuildings(response.data.points);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  return (
    <div id='mapid'>
      {isLoading && <p>Loading buildings...</p>}
      <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        {buildings.slice(0, 10).map((building, index) => {
          return (
            <Marker
              key={index}
              position={building.geometry.coordinates.reverse()}
            >
              A pretty CSS3 popup. <br /> Easily customizable.
            </Marker>
          );
        })}
        <Marker position={[51.505, -0.09]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default App;

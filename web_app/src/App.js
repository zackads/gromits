import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const CENTRE = '@51.4663,-2.6012';
const SERVICE = 'http://localhost:8875/buildings/' + CENTRE;

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
  }, []);

  return (
    <div id='mapid'>
      {isLoading && <p>Loading buildings...</p>}
      <MapContainer
        center={[51.4663, -2.6012]}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        {buildings.map((building, index) => {
          return (
            <Marker key={index} position={building.geometry.coordinates}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          );
        })}
        <Marker position={[51.46283, -2.59553]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default App;

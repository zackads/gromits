import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const SERVICE = 'http://localhost:8875/buildings';
// process.env.BUILDINGS_HOSTNAME + ':' + process.env.BUILDINGS_PORT;

function App() {
  axios
    .get(SERVICE)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });

  return (
    <div id='mapid'>
      <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
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

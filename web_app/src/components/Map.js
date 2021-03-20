import React, { Component } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

export default class Map extends Component {
  state = {
    center: this.props.center,
    zoom: 16,
  };
  render() {
    return this.props.buildings ? (
      <MapContainer
        center={this.state.center}
        zoom={this.state.zoom}
        style={{ width: '100%', height: '900px' }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        {this.props.buildings.map((building, i) => {
          const [lat, long] = building.geometry.coordinates.reverse();
          return <Marker position={[lat, long]} key={i}></Marker>;
        })}
        <Marker position={[51.4573, -2.59882]}></Marker>
      </MapContainer>
    ) : (
      'Data is loading'
    );
  }
}

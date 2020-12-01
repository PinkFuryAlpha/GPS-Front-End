import React, {Component} from "react";
import { Container} from 'react-bootstrap';
import {Map, InfoWindow, Marker, GoogleApiWrapper, Polyline} from 'google-maps-react';
 



export class MapsV2 extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      activeMarker: {},
      selectedPlace: {},
      showingInfoWindow: false,
      drawPath: []
    };

    this.onMarkerClick= this.onMarkerClick.bind(this);
    this.onInfoWindowClose=this.onInfoWindowClose.bind(this);
    this.onMapClicked=this.onMapClicked.bind(this);
  }


 

  onMarkerClick (props, marker){
    this.setState({
      activeMarker: marker,
      selectedPlace: props,
      showingInfoWindow: true,
    })};

  onInfoWindowClose() {
    this.setState({
      activeMarker: null,
      showingInfoWindow: false
    })};

  onMapClicked (){
    if (this.state.showingInfoWindow)
      this.setState({
        activeMarker: null,
        showingInfoWindow: false
      });
  };


  render() {
    if (!this.props.loaded) return <div>Loading...</div>;

    return (
      <Map
        id="MyMap"
        className="map"
        google={this.props.google}
        onClick={this.onMapClicked}
        style={{ height: "100%", position: "relative", width: "100%" }}
        zoom={4}
      >
          {this.props.locations.map((location, index) =>{
            return(
                  <Marker
                  key={index}
                  latitude={location.latitude}
                  longitude={location.longitude}
                  date={location.date}
                  onClick={this.onMarkerClick}
                  position={{ lat: location.latitude, lng: location.longitude }}
                >
                </Marker>
            );
          })}
          <Polyline 
                path={this.props.coordinates} 
                options={{ 
                strokeColor: '#00ffff',
                strokeOpacity: 1,
                strokeWeight: 2,
                icons: [{ 
                icon: "hello",
                offset: '0',
                repeat: '10px'
              }],
              }}
            />  
        <InfoWindow
          marker={this.state.activeMarker}
          onClose={this.onInfoWindowClose}
          visible={this.state.showingInfoWindow}
        >
          <Container>
            <p>Latitude: {this.state.selectedPlace.latitude}</p>
            <p>Longitude: {this.state.selectedPlace.longitude}</p>
            <p>On: {this.state.selectedPlace.date}</p>
          </Container>
        </InfoWindow>
      </Map>
    );
  }
}

MapsV2.defaultProps ={
  locations: {
    latitude: 43.6,
    longitude: 45.6
  }
}
 
export default GoogleApiWrapper({
  apiKey: "AIzaSyBYCv_zi2xhk8J1ebeXRS1T-ULqE3WqCGk"
})(MapsV2)
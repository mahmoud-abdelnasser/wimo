import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
 

const style = {
  width: '100',
  height: '100'
}


export class MapContainer extends Component {

  getLatLang = (data , kind) => {
    let allData = {};
    const i = data.indexOf(', '),
          lat = data.slice(0, i).trim(),
          lang = data.slice(i + 1, data.length).trim();

    let result = Object.assign({lat:lat , lang:lang} , allData )
    if(kind === 'lat'){
      return result.lat
    }else{
      return result.lang
    }
     
  }
  

  onMouseoverMarker(props, marker, e) {
    console.log(props)
  }

  render() {
    const { from , to} =this.props.location.state;
    let fromData = from.toString();
    let toData = to.toString();
  
    return (
      <Map
        google={this.props.google}
        zoom={12}
        style={style}
        initialCenter={{
          lat: this.getLatLang(fromData , 'lat'),
          lng: this.getLatLang(fromData , 'lang'),
        }}
        >
        <Marker
          title={'from'}
          name={'SOMA'}
          onMouseover={this.onMouseoverMarker}
          icon={{
            url: "/images/from.png",
          }}
          position={{
            lat: this.getLatLang(fromData , 'lat'),
            lng: this.getLatLang(fromData , 'lang')
          }} />
        <Marker
          title={'to'}
          name={'to'}
          onMouseover={this.onMouseoverMarker}
          icon={{
            url: "/images/to.png",
          }}
          position={{
            lat: this.getLatLang(toData , 'lat'), 
            lng: this.getLatLang(toData , 'lang')
          }} />
        <Marker />    
      </Map>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: ("AIzaSyB10DO0bNfL0uKDDDyPlJj9qcAqZIZBi5U")
})(MapContainer)
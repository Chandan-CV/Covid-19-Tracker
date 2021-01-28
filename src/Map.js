
import React, { useEffect, useState } from 'react'
import "./Map.css"
import {MapContainer, TileLayer, Popup,Circle } from 'react-leaflet'
import { ShowDataOnMap } from './util';







function Map({countries,center,zoom ,casesType}) {



  const[map,setmap]=useState(null);
  
    if(map)
    {
      map.flyTo(center);
     }
  return (
     
      <div>
      <div className="map" id="map">
      <MapContainer  center={center} zoom={zoom} whenCreated={setmap} maxZoom={8}  >
      
      <TileLayer
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
       />
    {(countries)?ShowDataOnMap(countries,casesType):null}
    
    
       </MapContainer>
      </div>
      
      </div>
     
    
      
      
      )
    }

export default Map






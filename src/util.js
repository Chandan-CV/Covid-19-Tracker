import { Popup,Circle } from 'react-leaflet'
import numeral from "numeral"
import "./util.css"
export const sortData = (data)=>{
    const sortedData =[...data];
    sortedData.sort((a,b)=> a.cases>b.cases? -1:1)
    return sortedData;
}

const casesTypeColors = {
    cases: {
      multiplier: 800,
      option: { color:"#cc1034", fillColor: "#cc1034" },
    },
    recovered: {
      multiplier: 1200,
      option: { color:"#7dd71d", fillColor: "#7dd71d" },
    },
    deaths: {
      multiplier: 2000,
      option: { color:"#ff6c47", fillColor: "#ff6c47" }
    },
  };
export const ShowDataOnMap =(data, casesType ="cases")=>
data.map(country=>(
    <Circle
    center={[country.countryInfo.lat, country.countryInfo.long]}
    fillOpacity={0.4}
    pathOptions={casesTypeColors[casesType].option}
    radius={
      Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
    }
  >
<Popup  >
<div className="info-container">

<img 
src= {country.countryInfo.flag}
className="flag123"
/>
  
<div className="info-name">{country.country}</div>
  
  <div className="info-confirmed">
    Cases: {numeral(country.cases).format("0,0")}
  </div>
 
  <div className="info-recovered">
    Recovered: {numeral(country.recovered).format("0,0")}
  </div>
 
  <div className="info-deaths">
    Deaths: {numeral(country.deaths).format("0,0")}
  </div>
</div>
</Popup>
</Circle>
   )) 





import React, { useEffect, useState } from "react";
import "./App.css";
import {
  Card,
  CardContent,
  FormControl,
  MenuItem,
  Select,
} from "@material-ui/core";
import InfoBox from "./InfoBox";
import Map from "./Map";
import Table from "./Table";
import { sortData } from "./util";
import LineGraph from "./LineGraph";
import "leaflet/dist/leaflet.css";
import numeral from "numeral";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [tableData, setTableData] = useState([]);
  const [countryInfo, setCountryInfo] = useState({});
  const [mapCenter, setMapCenter] = useState([20, 77]);
  const [mapZoom, setmapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState();
  const [casesType, setCasesType] = useState("cases");

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const con = data.map((country) => ({
            name: country.country,
            id: country.countryInfo.iso2,
            flag: country.countryInfo.flag,
          }));
          const SortedData = sortData(data);
          setTableData(SortedData);
          setMapCountries(data);
          setCountries(con);
        });

      await fetch("https://disease.sh/v3/covid-19/all")
        .then((response) => response.json())
        .then((data) => {
          setCountryInfo(data);
        });
    };
    getCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    const countrycode = event.target.value;

    const url =
      countrycode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countrycode}`;

    await fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((dat) => {
        setCountry(countrycode);
        setCountryInfo(dat);
        if (countrycode !== "worldwide") {
          setMapCenter([dat.countryInfo.lat, dat.countryInfo.long]);
          setmapZoom(4);
        }
      });

    //https://disease.sh/v3/covid-19/all
    //https://disease.sh/v3/covid-19/countries/[CountryCode]
  };

  const formatter = new Intl.NumberFormat("en");
  const prettyShow = (number) => {
  return `+${numeral(number).format("0.0a")}`
  };
  return (
    <div className="App">
      <div className="appLeft">
        <div className="header">
          <h1>Covid 19 Tracker</h1>
          <FormControl>
            <Select
              variant="outlined"
              value={country}
              onChange={onCountryChange}
              className="form"
            >
              <MenuItem value="worldwide">worldwide</MenuItem>
              {countries.map((country) => {
                return (
                  <MenuItem value={country.id}>
                    <div className="countryOptions">
                      {country.name}
                      <img src={country.flag} className="flag" />{" "}
                    </div>
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>

        <div className="cardsDiv">
          <InfoBox
          isRed={true}
          active={casesType==="cases"}
            title="Active Cases"
            total={prettyShow(countryInfo.cases)}
            cases={prettyShow(countryInfo.todayCases)}
            onClick={() => {
              setCasesType("cases");
            }}
            
          />
          <InfoBox
          active={casesType==="recovered"}
            title="Recovered Cases"
            total={prettyShow(countryInfo.recovered)}
            cases={prettyShow(countryInfo.todayRecovered)}
            onClick={() => {
              setCasesType("recovered");
            }}
            
          />
          <InfoBox
          isRed={true}
          active={casesType==="deaths"}
            title="Deaths"
            total={prettyShow(countryInfo.deaths)}
            cases={prettyShow(countryInfo.todayDeaths)}
            onClick={() => {
              setCasesType("deaths");
            }}
          
          />
        </div>

        {/* table */}
        {/* graph */}

        {/* Map */}

        <div>
          <Map
            center={mapCenter}
            zoom={mapZoom}
            countries={mapCountries}
            casesType={casesType}
          />
        </div>
      </div>
      <Card className="appRight">
        <h3><strong> Live cases by country</strong></h3>
        <Table countries={tableData} />
        <h3>Worldwide new {casesType}</h3>
        <LineGraph casestype={casesType} />
      </Card>
    </div>
  );
}

export default App;

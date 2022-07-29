import './App.css';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import React, { useEffect, useState } from 'react';


/*Component that renders the Graph,
props are the code_station of the station sent by the handleClick function in App component */
function Graph(props) {
  const [array, setArray] = useState([]); // state to store data of one station
  const url = "https://hubeau.eaufrance.fr/api/v1/temperature/chronique?code_station=" + props.code_station + "&date_debut_mesure=2000-01-01";
  
  
  const getTemp = async () => {
    const response = await fetch(url);
    const jsonData = await response.json();
    console.log(jsonData);
    console.log(jsonData.data[(jsonData.data.length - 4)/ 2]);
    setArray(jsonData);
  }


  // array of data to be displayed in the graph
  const data = (array.data) ? [
    {
      date: array.data[0].date_mesure_temp,
      temperature_en_Celsius: array.data[0].resultat,
    },
    {
      date: array.data[array.data.length / 2].date_mesure_temp,
      temperature_en_Celsius: array.data[array.data.length / 2].resultat,
    },
    {
      date: array.data[array.data.length - 1].date_mesure_temp,
      temperature_en_Celsius: array.data[array.data.length - 1].resultat,
    }
  ] : [];
  
  return (
      <div className="Graph">
        
        {/* call getTemp function on click to fetch data */}
        <button id="reload" onClick={() => getTemp()}>Load graph</button>
        {array.data ? <h1>
            {array.data[0].libelle_station}
        </h1> : <h1>waiting...</h1>}

        {/* if data is loaded, render the graph */ }
        {array.data ? <LineChart
          width={800}
          height={500}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="temperature_en_Celsius" stroke="#82ca9d" />
        </LineChart> : ''}
      </div>
  );
}


function App() {

  const [array, setArray] = useState([]); // state to store list of all stations
  const url = 'https://hubeau.eaufrance.fr/api/v1/temperature/station';

  const [code, setCode] = useState(''); // state that stores the code_station

  useEffect(() => {
    const getAllList = async () => {
      const response = await fetch(url);
      const jsonData = await response.json();
      setArray(jsonData);
    }
    getAllList();
  }, []);

  return (
    <div className="App">
      <h1 id="Titre">
        Temperature des cours d'eau
      </h1>
      <h1>
        <br></br>
        Step 1 : Select a station <br></br>
        Step 2 : Click on the "Load graph" button to load the data
      </h1>
      <div className="StationsAndGraph">
        <div className="ListStations">
          <h1>Liste des stations</h1>
          <div className="Stations">
            {array.data ? "" : <h1>Fetching data...</h1>}

            {/* loops on the array of stations and displays them */}
            {array.data?.map((data, idx) => (
            <h3 key={idx} className="Station" onClick={() => setCode(data.code_station)}>{data.libelle_station}, {data.libelle_region}</h3>
            ))}
          </div>
        </div>
        <Graph code_station={code}/>
      </div>
    </div>
  );
}

export default App;

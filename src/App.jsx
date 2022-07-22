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

function Graph(props) {
  const [array, setArray] = useState([]);
  // const [url, setUrl] = useState('https://hubeau.eaufrance.fr/api/v1/temperature/chronique?code_station=');
  const url = "https://hubeau.eaufrance.fr/api/v1/temperature/chronique?code_station=" + props.code_station + "&size=1&exact_count=true&format=json&pretty";
  // console.log(props);
  // setUrl(url + props.code_station + '&size=1')
  // console.log(props);
  // useEffect(() => {
  const getTemp = async () => {
    const response = await fetch(url);
    const jsonData = await response.json();
    console.log(jsonData);
    setArray(jsonData);
    // console.log(array.count);
  }
  // getTemp();
  // }, []);

  // console.log(array.count);
  // if (!array.data) return <h1 onClick={() => getTemp()}>loading...</h1>;
  return (
      <div className="Graph">
        <button onClick={() => {console.log('super'); getTemp()}}>Afficher temperatures</button>
        {array.data ? <h1>
          {array.data[0].libelle_station} {array.data[0].resultat} {array.data[0].symbole_unite}
        </h1> : <h1>loading...</h1>}
        {array.data ? <LineChart
          width={800}
          height={500}
          data={{date: "Test",
              temperature: array.data.resultat,
              // pv: 4300,
              amt: 2100
            }}
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
          {/* <Line
            type="monotone"
            dataKey="pv"
            stroke="#8284d8"
            activeDot={{ r: 8 }}
          /> */}
          <Line type="monotone" dataKey="temperature" stroke="#82ca9d" />
        </LineChart> : <h1>loading...</h1>}
      </div>
  );
}


function App() {

  const [array, setArray] = useState([]);
  // const url = 'https://hubeau.eaufrance.fr/api/v1/temperature/station?&size=5&exact_count=true&format=json&pretty';
  const url = 'https://hubeau.eaufrance.fr/api/v1/temperature/station';
  // let waiting = "";

  // useEffect(() => {
  //   const fetchData = async () => { 
  //       try {
  //         let data = await axios.get('https://hubeau.eaufrance.fr/api/v1/temperature/station?&size=10&exact_count=true&format=json&pretty');
  //         data = data.data.data;
  //         // console.log(data);
  //         setTestArray(data);
  //         for(let i = 0; i < testArray.length; i++){
  //           results.push(testArray[i].libelle_station);
  //           // console.log(testArray[i].libelle_station)
  //         }
  //         console.log(testArray);
  //         // console.log(results)
  //       }
  //       catch(err) {console.log(err);}
  //     }
  //     fetchData();
  //     return () => {
  //       // console.log('cleanup');
  //     } // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, []);

  //   if (results.length < 3) {
  //     waiting = <h1>Loading...</h1>
  //   }

  // const forceUpdate = () => {
  //   console.log('super');
  //   setTestArray(testArray);
  // };

  // let results = [];

  const [isShown, setIsShown] = useState(true);
  const [code, setCode] = useState('');

  const handleClick = (props) => {
    // 👇️ toggle shown state
    setIsShown(true);
    setCode(props);
    // console.log('tronchiz');
    // console.log(props);
    // console.log(code);
    // 👇️ or simply set it to true
    // setIsShown(true);

  };

  useEffect(() => {
    const getAllList = async () => {
      const response = await fetch(url);
      const jsonData = await response.json();
      // console.log(jsonData);
      setArray(jsonData);
      // console.log(array);
    }
    getAllList();
  }, []);

  return (
    <div className="App">
      <h1 id="Titre">
        Temperature des cours d'eau
      </h1>
      <div className="StationsAndGraph">
        <div className="ListStations">
          <h1>Liste des stations</h1>
          <div className="Stations">
            {array.data ? "" : <h1>Fetching data...</h1>}
            {array.data?.map((data, idx) => (
            <h3 key={idx} className="Station" onClick={() => handleClick(data.code_station)}>{data.libelle_station}, {data.libelle_region}</h3>
            ))}
          </div>
        </div>
        {/* <div className="Graph">
          {isShown && <Graph code={array.data[0].code_station}/>}
        </div> */}
        {isShown && <Graph code_station={code}/>}
      </div>
    </div>
  );
  


  // const [myArray, updateMyArray] = useState([]);

  //   const onClick = () => {
  //       updateMyArray( arr => [...arr, `${arr.length}`]);
  //   };
  //   return [
  //       <input type="button" onClick={ onClick } value="Update" />,

  //       <div>
  //         {myArray.map(e =>
  //         <div>
  //           {e}
  //         </div>
  //       )}
  //       </div>
  //   ];
}

export default App;


// export default function App() {
//   const people = [
//     { name: "name 1", age: "age 1" },
//     { name: "name 2", age: "age 2" },
//     { name: "name 3", age: "age 3" },
//     { name: "name 4", age: "age 4" },
//     { name: "name 5", age: "age 5" },
//     { name: "name 6", age: "age 6" },
//     { name: "name 7", age: "age 7" },
//     { name: "name 8", age: "age 8" },
//   ];
//   return (
//     <div className="App">
//       <h2>Json Array Object </h2>
//       {people.map((data, idx) => (
//         <p >{data.age}</p>
//       ))}
//     </div>
//   );
// }

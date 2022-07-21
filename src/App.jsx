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

// // function Display(props) {
// //   console.log(props);
// // }

function Graph() {
  const [array, setArray] = useState([]);
  const code = "10615120"
  const url = 'https://hubeau.eaufrance.fr/api/v1/temperature/chronique?code_station=' + code + '&size=1';

  useEffect(() => {
    const getAllList = async () => {
      const response = await fetch(url);
      const jsonData = await response.json();
      console.log(jsonData);
      setArray(jsonData);
      // console.log(array);
    }
    getAllList();
  }, []);

  console.log('oeoelegraph');
  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100
    }
  ];
  return (
    <LineChart
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
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="pv"
        stroke="#8284d8"
        activeDot={{ r: 8 }}
      />
      <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
    </LineChart>
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

  

  useEffect(() => {
    const getAllList = async () => {
      const response = await fetch(url);
      const jsonData = await response.json();
      console.log(jsonData);
      setArray(jsonData);
      // console.log(array);
    }
    getAllList();
  }, []);

  const callGraph = () => {
    console.log('callGraph');
    <Graph />
  }


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
            <h3 key={idx} className="Station" onClick={() => callGraph()}>{data.libelle_station}, {data.libelle_region}</h3>
            ))}
          </div>
        </div>
        <div className="Graph">
          <Graph />
        </div> 
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

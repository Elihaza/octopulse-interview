import './App.css';
import React, { useEffect, useState } from 'react';

// // function Display(props) {
// //   console.log(props);
// // }


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
  const getAllList = async () => {
    const response = await fetch(url);
    const jsonData = await response.json();
    console.log(jsonData);
    setArray(jsonData);
    console.log(array);
  }

  useEffect(() => {
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
            <h3 key={idx} className="Station">{data.libelle_station}</h3>
            ))}
          </div>
        </div>
        <div className="Graph">
          <h1>Graphique</h1>
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

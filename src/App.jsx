import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

let results = [];

// function Display(props) {
//   console.log(props);
// }


function App() {

  const [testArray, setTestArray] = useState([{}]);
  let waiting = "";
  // let results = [];
  // const ahoe = ['super', 'mec', 'onadore'];
  // const [results, setResults] = useState([]);
    
  // const fetchData = async () => {
  //     try {let data = await axios.get('https://hubeau.eaufrance.fr/api/v1/temperature/station');
  //     data = data.data.data;
  //     setTestArray(data);
  //     for(let i = 0; i < testArray.length; i++){
  //       results.push(testArray[i].libelle_station);
  //       // console.log(testArray[i].libelle_station)
  //     }
  //     console.log(results);} catch (error) {console.log(error);}
  // };


  useEffect(() => {
    const fetchData = async () => { 
        try {
          let data = await axios.get('https://hubeau.eaufrance.fr/api/v1/temperature/station?&size=10&exact_count=true&format=json&pretty');
          data = data.data.data;
          // console.log(data);
          setTestArray(data);
          for(let i = 0; i < testArray.length; i++){
            results.push(testArray[i].libelle_station);
            // console.log(testArray[i].libelle_station)
          }
          console.log(testArray);
          // console.log(results)
        }
          catch(err) {console.log(err);}
      }
      fetchData();
      return () => {
        // console.log('cleanup');
      } // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (results.length < 3) {
      waiting = <h1>Loading...</h1>
    }

  return (
    <div className="App">
      <h1 id="Titre">
        Temperature des cours d'eau
      </h1>
      <div className="ListStations">
        <h1>Liste des stations</h1>
        <div className="Stations">
          {/* {console.log(results)} */}
          {/* <Display results={results} /> */}
          {waiting}
          {results.map(result => (
            <div key={result} className="Station">
              <h3 key={result} onClick={() => console.log('ahoe')}>{result}</h3>
            </div>
          ))}
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

import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {

  const [testArray, setTestArray] = useState([{}]);
  
  const uData = props => {
      setTestArray(props);
      // console.log(props);
      console.log(testArray);
      console.log(Object.keys(testArray).map(key => testArray[key]));
    }
    
  (async () => {
      let data = await axios.get('https://hubeau.eaufrance.fr/api/v1/temperature/station');
      // console.log(data);
      uData(data.data.data);
  })();

  // fetchData();

  return (
    <div className="App">
      <h1 id="Titre">
        Temperature des cours d'eau
      </h1>
      <div className="ListStations">
        <h1>Liste des stations</h1>
        <div className="Stations">
          <button>appuyer</button>
          {/* {testArray.map(station => (
            <div className="Station">
              <h2>{station.count}</h2>
            </div>
          ))} */}
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

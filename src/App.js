import logo from './logo.svg';
import './App.css';
import HeatMaps from './Components/HeatMaps';
import { useContext, createContext, useState } from 'react';

export const zoomContext= createContext({})

function App() {

  const [ zoom, setZoom] = useState(0)
  return (
    <div className="App">
      <zoomContext.Provider value={{  zoom, setZoom }}>
      <HeatMaps />
      </zoomContext.Provider>
    </div>
  );
}

export default App;

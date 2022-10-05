
import { Link, Route, Routes } from 'react-router-dom';

import './App.css';
import Koduleht from './pages/Koduleht';
import LisaToode from './pages/LisaToode';
import Ostukorv from './pages/Ostukorv';
import Poed from './pages/Poed';
import Seaded from './pages/Seaded';

function App() {
  return (
    <div className="App">
      <img className="pilt" src="https://estonia.ee/wp-content/uploads/nobe_netist_4.jpg" alt="" />
      <button className="nupp">Nupp</button>

      <Link to="/">
        <button>Avalehele</button>
        {/* <img className="pilt" src="https://estonia.ee/wp-content/uploads/nobe_netist_4.jpg" alt="" /> */}
      </Link>
      <Link to="/ostukorv">
        <button>Ostukorvi</button>
        {/* <div>Lalalalalla</div> */}
      </Link>
      <Link to="/lisa-toode">
        <button>Uut toodet lisama</button>
      </Link>
      <Link to="/seaded">
        <button>Seaded</button>
      </Link>
      <Link to="/poed">
        <button>Poed</button>
      </Link>
      {/* localhost:3000                "Tere" */}
      {/* localhost:3000/ostukorv     "Ostukorv" */}
      <Routes>
        <Route path="" element={ <Koduleht /> }  />
        <Route path="ostukorv" element={ <Ostukorv /> }  />
        <Route path="lisa-toode" element={ <LisaToode /> }  />
        <Route path="seaded" element={ <Seaded /> }  />
        <Route path="poed" element={ <Poed /> }  />
        <Route path="*" element={ <div>404 Not Found</div> }  />
      </Routes>

    </div>
  );
}

export default App;

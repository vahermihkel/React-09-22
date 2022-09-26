
import { Link, Route, Routes } from 'react-router-dom';

import './App.css';
import Koduleht from './pages/Koduleht';
import LisaToode from './pages/LisaToode';
import Ostukorv from './pages/Ostukorv';

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

      {/* localhost:3000                "Tere" */}
      {/* localhost:3000/ostukorv     "Ostukorv" */}
      <Routes>
        <Route path="" element={ <Koduleht /> }  />
        <Route path="ostukorv" element={ <Ostukorv /> }  />
        <Route path="lisa-toode" element={ <LisaToode /> }  />
      </Routes>

    </div>
  );
}

export default App;

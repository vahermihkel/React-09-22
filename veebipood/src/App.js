
import { Route, Routes } from 'react-router-dom';

import './App.css';
import Jalus from './components/Jalus';
import Menyy from './components/Menyy';
import Avaleht from './pages/Avaleht';
import HaldaTooteid from './pages/HaldaTooteid';
// import Koduleht from './pages/Koduleht';
import LisaToode from './pages/LisaToode';
import MuudaToode from './pages/MuudaToode';
import Ostukorv from './pages/Ostukorv';
import Poed from './pages/Poed';
import Seaded from './pages/Seaded';
import YksikToode from './pages/YksikToode';

function App() {
  return (
    <div className="App">
      <Menyy />
      {/* localhost:3000                "Tere" */}
      {/* localhost:3000/ostukorv     "Ostukorv" */}
      <Routes>
        <Route path="" element={ <Avaleht /> }  />
        <Route path="ostukorv" element={ <Ostukorv /> }  />
        <Route path="lisa-toode" element={ <LisaToode /> }  />
        <Route path="seaded" element={ <Seaded /> }  />
        <Route path="poed" element={ <Poed /> }  />
        <Route path="halda-tooteid" element={ <HaldaTooteid /> }  />
        <Route path="muuda/:jarjekorra_number" element={ <MuudaToode /> }  />
        <Route path="toode/:j2rjekorraNumber" element={ <YksikToode /> }  />
        <Route path="*" element={ <div>404 Not Found</div> }  />
      </Routes>
      <Jalus />

    </div>
  );
}

export default App;

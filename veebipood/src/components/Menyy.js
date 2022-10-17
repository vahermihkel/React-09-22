import { Link } from 'react-router-dom';

function Menyy() {
  return ( 
    <>
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
      <Link to="/halda-tooteid">
        <button>Halda tooteid</button>
      </Link>
    </> );
}

export default Menyy;
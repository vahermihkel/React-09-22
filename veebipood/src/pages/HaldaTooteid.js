import { useState } from "react";
import { Link } from "react-router-dom";

function HaldaTooteid() {
  const [tooted, uuendaTooted] = useState( JSON.parse(localStorage.getItem("tooted")) || [] );

  const kustuta = (index) => {
      tooted.splice(index,1); // .splice(mitmendat_kustutan, mitu_tükki)
      // muuda HTMLi
      uuendaTooted(tooted.slice());
      // muuda localStorage-t
      localStorage.setItem("tooted", JSON.stringify(tooted));
  }

  // .map( (üks_element, j2rjekorraNumber) => millega_igaühe_asendan )

  return ( 
    <div>
      {/* .map is not a function <- ma ei tee .map() funktsiooni array'le */}

      {tooted.map((element, index) => 
        <div key={index}>
          <div>{element.nimi}</div>
          <div>{element.hind}</div>
          <img src={element.pilt} alt="" />
          <div>{element.aktiivne + 0}</div>
          <button onClick={() => kustuta(index)}>x</button>
          <Link to={"/muuda/" + index}>
            <button>Muuda</button>
          </Link>
        </div>)}
    </div> );
}

export default HaldaTooteid;

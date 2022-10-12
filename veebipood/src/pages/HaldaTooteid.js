import { useState } from "react";

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
          {element}
          <button onClick={() => kustuta(index)}>x</button>
          <button>Hiljem - muuda</button>
        </div>)}
    </div> );
}

export default HaldaTooteid;

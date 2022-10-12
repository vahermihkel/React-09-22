import { useState } from "react";

function Ostukorv() {
  // const ostukorv = ["Nobe", "Mercedes", "Tesla", "BMW"];
  const [ostukorv, uuendaOstukorv] = useState( JSON.parse(localStorage.getItem("ostukorv")) || [] );


  const kustuta = (j2rjekorraNumber) => {
    ostukorv.splice(j2rjekorraNumber,1); // splice - kustutan
    console.log(ostukorv);
    uuendaOstukorv(ostukorv.slice()); // slice - teen koopia
    localStorage.setItem("ostukorv", JSON.stringify(ostukorv));
  }

  const lisa = (klikitudToode) => {
    ostukorv.push(klikitudToode); // push - lisa 1 lõppu juurde
    uuendaOstukorv(ostukorv.slice());
    localStorage.setItem("ostukorv", JSON.stringify(ostukorv));
  }

  const tyhjenda = () => {
    uuendaOstukorv([]);
    localStorage.setItem("ostukorv", JSON.stringify([]));
  }

  // function tyhjenda() {
    // uuendaOstukorv([]);
  // }

  return ( 
    <div>
      { ostukorv.length === 0 && <div>Ostukorv on tühi!</div> }
      { ostukorv.length > 0 && <div>Ostukorvis on {ostukorv.length} toodet</div> }
      { ostukorv.length > 0 && <button onClick={tyhjenda}>Tühjenda</button> }
      {ostukorv.map((element, j2rjekorraNumber) => 
        <div key={j2rjekorraNumber}>
          {element}
          <button onClick={() => kustuta(j2rjekorraNumber)}>x</button>
          <button onClick={() => lisa(element)}>Lisa</button>
        </div>)}
    </div> );
}

export default Ostukorv;
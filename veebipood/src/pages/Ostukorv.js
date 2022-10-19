import { useState } from "react";

function Ostukorv() {
  // const ostukorv = ["Nobe", "Mercedes", "Tesla", "BMW"];
  const [ostukorv, uuendaOstukorv] = useState( JSON.parse(localStorage.getItem("ostukorv")) || [] );


  const kustuta = (j2rjekorraNumber) => {
    ostukorv.splice(j2rjekorraNumber,1); // splice - kustutan
    console.log(ostukorv);
    uuendaOstukorv(ostukorv.slice()); // slice - teen koopia
    localStorage.setItem("ostukorv", JSON.stringify(ostukorv));
    // console.log(localStorage.length);
    // localStorage.getItem("ostukorv");
    // localStorage.key(3);
    // localStorage.removeItem("ostukorv");
    // localStorage.clear();
    // localStorage.setItem("1", "2");
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

  const arvutaKogusumma = () => {
    let kogusumma = 0;
    // [{n:"C", hind: 12}, {n:"S", hind: 11}, {n:"F", hind: 2}]
    //       {n:"C", hind: 12}=>   12    =  0  +  12
    //       {n:"S", hind: 11}=>   23    =  12 + 11
    //       {n:"F", hind: 2}=>    25    =  23 + 2
    // ostukorv.forEach(element => kogusumma += element.hind );
    ostukorv.forEach(element => kogusumma = kogusumma + element.hind );
    return kogusumma;
  }

  return ( 
    <div>
      { ostukorv.length === 0 && <div>Ostukorv on tühi!</div> }
      { ostukorv.length > 0 && <div>Ostukorvis on {ostukorv.length} toodet</div> }
      { ostukorv.length > 0 && <button onClick={tyhjenda}>Tühjenda</button> }
      {ostukorv.map((element, j2rjekorraNumber) => 
        <div key={j2rjekorraNumber}>
{/* Objects are not valid as a React child (found: object with keys {nimi, hind, pilt, aktiivne}). If you meant to render a collection of children, use an array instead. */}
          <div>{element.nimi}</div>
          <div>{element.hind} €</div>
          <img src={element.pilt} alt="" />
          <button onClick={() => kustuta(j2rjekorraNumber)}>x</button>
          <button onClick={() => lisa(element)}>Lisa</button>
        </div>)}
      <div>Kokku: {arvutaKogusumma()} €</div>
    </div> );
}

export default Ostukorv;
// kogus = useState(5)      --> a) 0   b) kogus-1 => 5-1 => 4
// s6num = useState("Tere")   --> a) "Edukalt lisatud"   b) "Midagi on puudu"
// array = useState(["Üks", "Kaks", "Kolm"])   -->   ["Üks","Kaks"]

import { useRef, useState } from "react";

// Tooted, Kasutajad, Tellimused, Kategooriad, Koostisosad

function Poed() {
                                  //        0          1           2        3             4           5
  const [poed, uuendaPoed] = useState(["Kristiine","Mustamäe","Kesklinn","Õismäe","Põhja-Tallinn","Lasnamäe"]);
  const poodRef = useRef();

  const sortAZ = () => {
    // W3Schools
    // Mozilla
    // ["Üks", "Kaks", "Kolm"].sort();  ---> ["Kaks", "Kolm", "Üks"]
    poed.sort();
    uuendaPoed(poed.slice());
  }

  const sortZA = () => {
    // ["Üks", "Kaks", "Kolm"].sort();  ---> ["Kaks", "Kolm", "Üks"].reverse() ---> ["Üks", "Kolm", "Kaks"]
    poed.sort().reverse();
    uuendaPoed(poed.slice());
  }

  const kustuta = (index) => {
    poed.splice(index,1); // esimene on mitmendat kustutan, koma järel teine mitu tükki kustutan
    uuendaPoed(poed.slice());  // HTMLi muutmiseks (eraldi käsklus - muuda HTMLi, sest React on efektiivne ja
                               // React ei lähe iga muutuja muutmise peale HTMLi ka muutma)
          // käsk HTMLi muutmiseks on useState parempoolne funktsioon const [vasak,parem] = useState(algväärtus);
  }

  const lisa = () => {
    poed.push(poodRef.current.value);
    uuendaPoed(poed.slice());
  }

  // Lõpuks: ["Mustamäe","Õismäe","Lasnamäe"]
  const filtreeri = () => { // 1. Kristiine         1. "Kristiine".includes("mäe") ----> false
                            // 2. Mustamäe         2. "Mustamäe".includes("mäe") ----> true
    const vastus = poed.filter(element => element.includes("mäe"));
    uuendaPoed(vastus);
  }

  // ["Kristiine","Mustamäe","Kesklinn","Õismäe","Põhja-Tallinn","Lasnamäe"]
  // ["Kristiine--","Mustamäe--","Kesklinn--","Õismäe--","Põhja-Tallinn--","Lasnamäe--"]
  const muudaK6iki = () => { // 1. Kristiine         1. "Kristiine" + "--" ----> "Kristiine--"
                             // 2. Mustamäe          2. "Mustamäe" + "--" ----> "Mustamäe--"
    const vastus = poed.map(element => element + "--");
    uuendaPoed(vastus);
  }

  return ( 
  <div>
    <label>Uus pood</label> <br />
    <input ref={poodRef} type="text" /> <br />
    <button onClick={lisa}>Sisesta</button> <br />


    <button onClick={sortAZ}>Sorteeri A-Z</button>
    <button onClick={sortZA}>Sorteeri Z-A</button>
    <button onClick={filtreeri}>Jäta alles 'mäe' sisaldavad</button>
    <button onClick={muudaK6iki}>Lisa täiendavad -- lõppu</button>

    {/* .map() on funktsionaalsus, mis kehtib alati array-dele
    map on ükshaaval iga elemendi võtmine ja tema muutmine */}
    <div>{["","",""].map((e,i) => <div key={i}>{i}. Tere</div>)}</div>
    
    <div>{poed.map((pood,index) => 
      <div key={pood}>
        {pood} 
        <button onClick={() => kustuta(index)}>x</button>
      </div>)}
    </div>

    <div>-------------------------------------------</div>
    {/* 
    <div key={"Kristiine"}>Kristiine <button onClick={() => kustuta(0)}>x</button> </div>
    <div key={"Mustamäe"}>Mustamäe <button onClick={() => kustuta(1)}>x</button></div>
    <div key={"Kesklinn"}>Kesklinn <button onClick={() => kustuta(2)}>x</button></div>
    <div key={"Õismäe"}>Õismäe <button onClick={() => kustuta(3)}>x</button></div>
    <div key={"Põhja-Tallinn"}>Põhja-Tallinn <button onClick={() => kustuta(4)}>x</button></div>
    <div key={"Lasnamäe"}>Lasnamäe <button onClick={() => kustuta(5)}>x</button></div> */}
  </div> );
}

export default Poed;
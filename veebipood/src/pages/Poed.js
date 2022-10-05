// kogus = useState(5)      --> a) 0   b) kogus-1 => 5-1 => 4
// s6num = useState("Tere")   --> a) "Edukalt lisatud"   b) "Midagi on puudu"
// array = useState(["Üks", "Kaks", "Kolm"])   -->   ["Üks","Kaks"]

import { useState } from "react";

// Tooted, Kasutajad, Tellimused, Kategooriad, Koostisosad

function Poed() {
                                  //        0          1           2        3             4           5
  const [poed, uuendaPoed] = useState(["Kristiine","Mustamäe","Kesklinn","Õismäe","Põhja-Tallinn","Lasnamäe"]);

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

  return ( <div>
    <button onClick={sortAZ}>Sorteeri A-Z</button>
    <button onClick={sortZA}>Sorteeri Z-A</button>

    {/* .map() on funktsionaalsus, mis kehtib alati array-dele
    map on ükshaaval iga elemendi võtmine ja tema muutmine */}
    <div>{["","",""].map((e,i) => <div>{i}. Tere</div>)}</div>
    <div>{poed.map(pood => <div>{pood}</div>)}</div>

    <div>-------------------------------------------</div>
    <div>Kristiine</div>
    <div>Mustamäe</div>
    <div>Kesklinn</div>
    <div>Õismäe</div>
    <div>Põhja-Tallinn</div>
    <div>Lasnamäe</div>
  </div> );
}

export default Poed;
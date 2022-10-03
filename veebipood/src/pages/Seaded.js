import { useState } from "react"; // <- kui on puudu: Line 5:30:  'useState' is not defined  no-undef

// ffc
function Seaded() {
  // keel - muutuja, mida pannakse HTMLi (vasak pool kandilistes sulgudes)
  // uuendaKeel - funktsioon, millega uuendatakse HTMLi (parem pool kandilistes sulgudes)
  //      useState - annab funktsioonile "uuendaKeel" eriomaduse, et kui see käima pannakse, siis tee refresh
  //      useState sulgude sees on lehele tulemise ajal kehtiv väärtus
                          // useState("EST");
  const [keel, uuendaKeel] = useState(localStorage.getItem("veebilehe_keel") || "EST"); 

  const muudaKeelEST = () => {
    uuendaKeel("EST");
    localStorage.setItem("veebilehe_keel", "EST");
  }

  const muudaKeelENG = () => {
    uuendaKeel("ENG");
    localStorage.setItem("veebilehe_keel", "ENG");
  }

  const muudaKeelRUS = () => {
    uuendaKeel("RUS");
    localStorage.setItem("veebilehe_keel", "RUS");
  }

  return ( 
    <div>
      <button onClick={muudaKeelEST}>Muuda eesti keelseks</button>
      <button onClick={muudaKeelENG}>Muuda inglise keelseks</button>
      <button onClick={muudaKeelRUS}>Muuda vene keelseks</button>

      {/* <div>Veebilehe keel on: {keel}</div> */}
      { keel === "EST" && <div>Veebilehe keel on: eesti</div>}
      { keel === "ENG" && <div>Veebilehe keel on: inglise</div>}
      { keel === "RUS" && <div>Veebilehe keel on: vene</div>}
      { keel === "ENG" && <div>Welcome!</div>}
    </div> );
}

export default Seaded;

// tumesinine - function, const (deklareerin tüübi), HTMLs on tag <div> <img>
// sinine - meie tehtud muutuja
// helesinine - JavaScripti enda muutuja, HTMLi atribuut  --- src="", onClick="", className=""
// kollane - funktsioonid
// punane/oranž - sõnad jutumärkides

// {} - JavaScriptis tähistavad koodiblokki:
//        const funktsioon = () => {koodiblokk}
//        if () {koodiblokk} else {koodiblokk}
//      HTMLs    dünaamika
//        { tingimuslause && <div>}
//        onClick={fnkts}
//        ref={blablbalbalbalRef}
// || - kui on vasakul tühjus, võta parem
// && - kui on vasakul tõde, tee parem
// === - kui vasak pool ja parem pool on võrdsed, siis on tõde
// !== - kui vasak pool ja parem pool ei ole võrdsed, on tõde
// () - defineerivad funktsiooni
// () => {} funktsiooni tähistus

// <button onClick={() => uuendaKeel("EST")}>Muuda eesti keelseks</button>
// <button onClick={uuendaKeel("EST")}>Muuda eesti keelseks</button> --->
// Uncaught Error: Too many re-renders. React limits the number of renders to prevent an infinite loop.
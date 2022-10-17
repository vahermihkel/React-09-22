import { useRef, useState } from "react"; // <- kui on puudu: Line 5:30:  'useState' is not defined  no-undef

// ffc
function Seaded() {
  // keel - muutuja, mida pannakse HTMLi (vasak pool kandilistes sulgudes)
  // uuendaKeel - funktsioon, millega uuendatakse HTMLi (parem pool kandilistes sulgudes)
  //      useState - annab funktsioonile "uuendaKeel" eriomaduse, et kui see käima pannakse, siis tee refresh
  //      useState sulgude sees on lehele tulemise ajal kehtiv väärtus
                          // useState("EST");
  const [keel, uuendaKeel] = useState(localStorage.getItem("veebilehe_keel") || "EST"); 
  const telRef = useRef(); // inputi seest väärtuse kättesaamiseks
  const emailRef = useRef();

  // const muudaKeelEST = () => {
  //   uuendaKeel("EST");
  //   localStorage.setItem("veebilehe_keel", "EST");
  // }

  // const muudaKeelENG = () => {
  //   uuendaKeel("ENG");
  //   localStorage.setItem("veebilehe_keel", "ENG");
  // }

  // const muudaKeelRUS = () => {
  //   uuendaKeel("RUS");
  //   localStorage.setItem("veebilehe_keel", "RUS");
  // }

  const muudaKeel = (uusKeel) => {
    uuendaKeel(uusKeel);
    localStorage.setItem("veebilehe_keel", uusKeel);
  }

  const salvestaTel = () => {
    // localStorage-s salvestame setItem abil, andes kaasa võtme ja väärtuse mille salvestan
    // salvestame, et kuskil mujal teha getItem, andes kaasa ainult võtme ja see getItem koht saab omakorda
    //     viimati sisestatud setItem-i väärtuse
    localStorage.setItem("telefon", telRef.current.value);
  }

  const salvestaEmail = () => {
    // parem klõps -> inpsect -> application -> Local Storage
    localStorage.setItem("email", emailRef.current.value);
  }

  return ( 
    <div>
      <label>Meie telefoninumber</label>
      <input ref={telRef} defaultValue={localStorage.getItem("telefon")} type="text" />
      <button onClick={salvestaTel}>Sisesta</button>
      <br />
      <label>Meie email</label>
      <input ref={emailRef} defaultValue={localStorage.getItem("email")} type="text" />
      <button onClick={salvestaEmail}>Sisesta</button>
      <br />


      <button onClick={() => muudaKeel("EST")}>Muuda eesti keelseks</button>
      <button onClick={() => muudaKeel("ENG")}>Muuda inglise keelseks</button>
      <button onClick={() => muudaKeel("RUS")}>Muuda vene keelseks</button>

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
// [] - array / massiiv / list    [1231, "pig", "cats", "dogs", 31231]

// <button onClick={() => uuendaKeel("EST")}>Muuda eesti keelseks</button>
// <button onClick={uuendaKeel("EST")}>Muuda eesti keelseks</button> --->
// Uncaught Error: Too many re-renders. React limits the number of renders to prevent an infinite loop.
import { useState, useRef } from "react"; // <---- HTML (JSX) manipuleerimisega seotud
//                  from "react-router-dom"    <----- navigeerimisega seotud

function LisaToode() {
  const [s6num, muudaS6num] = useState(""); // useState muudab HTMLs muutuja väärtust
  const nimiRef = useRef(); //  Line 5:19:  'useRef' is not defined 
                      // kuulab reaalajas inputi sisse sisestatud väärtust

  const lisa = () => {
    // if (nimiRef.current !== undefined)    
    //undefined --- ta ei tea ka tüüpi ja on tühjus    
    //null -- teab tüüpi, aga on tühjus
    if (nimiRef.current.value === "") {
      muudaS6num("Ei saa lisada ilma nimeta!");
    } else {
      muudaS6num("Lisatud: " + nimiRef.current.value);
    }      // mine loogeliste sulgude blokki nr 1 kui sulgude sees on tõsi
                          // kui ei ole tõsi, mine blokki nr 2

    // console.log(document.getElementById("nimi").value)
    //  <input id="nimi" type="text" /> <br />
    // 1. JavaScript käib document.getElementById abil läbi KÕIK HTMLi mis on nähtav:
    //     (anomaalia - kuskil teises kogemata lisasime sama ID)
    //  Kui on nähtav: Ostukorv.js <-- siinse HTMLi,   Koduleht.js <-- siinse HTMLi  --> App.js <-- siinse HTMLi
    // 2. Efektiivsus (liiga palju tööd ei tee)
  }

  // loogeline sulg kaob ära: Line 31:  Parsing error: 'import' and 'export' may only appear at the top level.

  return ( 
    <div>
        <div>{s6num}</div>
        <label>Uue toote nimi</label> <br /> 
        <input ref={nimiRef} type="text" /> <br />
        <button onClick={lisa}>Lisa uus toode</button>
    </div> );
}

export default LisaToode;

// tab <-/-> nupp nihutab paremale
// shift + tab nihutab vasakule
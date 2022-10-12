import { useState, useRef } from "react";

function LisaToode() {
  const [s6num, muudaS6num] = useState("");
  const nimiRef = useRef(); 

  const lisa = () => {
    if (nimiRef.current.value === "") {
      muudaS6num("Ei saa lisada ilma nimeta!");
    } else {
      muudaS6num("Lisatud: " + nimiRef.current.value);
      let tootedLS = localStorage.getItem("tooted");
      tootedLS = JSON.parse(tootedLS) || [];
      tootedLS.push(nimiRef.current.value);
      tootedLS = JSON.stringify(tootedLS);
      localStorage.setItem("tooted", tootedLS);
    } 
  }

  // 1. võta kõik tooted localStoragest        localStorage.getItem("VõTI");
  // 2. võta talt jutumärgid maha              JSON.parse()
  // 3. lisa talle üks juurde                  .push()
  // 4. pane talle jutumärgid tagasi           JSON.stringify()
  // 5. pane localStoragesse väärtused tagasi  localStorage.setItem("VÕTI", väärtused)

  return ( 
    <div>
        <div>{s6num}</div>
        <label>Uue toote nimi</label> <br /> 
        <input ref={nimiRef} type="text" /> <br />
        <button onClick={lisa}>Lisa uus toode</button>
    </div> );
}

export default LisaToode;
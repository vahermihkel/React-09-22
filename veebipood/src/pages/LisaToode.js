import { useState } from "react";

function LisaToode() {
  const [s6num, muudaS6num] = useState("");

  const lisa = () => {
    muudaS6num("Lisatud!");
  }

  return ( 
    <div>
        <div>{s6num}</div>
        <label>Uue toote nimi</label> <br /> 
        <input type="text" /> <br />
        <button onClick={lisa}>Lisa uus toode</button>
    </div> );
}

export default LisaToode;

// tab <-/-> nupp nihutab paremale
// shift + tab nihutab vasakule
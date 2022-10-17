import { useState } from "react";

function Jalus() {
  const [naitaEmail, uuendaNaitaEmail] = useState(false);
  const [telefon, uuendaTelefon] = useState(localStorage.getItem("telefon"));

  return ( 
    <>
      <br /><br />
      <div>Meie telefon: 
          {telefon} 
          { telefon.startsWith("+372") === false && 
            <button onClick={() => uuendaTelefon("+372" + telefon)}>
              Lisa suunakood
            </button> }
      </div>
      <div>Meie email: 
        {/* { naitaEmail === true && localStorage.getItem("email")} 
        { naitaEmail === false && <button onClick={() => uuendaNaitaEmail(true)}>Vaata</button> } */}
        { naitaEmail === true ?
            localStorage.getItem("email") :
                <button onClick={() => uuendaNaitaEmail(true)}>Vaata</button> }
      </div>
    </> );
}

export default Jalus;
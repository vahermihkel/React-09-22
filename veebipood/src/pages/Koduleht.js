import { useState } from "react";

// ffc
function Koduleht() {
  // const ---> constant ehk konstantne väärtus (ei saa pärast initsialiseerimist uuesti väärtust anda)
  // let --> initsialiseerimise järgselt saan ka muuta     locally entire function
  // const kogusDefaultValue = 5;
  const [kogus, muudaKogus] = useState(5);   // 1. tehakse valmis kogus muutuja
  const [s6num, muudaS6num] = useState("Muuda kogust!"); 

  // const tagasiDefaultValuesse = () => {
  //   muudaKogus(kogusDefaultValue);
  // }

  // 7. käib onClick ja pannakse käima funktsioon
  const v2henda = () => {    // 2. tehakse valmis funktsioon, aga seda käima ei panda
    //kogus = kogus - 3; // 8. paneb koguse väärtuse väiksemaks
    if (kogus > 0) {
      muudaKogus(kogus - 1);
      console.log("panen käima vähenda funktsiooni"); // parem klõps -> inspect -> console   (runtime errorid)
      console.log(kogus); // 9. teeb console.log-d
      muudaS6num("Kogus vähendatud");
    } else {
      muudaS6num("Kogus ei saa miinusesse minna!");
    }
    
  }
  //} kustus ära:
  //Line 29:  Parsing error: 'import' and 'export' may only appear at the top level. (29:0)

  // function v2henda() {

  // }

  const suurenda = () => { 
    //kogus = kogus + 1; 
    muudaKogus(kogus + 1);
    muudaS6num("Kogus suurendatud");
  }

  const nulli = () => { 
    //kogus = 0; 
    muudaKogus(0);
  }

  //Error: Too many re-renders. React limits the number of renders to prevent an infinite loop
  // onClick={funktsiooniNimi()}    <--- ja omakorda on funktsiooni sees useState funktsioon, 
  //                                    mis teeb componendile restardi
  // onClick={() => funktsiooniNimi()}
  // onClick={funktsiooniNimi}
  return (  // 3. minnakse renderdama (HTMLi joonistama)
    <div>
      <div>{s6num}</div>
      <button onClick={v2henda}>-</button> {/*  4. tehakse seos funktsiooniga (käima ei panda)  */}
      {kogus}              {/*  5. kuvatakse välja: kogus  */}
      <button onClick={suurenda}>+</button>   {/*  6. tehakse + nupp  */}
      <br />
      { kogus !== 0 && <button onClick={nulli}>Nulli</button> }
      {/* { kogus !== 0 ? <button onClick={nulli}>Nulli</button> : <button>Mittenulli</button> } */}
    </div> );
}

export default Koduleht;

// npm start järgselt compile errorid
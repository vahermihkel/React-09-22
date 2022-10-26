import { useRef, useState } from "react";

function Poed() {
  const poodRef = useRef();
  const aegRef = useRef();

  // const sortAZStringidele = () => {
  //   poed.sort();
  //   uuendaPoed(poed.slice());
  // }
//{"ZIP":"10696","NAME":"1it postipunkt","TYPE":"1","A0_NAME":"EE","A1_NAME":"Harju maakond","A2_NAME":"Tallinn","A3_NAME":"Kristiine linnaosa","A4_NAME":"","A5_NAME":"S\u00f5pruse pst","A6_NAME":"","A7_NAME":"33","A8_NAME":"","X_COORDINATE":"24.714293","Y_COORDINATE":"59.420107","SERVICE_HOURS":"","TEMP_SERVICE_HOURS":"","TEMP_SERVICE_HOURS_UNTIL":"","TEMP_SERVICE_HOURS_2":"","TEMP_SERVICE_HOURS_2_UNTIL":"","comment_est":"","comment_eng":"","comment_rus":"","comment_lav":"","comment_lit":"","MODIFIED":"2021-12-20T12:51:39.343+02:00"}
//  pakiautomaadid.sort((a,b) => a.A2_NAME.localeCompare(b.A2_NAME));
// const originaal = ["Jan", "Feb"]
//  kuupäevad.sort((a,b) => originaal.indexOf(a) - originaal.indexOf(b) );
  const sortAZ = () => {
    poed.sort((a,b) => a.nimi.localeCompare(b.nimi));
    uuendaPoed(poed.slice());
  }

  const sortZA = () => {
    poed.sort((a,b) => b.nimi.localeCompare(a.nimi));
    uuendaPoed(poed.slice());
  }

  const kustuta = (index) => {
    poed.splice(index,1); 
    uuendaPoed(poed.slice()); 
  }

  const filtreeri = () => { 
    const vastus = poed.filter(element => element.nimi.includes("mäe"));
    uuendaPoed(vastus);
  }

  // [{nimi: "Kristiine", aeg: "9-22"},{nimi: "Kristiine", aeg: "9-22"}] -> [{nimi: "Kristiine--"}]
  const muudaK6iki = () => {
    const vastus = poed.map(element => {return {...element, nimi: element.nimi + "--"}});
    uuendaPoed(vastus);
  }

  const lisa = () => {
    poed.push({nimi: poodRef.current.value, aeg: aegRef.current.value});
    uuendaPoed(poed.slice());
  }

  const [poed, uuendaPoed] = useState([
    {nimi: "Kristiine"    , aeg: "9-22"},
    {nimi: "Mustamäe"     , aeg: "10-21"}, 
    {nimi: "Kesklinn"     , aeg: "10-21"}, 
    {nimi: "Õismäe"       , aeg: "10-21"}, 
    {nimi: "Põhja-Tallinn", aeg: "10-21"}, 
    {nimi: "Lasnamäe"     , aeg: "10-21"}, 
    {nimi: "Kakumäe"      , aeg: "9-22"}
  ]);

  return ( 
  <div>
    <div>
      <label>Uus pood</label> <br />
      <input ref={poodRef} type="text" /> <br />
      <label>Uue poe lahtiolekuaeg</label> <br />
      <input ref={aegRef} type="text" /> <br />
      <button onClick={lisa}>Sisesta</button> <br />
    </div>

    <div>
      <button onClick={sortAZ}>Sorteeri A-Z</button>
      <button onClick={sortZA}>Sorteeri Z-A</button>
      <button onClick={filtreeri}>Jäta alles 'mäe' sisaldavad</button>
      <button onClick={muudaK6iki}>Lisa täiendavad -- lõppu</button>
    </div>

    <div>{["","",""].map((e,i) => <div key={i}>{i}. Tere</div>)}</div>

    <br /><br />
    
    <div>{poed.map((pood,index) => 
      <div key={index}>
        {pood.nimi} {pood.aeg}
        <button onClick={() => kustuta(index)}>x</button>
      </div>)}
    </div>

    <div>-------------------------------------------</div>
    
          {/* {nimi: "Kristiine", aeg: "9-22"} */}
    <div key={0}>Kristiine 9-22<button onClick={() => kustuta(0)}>x</button> </div>
    <div key={1}>Mustamäe <button onClick={() => kustuta(1)}>x</button></div>
    <div key={2}>Kesklinn <button onClick={() => kustuta(2)}>x</button></div>
    <div key={3}>Õismäe <button onClick={() => kustuta(3)}>x</button></div>
    <div key={4}>Põhja-Tallinn <button onClick={() => kustuta(4)}>x</button></div>
    <div key={5}>Lasnamäe <button onClick={() => kustuta(5)}>x</button></div>
  </div> );
}

export default Poed;
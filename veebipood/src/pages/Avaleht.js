import { Link } from "react-router-dom";

function Avaleht() {
  const tooted = JSON.parse(localStorage.getItem("tooted")) || [];

                        // "BMW"
  const lisaOstukorvi = (klikitudToode) => {
    //           1. "["Nobe", "Nobe", "Tesla"]"    2. null
    let ostukorvLS = localStorage.getItem("ostukorv");
    console.log(ostukorvLS);
    //           1. ["Nobe", "Nobe", "Tesla"]      2. []
    ostukorvLS = JSON.parse(ostukorvLS) || [];
    console.log(ostukorvLS);
    //           1. ["Nobe", "Nobe", "Tesla", "BMW"]   2. ["BMW"]
    ostukorvLS.push(klikitudToode);
    console.log(ostukorvLS);
    //           1. "["Nobe", "Nobe", "Tesla", "BMW"]"  2. "["BMW"]"
    ostukorvLS = JSON.stringify(ostukorvLS);
    console.log(ostukorvLS);
    //          key     |    value
    //1.    "ostukorv"  |   "["Nobe", "Nobe", "Tesla", "BMW"]"   
    //2.    "ostukorv"  |   "["BMW"]"   
    localStorage.setItem("ostukorv", ostukorvLS);
  }

  return ( 
    <div>
      {/* .map is not a function <- ma ei tee .map() funktsiooni array'le */}

      {tooted.map((element, index) => 
        <div key={index}>
          <Link to={"/toode/" + index}>
            {element}
          </Link>
          <button onClick={() => lisaOstukorvi(element)}>Lisa ostukorvi</button>
        </div>)}
    </div> );
}

export default Avaleht;
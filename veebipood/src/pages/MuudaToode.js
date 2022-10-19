import { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

function MuudaToode() {
  const { jarjekorra_number } = useParams();
  const tooted = JSON.parse(localStorage.getItem("tooted")) || [];
  const leitudToode = tooted[jarjekorra_number];
  const nimiRef = useRef();
  const hindRef = useRef(); 
  const piltRef = useRef(); 
  const aktiivneRef = useRef(); 
  const navigate = useNavigate();
  
  const uuendaToode = () => {
    const uusToode = {
      "nimi": nimiRef.current.value,
      "hind": hindRef.current.value,
      "pilt": piltRef.current.value,
      "aktiivne": aktiivneRef.current.checked,
    }
    tooted[jarjekorra_number] = uusToode;
    localStorage.setItem("tooted", JSON.stringify(tooted));
    navigate("/halda-tooteid");
  }

  return ( 
    <>
      { leitudToode !== undefined && 
        <div>
          <label>Toote nimi</label> <br />
          <input ref={nimiRef} defaultValue={leitudToode.nimi} type="text" /> <br />
          <label>Uue toote hind</label> <br /> 
          <input ref={hindRef} defaultValue={leitudToode.hind} type="number" /> <br />
          <label>Uue toote pilt</label> <br /> 
          <input ref={piltRef} defaultValue={leitudToode.pilt} type="text" /> <br />
          <label>Uue toote aktiivsus</label> <br /> 
          <input ref={aktiivneRef} defaultChecked={leitudToode.aktiivne} type="checkbox" /> <br />
          <button onClick={uuendaToode}>Muuda</button>
        </div>
      }
      { leitudToode === undefined && <div>Toodet ei leitud</div>}
    </> );
}

export default MuudaToode;
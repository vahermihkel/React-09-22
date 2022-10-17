import { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

function MuudaToode() {
  const { jarjekorra_number } = useParams();
  const tooted = JSON.parse(localStorage.getItem("tooted")) || [];
  const leitudToode = tooted[jarjekorra_number];
  const nimiRef = useRef();
  const navigate = useNavigate();
  
  const uuendaToode = () => {
    // const leitud = ["cats", "dogs", "cows"][2];
    // const leitud = "cows";

    //["cats", "dogs", "cows"][2] = "horses";
    //["cats", "dogs", "horses"];
    tooted[jarjekorra_number] = nimiRef.current.value;
    localStorage.setItem("tooted", JSON.stringify(tooted));
    navigate("/halda-tooteid");
  }

  return ( 
    <>
      { leitudToode !== undefined && 
        <div>
          <label>Toote nimi</label> <br />
          <input ref={nimiRef} defaultValue={leitudToode} type="text" /> <br />
          <button onClick={uuendaToode}>Muuda</button>
        </div>
      }
      { leitudToode === undefined && <div>Toodet ei leitud</div>}
    </> );
}

export default MuudaToode;
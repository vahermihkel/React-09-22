import { useParams } from "react-router-dom";

function YksikToode() {
  //http://localhost:3000/toode/2
  // path="toode/:j2rjekorraNumber"

  const { j2rjekorraNumber } = useParams(); // {j2rjekorraNumber: 2} ---> 2
  //const params = useParams();  // {j2rjekorraNumber: 2}
  const tooted = JSON.parse(localStorage.getItem("tooted")) || [];
  const leitudToode = tooted[j2rjekorraNumber];
  // console.log(leitudToode);  kui ei leita teda üles on undefined

  return ( 
    <div>
      { leitudToode !== undefined && 
         <div>
          <div>{leitudToode.nimi}</div>
          <div>{leitudToode.hind}</div>
          <img src={leitudToode.pilt} alt="" />
          <div>{leitudToode.aktiivne + 0}</div>
         </div>
      }
      { leitudToode === undefined && <div>Toodet ei leitud</div>}
    </div> );
}

export default YksikToode;
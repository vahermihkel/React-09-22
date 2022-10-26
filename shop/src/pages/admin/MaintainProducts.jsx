import { Button } from "react-bootstrap";
import { useState } from "react";
import productsFromFile from "../../data/products.json";
import { ToastContainer, toast } from 'react-toastify';

function MaintainProducts() {
  const [products, setProducts] = useState(productsFromFile);

  const remove = (index) => {
    productsFromFile.splice(index,1);
    setProducts(productsFromFile.slice());
    toast.error("Toode kustutatud");
  }

  return ( 
    <div>
      <ToastContainer />
      {products.map((element,index) => 
        <div key={index}>
          <img src={element.image} alt="" />
          <div>{element.name}</div>
          <div>{element.price}</div>
          <Button variant="danger" onClick={() => remove(index)}>Kustuta</Button>
        </div>)}
    </div> );
}

export default MaintainProducts;
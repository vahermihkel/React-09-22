import { Button } from "react-bootstrap";
import { useState } from "react";
import productsFromFile from "../../data/products.json";
import { ToastContainer, toast } from 'react-toastify';
import { Link } from "react-router-dom";
import { useRef } from "react";

function MaintainProducts() {
  const [products, setProducts] = useState(productsFromFile);
  const searchedProductRef = useRef();

  const remove = (product) => {
    const index = productsFromFile.findIndex(element => element.id === product.id);
    productsFromFile.splice(index,1);
    setProducts(productsFromFile.slice());
    toast.error("Toode kustutatud");
  }

  const searchProducts = () => {
    // console.log(searchedProductRef.current.value);
    const result = productsFromFile.filter(element => 
        element.name.toLowerCase().includes(searchedProductRef.current.value.toLowerCase())
      );
    setProducts(result);
  }

  return ( 
    <div>
      <input ref={searchedProductRef} onChange={searchProducts} type="text" />
      <span>{products.length} tk</span>
      <ToastContainer />
      {products.map((element,index) => 
        <div key={index}>
          <img src={element.image} alt="" />
          <div>{element.name}</div>
          <div>{element.price}</div>
          {/* shift + kustutamise nupust 1 võrra vasakul */}
          {/* <Link to={`/admin/edit-product/${element.id}`}> */}
          <Link to={"/admin/edit-product/" + element.id}>
            <Button variant="warning">Muuda</Button>
          </Link>
          <Button variant="danger" onClick={() => remove(element)}>Kustuta</Button>
        </div>)}
    </div> );
}

export default MaintainProducts;
import { useState } from "react";
import Button from "react-bootstrap/Button";
// import {Button} from "react-bootstrap";
import productsFromFile from "../data/products.json";
// {module/library}   from   "package"
//  default   from

function HomePage() {
  const [products, setProducts] = useState(productsFromFile);
  const categories = [...new Set(productsFromFile.map(element => element.category))];

  const sortAZ = () => {
    products.sort((a, b) => a.name.localeCompare(b.name));
    setProducts(products.slice());
  }

  const sortZA = () => {
    products.sort((a, b) => b.name.localeCompare(a.name));
    setProducts(products.slice());
  }

  const sortPriceAsc = () => {
    products.sort((a, b) => a.price - b.price);
    setProducts(products.slice());
  }

  const sortPriceDesc = () => {
    products.sort((a, b) => b.price - a.price);
    setProducts(products.slice());
  }

  const filterByCategory = (categoryClicked) => {

  }

  return ( 
    <div>
      {categories.map(element => <Button onClick={() => filterByCategory(element)}>{element}</Button>)}
      <div>{products.length} tk</div>
      <Button onClick={sortAZ}>Sorteeri A-Z</Button>
      <Button onClick={sortZA}>Sorteeri Z-A</Button>
      <Button onClick={sortPriceAsc}>Sorteeri hind kasvavalt</Button>
      <Button onClick={sortPriceDesc}>Sorteeri hind kahanevalt</Button>
      {products.map(element => 
        <div>
          <img src={element.image} alt="" />
          <div>{element.name}</div>
          <div>{element.price}</div>
        </div>)}
    </div> );
}

export default HomePage;
import { useState } from "react";
import Button from "react-bootstrap/Button";
import { useTranslation } from "react-i18next";
// import {Button} from "react-bootstrap";
import productsFromFile from "../data/products.json";
// {module/library}   from   "package"
//  default   from
import { ToastContainer, toast } from 'react-toastify';

function HomePage() {
  const [products, setProducts] = useState(productsFromFile);
  const categories = [...new Set(productsFromFile.map(element => element.category))];
  const { t } = useTranslation();
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
    const result = productsFromFile.filter(element => element.category === categoryClicked);
    setProducts(result);
  }

  const addToCart = (productClicked) => {
    // KODUS ---> samamoodi nagu eesti keelses
    // const cart = sessionStorage.getItem("cart")

    toast(t("toast.cart-successful") + productClicked.name + t("toast.to-cart"), {
    // toast(`🦄 Edukalt ${productClicked.name} ostukorvi lisatud!`, {
      position: "bottom-left",
      autoClose: 1000,
      theme: "dark",
      });
  }

  return ( 
    <div>
      <ToastContainer />
      {categories.map(element => 
        <Button key={element} onClick={() => filterByCategory(element)}>{t(element)}</Button>)}
      <div>{products.length} tk</div>
      <Button onClick={sortAZ}>Sorteeri A-Z</Button>
      <Button onClick={sortZA}>Sorteeri Z-A</Button>
      <Button onClick={sortPriceAsc}>Sorteeri hind kasvavalt</Button>
      <Button onClick={sortPriceDesc}>Sorteeri hind kahanevalt</Button>
      {products.map(element => 
        <div key={element.id}>
          <img src={element.image} alt="" />
          <div>{element.name}</div>
          {/* {i18n.language === "ENG" ? <div>{element.name.ENG}</div>
            : <div>{element.name.EST}</div> } */}
          <div>{element.price}</div>
          <Button onClick={() => addToCart(element)}>Lisa ostukorvi</Button>
        </div>)}
    </div> );
}

export default HomePage;
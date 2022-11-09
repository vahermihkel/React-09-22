import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { useTranslation } from "react-i18next";
// import {Button} from "react-bootstrap";
// import productsFromFile from "../data/products.json";
// {module/library}   from   "package"
//  default   from
import { ToastContainer, toast } from 'react-toastify';
import config from "../data/config.json";

function HomePage() {
  const [dbProducts, setDbProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const categories = [...new Set(dbProducts.map(element => element.category))];
  const { t } = useTranslation();

  useEffect(() => {
    fetch(config.productsDbUrl)
      .then(res => res.json())
      .then(json => {
        setProducts(json.slice());
        setDbProducts(json.slice());
      })
  }, []);

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
    const result = dbProducts.filter(element => element.category === categoryClicked);
    setProducts(result);
  }

                  // {id: 123, name: "Fanta", price: 3.10, ....}
  const addToCart = (productClicked) => {
    let cart = sessionStorage.getItem("cart");
    cart = JSON.parse(cart) || [];
    // [{id: 321, kogus: 2},{id: 123, kogus: 1}]
    const index = cart.findIndex(element => element.id === productClicked.id);
    if (index >= 0) {   // KUI EI LEITA, ON INDEX -1
      cart[index].quantity = cart[index].quantity + 1;
    } else {
      // juht, kui teda pole ostukorvis
      cart.push({"id": productClicked.id, "quantity": 1});
    }
    cart = JSON.stringify(cart);
    sessionStorage.setItem("cart", cart);

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

// ISESEISEV PROJEKT
// 21.nov  viimane kokkusaamise päev
// 30.nov <- ametlikult

// Näitate veebilehte
// Põgusalt ka koodi

// Ainuke nõue on, et tehtud Reactis
// 1. Enda poolt välja mõeldud projekt
// 2. Youtube/Udemy video järgi tehtud projekt
// 3. Webshopi edasiarendus
// 4. Proovitöö, mida saate

// Tulevikus:
// API päringuid
// useEffect()
// useMemo()
// useContext() 
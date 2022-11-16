import { createContext, useState } from "react"
import config from "../data/config.json";

const CartSumContext = createContext(null);

export const CartSumContextProvider = (props) => {
  const [cartSum, setCartSum] = useState(calculateCartSum());

  function calculateCartSum() {
    let cart = sessionStorage.getItem("cart");
    cart = JSON.parse(cart) || [];

    fetch(config.productsDbUrl)
    .then(res => res.json())
    .then(json => {
      const cartWithProducts = cart.map(element => {
        const productFound = json.find(product => product.id === element.id);
        return productFound !== undefined ? {"product": productFound, "quantity": element.quantity} : undefined;
      }).filter(element => element !== undefined);
  
      let cartSum = 0;
      cartWithProducts.forEach(element => cartSum = cartSum + element.product.price * element.quantity);
      setCartSum(cartSum.toFixed(2));
    })
  }

  return (
    <CartSumContext.Provider value={{
      cartSum: cartSum,
      setCartSum: setCartSum
    }}>
      {props.children}
    </CartSumContext.Provider>
  )
}

export default CartSumContext;
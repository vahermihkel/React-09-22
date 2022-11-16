import { useEffect, useMemo, useState } from "react";
import config from "../data/config.json";
import styles from "../css/Cart.module.css";
import { Link } from "react-router-dom";
import ParcelMachines from "../components/ParcelMachines";
import Payment from "../components/Payment";
import { useContext } from "react";
import CartSumContext from '../store/CartSumContext';

function Cart() {                   // [{"id":1312,"quantity":4},{"id":59074235,"quantity":1},{"id":48267401,"quantity":4}]
                                    // [{"product":{"id": 1312, name: "asd"}, "quantity": 4},{},{}]
  const cartSS = useMemo(() => JSON.parse(sessionStorage.getItem("cart")) || [], []);
  const [cart, setCart] = useState([]);
 
  const cartSumCtx = useContext(CartSumContext);

  useEffect(() => {
    fetch(config.productsDbUrl)
      .then(res => res.json())
      .then(json => {
        const cartWithProducts = cartSS.map(element => {
          const productFound = json.find(product => product.id === element.id);
          return productFound !== undefined ? {"product": productFound, "quantity": element.quantity} : undefined;
        }).filter(element => element !== undefined);
        setCart(cartWithProducts);
      })
  }, [cartSS]);

  const removeFromCart = (productIndex) => {
    cartSS.splice(productIndex,1);
    cart.splice(productIndex,1);
    setCart(cart.slice());
    sessionStorage.setItem("cart", JSON.stringify(cartSS));
    cartSumCtx.setCartSum(calculateCartSum());
  }

  const emptyCart = () => {
    setCart([]);
    sessionStorage.setItem("cart", JSON.stringify([]));
    cartSumCtx.setCartSum(0);
  }

  const calculateCartSum = () => {
    let cartSum = 0;
    cart.forEach(element => cartSum = cartSum + element.product.price * element.quantity);
    return cartSum.toFixed(2);
  }

  const decreaseQuantity = (index) => {
    cartSS[index].quantity = cartSS[index].quantity - 1; 
    cart[index].quantity = cart[index].quantity - 1; 
    if (cartSS[index].quantity <= 0) {
      removeFromCart(index);
    } else {
      setCart(cart.slice());
      sessionStorage.setItem("cart", JSON.stringify(cartSS));
    }
    cartSumCtx.setCartSum(calculateCartSum());
  }

  const increaseQuantity = (index) => {
    cartSS[index].quantity = cartSS[index].quantity + 1; 
    cart[index].quantity = cart[index].quantity + 1; 
    setCart(cart.slice());
    sessionStorage.setItem("cart", JSON.stringify(cartSS));
    cartSumCtx.setCartSum(calculateCartSum());
  }


  return ( 
    <div>
       { cart.length > 0 && <div className={styles.cart__top}>
          <button onClick={emptyCart}>Tühjenda</button>
          <div>Toodete koguarv {cart.length} tk</div>
       </div>}

        {cart.map((element, index) => 
          <div key={index} className={styles.product}>
            <img className={styles.image} src={element.product.image} alt="" />
            <div className={styles.name}>{element.product.name}</div>
            <div className={styles.price}>{element.product.price.toFixed(2)} €</div>
            <div className={styles.quantity}>
                <img className={styles.button} onClick={() => decreaseQuantity(index)} src={require("../images/minus.png")} alt="" />
                <div>{element.quantity} tk</div>
                <img className={styles.button} onClick={() => increaseQuantity(index)} src={require("../images/plus.png")} alt="" />
            </div>
            <div className={styles.sum}>{(element.product.price * element.quantity).toFixed(2)} €</div>
            <img className={styles.button} onClick={() => removeFromCart(index)} src={require("../images/remove.png")} alt="" />
          </div>)}

       { cart.length > 0 && <div className={styles.cart__bottom}>
          <ParcelMachines />

          <div>Kokku: {calculateCartSum()} €</div>
          <Payment sum={calculateCartSum()} />
       </div>}

       { cart.length === 0 && <div>Ostukorv on tühi. <Link to="/">Tooteid valima</Link> </div> }

    </div> );
}

export default Cart;

// Kui on leht halli/musta taustaga, on kompileerimise viga
//      Koodi kokku pakkides on viga leitud

// Kui leht on valge, siis on runtime viga
//      Selle leiab "parem klõps" -> "inspect" -> "console"


// e-maili saatmine https://www.emailjs.com/ 15-20
// kaardirakendus https://react-leaflet.js.org/ 15-20 <--- failid e-mailile
// piltide üleslaadimine Firebase Storage 30min <--- failid e-mailile + seadistamine Firebases
// useContext() sisselogimine/registreerumine    Context.Provider  terve koolituspäeva

// 16.nov - 0.6 päeva useContext / 0.4 päeva saame teha pisiasju
// 21.nov - lahendan proovitööd 0.5 päeva / 0.5 päeva useContext
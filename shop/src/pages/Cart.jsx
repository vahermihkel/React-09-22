import { useEffect, useMemo, useState } from "react";
import config from "../data/config.json";
import "../css/Cart.css";
// import productsFromFile from "../data/products.json";

function Cart() {                   // [{"id":1312,"quantity":4},{"id":59074235,"quantity":1},{"id":48267401,"quantity":4}]
                                    // [{"product":{"id": 1312, name: "asd"}, "quantity": 4},{},{}]
  const cartSS = useMemo(() => JSON.parse(sessionStorage.getItem("cart")) || [], []);
  const [cart, setCart] = useState([]);
  // KODUS: Ostukorvi sisu kuvamine samamoodi nagu eesti keelses
  // ostukorvist kustutamine samamoodi
  const [parcelMachines, setParcelMachines] = useState([]);

  // uef     siia lõiku ta läheb ainult 1x, pmst nagu käimaminemise funktsioon
  useEffect(() => {
    fetch(config.productsDbUrl)
      .then(res => res.json())
      .then(json => {
        const cartWithProducts = cartSS.map(element => {
          const productFound = json.find(product => product.id === element.id);
          // if (productFound !== undefined) {
          //   return {"product": productFound, "quantity": element.quantity}
          // } else {
          //   return undefined;
          // }
          return productFound !== undefined ? {"product": productFound, "quantity": element.quantity} : undefined;
        }).filter(element => element !== undefined);
        setCart(cartWithProducts);
      })
    fetch("https://www.omniva.ee/locations.json")
      .then(res => res.json())
      .then(json => setParcelMachines(json));
  }, [cartSS]);

  const removeFromCart = (productIndex) => {
    cartSS.splice(productIndex,1);
    cart.splice(productIndex,1);
    setCart(cart.slice());
    sessionStorage.setItem("cart", JSON.stringify(cartSS));
  }

  const emptyCart = () => {
    setCart([]);
    sessionStorage.setItem("cart", JSON.stringify([]));
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
  }

  const increaseQuantity = (index) => {
    cartSS[index].quantity = cartSS[index].quantity + 1; 
    cart[index].quantity = cart[index].quantity + 1; 
    setCart(cart.slice());
    sessionStorage.setItem("cart", JSON.stringify(cartSS));
  }

  return ( 
    <div>
       <div className="cart-top">
          <button onClick={emptyCart}>Tühjenda</button>
          <div>Toodete koguarv {cart.length} tk</div>
       </div>
        {cart.map((element, index) => 
          <div key={index} className="product">
            <img className="image" src={element.product.image} alt="" />
            <div className="name">{element.product.name}</div>
            <div className="price">{element.product.price.toFixed(2)} €</div>
            <div className="quantity">
                <img className="button" onClick={() => decreaseQuantity(index)} src={require("../images/minus.png")} alt="" />
                <div>{element.quantity} tk</div>
                <img className="button" onClick={() => increaseQuantity(index)} src={require("../images/plus.png")} alt="" />
            </div>
            <div className="sum">{(element.product.price * element.quantity).toFixed(2)} €</div>
            <img className="button" onClick={() => removeFromCart(index)} src={require("../images/remove.png")} alt="" />
          </div>)}

       <div className="cart-bottom">
        <select>
            {parcelMachines
              .filter(element => element.A0_NAME === "EE" && element.ZIP !== "96331")
              .map(element => 
                <option>{element.NAME}</option>)}
          </select>

          <div>Kokku: {calculateCartSum()} €</div>
       </div>
    </div> );
}

export default Cart;

// Kui on leht halli/musta taustaga, on kompileerimise viga
//      Koodi kokku pakkides on viga leitud

// Kui leht on valge, siis on runtime viga
//      Selle leiab "parem klõps" -> "inspect" -> "console"
import { useEffect, useMemo, useState } from "react";
import productsFromFile from "../data/products.json";

function Cart() {                   // [{"id":1312,"quantity":4},{"id":59074235,"quantity":1},{"id":48267401,"quantity":4}]
                                    // [{"product":{"id": 1312, name: "asd"}, "quantity": 4},{},{}]
  const cartSS = useMemo(() => JSON.parse(sessionStorage.getItem("cart")) || [], []);
  const [cart, setCart] = useState([]);
  // KODUS: Ostukorvi sisu kuvamine samamoodi nagu eesti keelses
  // ostukorvist kustutamine samamoodi
  const [parcelMachines, setParcelMachines] = useState([]);

  // uef     siia lõiku ta läheb ainult 1x, pmst nagu käimaminemise funktsioon
  useEffect(() => {
    const cartWithProducts = cartSS.map(element => {
        return {"product": productsFromFile.find(product => product.id === element.id), "quantity": element.quantity}
    });
    console.log(cartWithProducts);
    setCart(cartWithProducts);

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
        <button onClick={emptyCart}>Tühjenda</button>
        <div>Toodete koguarv {cart.length} tk</div>
        {cart.map((element, index) => 
          <div key={index}>
            <img src={element.product.image} alt="" />
            <div>{element.product.name}</div>
            <div>{element.product.price.toFixed(2)}</div>
            <button onClick={() => decreaseQuantity(index)}>-</button>
            <div>{element.quantity}</div>
            <button onClick={() => increaseQuantity(index)}>+</button>
            <div>{(element.product.price * element.quantity).toFixed(2)}</div>
            <button onClick={() => removeFromCart(index)}>x</button>
          </div>)}

        <select>
          {parcelMachines
            .filter(element => element.A0_NAME === "EE" && element.ZIP !== "96331")
            .map(element => 
              <option>{element.NAME}</option>)}
        </select>

        <div>Kokku: {calculateCartSum()} €</div>
    </div> );
}

export default Cart;

// Kui on leht halli/musta taustaga, on kompileerimise viga
//      Koodi kokku pakkides on viga leitud

// Kui leht on valge, siis on runtime viga
//      Selle leiab "parem klõps" -> "inspect" -> "console"
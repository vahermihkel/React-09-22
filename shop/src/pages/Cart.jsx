import { useEffect, useMemo, useState } from "react";
import config from "../data/config.json";
import styles from "../css/Cart.module.css";
import { Link } from "react-router-dom";
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

  const pay = () => {
    // enne maksma hakkamist ma salvestan tellimuse andmebaasi
    //                    1. kui klient maksab, aga läheb katki
    //                    2. saame tellimuse numbri
    const paymentData = {
      "api_username": "92ddcfab96e34a5f", //  turvaelement, kasutajanimi, mis peab ühtima headrsis oleva kasutajanimega
      "account_name": "EUR3D1", // konto nimi
      "amount": calculateCartSum(), // kogusumma
      "order_reference": Math.random()*999999, // tellimuse nr, error kui see tellimuse nr on juba tasutud
      "nonce": "a9b7f7e794" + Math.random()*999999 + new Date(), // turvaelement, iga päring peab olema unikaalne
      "timestamp": new Date(), // turvaelement, ajatempel
      "customer_url": "https://react09202.web.app" // aadress, kuhu teda hiljem tagasi suunata pärast maksmist
      }
    const headersData = {
      "Authorization": "Basic OTJkZGNmYWI5NmUzNGE1Zjo4Y2QxOWU5OWU5YzJjMjA4ZWU1NjNhYmY3ZDBlNGRhZA==",
      "Content-Type": "application/json"
    }
    fetch("https://igw-demo.every-pay.com/api/v4/payments/oneoff",{
      "method": "POST",
      "body": JSON.stringify(paymentData),
      "headers": headersData
    }).then(res => res.json())
      .then(json => window.location.href = json.payment_link)
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
        <select>
            {parcelMachines
              .filter(element => element.A0_NAME === "EE" && element.ZIP !== "96331")
              .map(element => 
                <option>{element.NAME}</option>)}
          </select>

          <div>Kokku: {calculateCartSum()} €</div>
          <button onClick={pay}>Maksma</button>
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
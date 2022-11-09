import { useNavigate, useParams } from "react-router-dom";
// import productsFromFile from "../../data/products.json";
import config from "../../data/config.json";
import { useEffect, useRef, useState } from "react";
import Spinner from 'react-bootstrap/Spinner';

function EditProduct() {
  // 1. object destructuring: const { productId } = useParams();
  // 2. objekti võtmist ja hilisemalt võtme kaudu:    const params = useParams();        params.productId
  const params = useParams();
  // const products = productsFromFile;
  const [isLoading, setIsLoading] = useState(true);
  const [idUnique, setIdUnique] = useState(true);
  const [dbProducts, setDbProducts] = useState([]);
                                       //    59074235  === "59074235"  --> 59074235
  const productFound = dbProducts.find(element => element.id === Number(params.productId));
  const index = dbProducts.indexOf(productFound);
  // const index2 = products.findIndex(element => element.id === Number(params.productId));
  // const productFound2 = products[index2];
  const idRef = useRef();
  const nameRef = useRef();
  const priceRef = useRef();
  const imageRef = useRef();
  const categoryRef = useRef();
  const descriptionRef = useRef();
  const activeRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(config.productsDbUrl)
      .then(res => res.json())
      .then(json => {
        setDbProducts(json.slice());
        setIsLoading(false);
      })
  }, []);

  const changeProduct = () => {
    // index????
    // muutmine käib järjekorranumbri alusel
    const newProduct = {
      "id": Number(idRef.current.value),
      "name": nameRef.current.value,
      "price": Number(priceRef.current.value),
      "image": imageRef.current.value,
      "category": categoryRef.current.value,
      "description": descriptionRef.current.value,
      "active": activeRef.current.checked,
    };
    dbProducts[index] = newProduct;
    fetch(config.productsDbUrl, {
      "method": "PUT",
      "body": JSON.stringify(dbProducts)
    }).then(() => {
      // setProducts(dbProducts.slice());
      // searchProducts();
      // toast.error("Toode kustutatud");
      navigate("/admin/maintain-products");
    })
  }

  const checkIfIdUnique = () => {
    if (params.productId !== idRef.current.value) {
      const found = dbProducts.find(element => element.id === Number(idRef.current.value));
      if (found === undefined) {
        console.log("ON UNIKAALNE");
        setIdUnique(true);
      } else {
        console.log("KELLEGAGI SAMA");
        setIdUnique(false);
        // idRef.current.className = "red";
      }
    } else {
      console.log("ON SAMA TAGASI");
      setIdUnique(true);
    }
  }

  return ( 
    <div>
     { isLoading === true && <Spinner animation="border" />}
      { productFound && 
        <div>
          { idUnique === false && <div>Sisestatud ID ei ole unikaalne!</div>}
          <label>ID</label> <br />
          <input ref={idRef} className={idUnique === false ? "red" : undefined} onChange={checkIfIdUnique} defaultValue={productFound.id} type="number" /> <br />
          <label>Name</label> <br />
          <input ref={nameRef} defaultValue={productFound.name} type="text" /> <br />
          <label>Price</label> <br />
          <input ref={priceRef} defaultValue={productFound.price} type="number" /> <br />
          <label>Image</label> <br />
          <input ref={imageRef} defaultValue={productFound.image} type="text" /> <br />
          <label>Category</label> <br />
          <input ref={categoryRef} defaultValue={productFound.category} type="text" /> <br />
          <label>Description</label> <br />
          <input ref={descriptionRef} defaultValue={productFound.description} type="text" /> <br />
          <label>Active</label> <br />
          <input ref={activeRef} defaultChecked={productFound.active} type="checkbox" /> <br />
          <button disabled={idUnique === false} onClick={changeProduct}>Change</button>
              {/*  disabled={!idUnique} */}
        </div>
      }
      { productFound === undefined && isLoading === false &&
        <div>
          Toodet ei leitud
        </div>
      }
    </div> );
}

export default EditProduct;

// SingleProduct KODUS
// 1. URL-s (App.js) peab olema võimalus siia lehele sattuda
// 2. URL-s peab olema muutuja muuda/:muutujaNimi kujul
// 3. MaintainProducts sees suunama sellele URL-le -> <Link to=""> pean kaasa saatma ka
//            unikaalsuse tunnuse (eestikeelses oli INDEX, siin ID)
// 4. Võtma siin failis selle ID ja proovime kuvada seda HTML-s (useParams() abil)
// 5. Võtame kõik tooted (productsFromFile / localStorage.getItem / andmebaasi päring)
// 6. Otsime kõikide toodete seast õige toote üles

// AddProduct KODUS
// 7. Teeme iga võtme kohta ref-i: ID, NAME, PRICE, IMAGE, CATEGORY, DESCRIPTION, ACTIVE
// 8. Teeme iga refi kohta ka inputi, seome ta ära ref-ga, lisaks igale inputile ka label
// 9. Nupuvajutusega paneme käima toote muutmise funktsiooni
// 10. Muuda toodet funktsiooni sees

// 11. Iga inputi sees on ka defaultValue (ACTIVE võti on boolean, seega tema on defaultChecked)
// 12. DefaultValue tuleb 6-s punktis leitud tootest
// 13. Kontrollid peale panna, kui on 6-s punktis leitud tühjus
// 14. Suuname ära MaintainProducts lehele kui on muudetud (useNavigate())
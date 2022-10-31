import { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import productsFromFile from "../../data/products.json";

function EditProduct() {
  // 1. object destructuring: const { productId } = useParams();
  // 2. objekti võtmist ja hilisemalt võtme kaudu:    const params = useParams();        params.productId
  const params = useParams();
  const products = productsFromFile;
                                       //    59074235  === "59074235"  --> 59074235
  const productFound = products.find(element => element.id === Number(params.productId));
  const index = products.indexOf(productFound);

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
    products[index] = newProduct;
    navigate("/admin/maintain-products");
  }

  return ( 
    <div>
      { productFound && 
        <div>
          <label>ID</label> <br />
          <input ref={idRef} defaultValue={productFound.id} type="number" /> <br />
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
          <button onClick={changeProduct}>Change</button>
        </div>
      }
      { productFound === undefined && 
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
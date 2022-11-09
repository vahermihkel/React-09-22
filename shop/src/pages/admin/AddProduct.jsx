import { useEffect, useRef, useState } from "react";
// import productsFromFile from "../../data/products.json";
import config from "../../data/config.json";
import { ToastContainer, toast } from 'react-toastify';

function AddProduct() {
  const idRef = useRef();
  const nameRef = useRef();
  const priceRef = useRef();
  const imageRef = useRef();
  const categoryRef = useRef();
  const descriptionRef = useRef();
  const activeRef = useRef();
  const [dbProducts, setDbProducts] = useState([]);

  useEffect(() => {
    fetch(config.productsDbUrl)
      .then(res => res.json())
      .then(json => setDbProducts(json.slice()))
  }, []);

  const addProduct = () => {
    const newProduct = {
      "id": Number(idRef.current.value),
      "name": nameRef.current.value,
      "price": Number(priceRef.current.value),
      "image": imageRef.current.value,
      "category": categoryRef.current.value,
      "description": descriptionRef.current.value,
      "active": activeRef.current.checked,
    };
    // productsFromFile.push(newProduct);
    dbProducts.push(newProduct);
    fetch(config.productsDbUrl, {
      "method": "PUT",
      "body": JSON.stringify(dbProducts)
    }).then(() => {
      toast.success("Toode lisatud");
      idRef.current.value = "";
      nameRef.current.value = "";
      priceRef.current.value = "";
      imageRef.current.value = "";
      categoryRef.current.value = "";
      descriptionRef.current.value = "";
      activeRef.current.checked = false;
    })
  }

  return ( <div>
    <ToastContainer />
    <label>ID</label> <br />
    <input ref={idRef} type="number" /> <br />
    <label>Name</label> <br />
    <input ref={nameRef} type="text" /> <br />
    <label>Price</label> <br />
    <input ref={priceRef} type="number" /> <br />
    <label>Image</label> <br />
    <input ref={imageRef} type="text" /> <br />
    <label>Category</label> <br />
    <input ref={categoryRef} type="text" /> <br />
    <label>Description</label> <br />
    <input ref={descriptionRef} type="text" /> <br />
    <label>Active</label> <br />
    <input ref={activeRef} type="checkbox" /> <br />
    <button onClick={addProduct}>Add</button>
  </div> );
}

export default AddProduct;
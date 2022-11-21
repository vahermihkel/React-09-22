import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Cart from './pages/Cart';
import HomePage from './pages/HomePage.jsx';
import AboutUs from './pages/AboutUs.jsx';
import Shops from './pages/Shops.jsx';
import SingleProduct from './pages/SingleProduct.jsx';
import AddProduct from './pages/admin/AddProduct.jsx';
import AdminHome from './pages/admin/AdminHome.jsx';
import EditProduct from './pages/admin/EditProduct.jsx';
import MaintainCategories from './pages/admin/MaintainCategories.jsx';
import MaintainProducts from './pages/admin/MaintainProducts.jsx';
import MaintainShops from './pages/admin/MaintainShops.jsx';
import NavigationBar from './components/NavigationBar';
import Login from './pages/Login';
import Signup from './pages/Signup';

import { useContext } from 'react';
import AuthContext from './store/AuthContext';

function App() {

  const authCtx = useContext(AuthContext);

  return (
    <div >
      <NavigationBar /> 
      
      <Routes>
        <Route path="" element={ <HomePage /> } />
        <Route path="cart" element={ <Cart /> } />
        <Route path="about-us" element={ <AboutUs /> } />
        <Route path="shops" element={ <Shops /> } />
        <Route path="product" element={ <SingleProduct /> } />
        <Route path="login" element={ <Login /> } />
        <Route path="signup" element={ <Signup /> } />
        { authCtx.loggedIn === true &&
         <>
          <Route path="admin/add-product" element={ <AddProduct /> } />
          <Route path="admin" element={ <AdminHome /> } />
          <Route path="admin/edit-product/:productId" element={ <EditProduct /> } />
          <Route path="admin/maintain-categories" element={ <MaintainCategories /> } />
          <Route path="admin/maintain-products" element={ <MaintainProducts /> } />
          <Route path="admin/maintain-shops" element={ <MaintainShops /> } />
          </>}
        { authCtx.loggedIn === false && 
          <Route path="admin/*" element={ <Navigate to="/login" /> } /> 
        }
         <Route path="*" element={ <div>404</div> } />
      </Routes>
    </div>
  );
}

export default App;

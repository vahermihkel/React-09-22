import { Route, Routes } from 'react-router-dom';
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

function App() {
  return (
    <div >
      <NavigationBar /> 
      
      <Routes>
        <Route path="" element={ <HomePage /> } />
        <Route path="cart" element={ <Cart /> } />
        <Route path="about-us" element={ <AboutUs /> } />
        <Route path="shops" element={ <Shops /> } />
        <Route path="product" element={ <SingleProduct /> } />
        <Route path="admin/add-product" element={ <AddProduct /> } />
        <Route path="admin" element={ <AdminHome /> } />
        <Route path="admin/edit-product/:productId" element={ <EditProduct /> } />
        <Route path="admin/maintain-categories" element={ <MaintainCategories /> } />
        <Route path="admin/maintain-products" element={ <MaintainProducts /> } />
        <Route path="admin/maintain-shops" element={ <MaintainShops /> } />
      </Routes>
    </div>
  );
}

export default App;

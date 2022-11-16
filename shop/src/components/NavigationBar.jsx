import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import CartSumContext from '../store/CartSumContext';

function NavigationBar() {
  const { t, i18n } = useTranslation();
  const cartSumCtx = useContext(CartSumContext);

  const changeLang = (newLang) => {
    i18n.changeLanguage(newLang);
    localStorage.setItem("language", newLang);
  }
  
  return ( 
    <Navbar bg="light" variant="light">
      <Container>
        <Navbar.Brand as={Link} to="/">Webshop</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/admin">{t("nav.admin")}</Nav.Link>
          <Nav.Link as={Link} to="/shops">{t("nav.shops")}</Nav.Link>
          <Nav.Link as={Link} to="/about-us">{t("nav.about")}</Nav.Link>
          <Nav.Link as={Link} to="/cart">{t("nav.cart")}</Nav.Link>
        </Nav>
        <div className="cart-sum">{cartSumCtx.cartSum ? cartSumCtx.cartSum : "0.00"} €</div>
        <img className="lang" onClick={() => changeLang("ee")} src={require("../images/estonia.png")} alt="" />
        <img className="lang" onClick={() => changeLang("en")} src={require("../images/uk.png")} alt="" />
      </Container>
    </Navbar> 
  );
}

export default NavigationBar;
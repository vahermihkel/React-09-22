// Class constructor Button cannot be invoked without 'new'
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function AdminHome() {
  return ( 
    <div>
      <Link to="/admin/add-product">
        <Button>Lisa toode</Button>
      </Link>
      <Link to="/admin/maintain-products">
        <Button>Halda tooteid</Button>
      </Link>
    </div> );
}

export default AdminHome;
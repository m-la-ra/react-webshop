import { Link } from "react-router";
import { useCart } from "../contexts/storeContext";
import "../scss/navbar.scss";

function Navbar() {
  const cartContext = useCart();

  return (
    <nav className="navbar">
      <Link to="/checkout">
        <button>Cart <span>{cartContext}</span></button>
      </Link>
    </nav>
  );
}

export default Navbar;

import { Link } from "react-router";
import { useCartContext } from "../contexts/storeContext";
import "../scss/navbar.scss";

function Navbar() {
  const cartContext = useCartContext();

  return (
    <nav className="navbar">
      <Link to="/checkout">
        <button>
          Cart <span>1</span>
        </button>
      </Link>
    </nav>
  );
}

export default Navbar;

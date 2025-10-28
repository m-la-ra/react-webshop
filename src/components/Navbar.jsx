import { Link } from "react-router";
import "../scss/navbar.scss";

function Navbar() {

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

import { Link } from "react-router";
import { useCartContext } from "../contexts/storeContext";
import "../scss/cart.scss";

function Cart() {
  const cartContext = useCartContext();

  return (
    <div>
      <Link to="/">
        <button>Back</button>
      </Link>
      <div className="cart-content">
        {cartContext &&
          cartContext.items.map((content, key) => (
            <article
              className="cart-content__card"
              key={key}
            >
              <p>{content.item.name}</p>
              <p>Quantity: {content.quantity}</p>
              <p>Color: {content.variant.color}</p>
              <p>Total: {content.quantity * content.item.price} SEK</p>
              <Link to={`/product/${content.item.id}`}>
                <button>Back to product page</button>
              </Link>
            </article>
          ))}
      </div>
    </div>
  );
}

export default Cart;

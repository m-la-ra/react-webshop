import { Link } from "react-router";
import { useCartContext, useCartDispatch } from "../contexts/storeContext";
import sanitizeItemName from "../helpers/sanitizeItemName";
import "../scss/cart.scss";

function Cart() {
  const cartContext = useCartContext();
  const cartDispatch = useCartDispatch();

  function handleClearCart() {
    cartDispatch({ type: "CLEAR" });
  }

  return (
    <section className="checkout">
      <Link to="/">
        <button className="back-button">&larr; Back</button>
      </Link>

      <button className="back-button back-button--clear" onClick={handleClearCart}>
        Clear all items
      </button>

      <h1>Checkout</h1>
      <div className="checkout-content">
        {cartContext &&
          cartContext.items.map((content, key) => (
            <article className="checkout-content__card" key={key}>
              <div className="checkout-content__text">
                <div>
                  <h2>
                    {sanitizeItemName(content.item.brand, content.item.name)}
                  </h2>
                  <p>Quantity: {content.quantity}</p>
                </div>
                <div>
                  <p>Color: {content.variant.color}</p>
                  <p>{content.selectedOption}</p>
                  <p>Total: {content.quantity * content.item.price} SEK</p>
                </div>
              </div>

              <Link to={`/product/${content.item.id}`}>
                <button className="back-button">
                  &larr; Back to product page
                </button>
              </Link>
            </article>
          ))}
      </div>
    </section>
  );
}

export default Cart;

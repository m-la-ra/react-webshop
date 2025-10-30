import { Link } from "react-router";
import { useCartContext, useCartDispatch } from "../contexts/storeContext";
import { sanitizeItemName } from "../helpers/sanitizeItemName";
import "../scss/cart.scss";

function Cart() {
  const cartContext = useCartContext();
  const cartDispatch = useCartDispatch();

  function handleClearCart() {
    cartDispatch({ type: "CLEAR" });
  }

  function handleSetQuantity(content, itemQuantity) {
    const newQuantity = Math.max(0, Number(itemQuantity));

    const originalQuantity =
      content.variant.originalQuantity ?? content.quantity;

    const updatedQuantity = Math.min(newQuantity, originalQuantity);

    if (updatedQuantity === 0) {
      cartDispatch({
        type: "DELETE_ITEM",
        payload: { itemKey: content.itemKey },
      });
    } else {
      cartDispatch({
        type: "SET_QUANTITY",
        payload: { itemKey: content.itemKey, quantity: updatedQuantity },
      });
    }
  }

  return (
    <section className="checkout">
      <h1>Checkout</h1>
      <Link to="/">
        <button className="back-button">&larr; Back</button>
      </Link>

      <button
        className="back-button back-button--clear"
        onClick={handleClearCart}
      >
        Clear all items
      </button>

      <div className="checkout-content">
        {cartContext &&
          cartContext.items.map((content, key) => (
            <article className="checkout-content__card" key={key}>
              <div className="checkout-content__text">
                <div>
                  <h2>
                    {sanitizeItemName(content.item.brand, content.item.name)}
                  </h2>
                  <p>Quantity:</p>
                  <input
                    type="number"
                    min="0"
                    value={content.quantity}
                    onChange={(e) => handleSetQuantity(content, e.target.value)}
                  />
                </div>
                <div>
                  <p>
                    Color:&nbsp;
                    <span
                      className="item-color"
                      style={{ backgroundColor: content.variant.color }}
                    />
                  </p>

                  {content.selectedOption && (
                    <p>Option: {content.selectedOption}</p>
                  )}
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

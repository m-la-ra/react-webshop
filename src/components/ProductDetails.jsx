import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { fetchItemById } from "../api/fetchData";
import { useCartDispatch, useCartContext } from "../contexts/storeContext";
import "../scss/productDetails.scss";

const ProductDetails = () => {
  const { id } = useParams();
  const [variantIndex, setVariantIndex] = useState(0);
  const [item, setItem] = useState(null);

  const cartDispatch = useCartDispatch();

  useEffect(() => {
    fetchItemById(id)
      .then((data) => setItem(data || { options: [] }))
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [id]);

  if (!item) return <h1>Loading...</h1>;

  const variants = item.options || [];
  const selectedVariant = variants[variantIndex] || {};
  const isVariantAvailable =
    item.available && (selectedVariant.quantity || 0) > 0;

  function handleAddItem() {
    if (!isVariantAvailable) return;
    cartDispatch({
      type: "ADD_ITEM",
      payload: { item, variant: selectedVariant, quantity: 1 },
    });
  }

  function handleRemoveItem() {
    if (!item) return;
    const itemKey = `${item.id}-${JSON.stringify(selectedVariant)}`;
    cartDispatch({ type: "REMOVE_ITEM", payload: { itemKey } });
  }

  function handleDeleteItem() {
    if (!item) return;
    const itemKey = `${item.id}-${JSON.stringify(selectedVariant)}`;
    cartDispatch({ type: "DELETE_ITEM", payload: { itemKey } });
  }

  return (
    <article className="item__card">
      <picture>
        <img
          srcSet="https://placehold.co/300x300 480w, https://placehold.co/300x300 800w"
          sizes="(width <= 600px) 480px, 800px"
          src="https://placehold.co/300x300"
          alt={item.name}
        />
      </picture>

      <div className="item__card-text">
        <p>{item.name}</p>
        <p>{item.price} SEK</p>

        <div className="item__card-colors">
          {item.options &&
            item.options.map((option, index) => (
              <div
                key={index}
                className="item__card-color"
                style={{ backgroundColor: option.color }}
              />
            ))}
        </div>
        <button onClick={handleAddItem}>+</button>
        <button onClick={handleRemoveItem}>-</button>
        <button onClick={handleDeleteItem}>Delete</button>
        <p>{item.available ? "In stock" : "Out of stock"}</p>
      </div>
    </article>
  );
};

export default ProductDetails;

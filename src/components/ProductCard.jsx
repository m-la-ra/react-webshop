import { Link } from "react-router";
import {sanitizeItemName} from "../helpers/sanitizeItemName";
import "../scss/productCard.scss";

const ProductCard = ({ item }) => {
  if (!item) return null;
  function isItemAvailable(item) {
    return item.options?.some((option) => (option.quantity || 0) > 0);
  }

  return (
    <article className="item__card">
      <picture>
        <img
          src="https://placehold.co/480x480"
          alt={item.name}
        />
      </picture>

      <div className="item__card-text">
        <h2>{sanitizeItemName(item.brand, item.name)}</h2>
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

        <p>{isItemAvailable(item) ? "In stock" : "Out of stock"}</p>

        <Link to={`/product/${item.id}`}>
          <button type="button">Details</button>
        </Link>
      </div>
    </article>
  );
};

export default ProductCard;

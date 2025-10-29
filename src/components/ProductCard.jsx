import { Link } from "react-router";
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
          srcSet="https://placehold.co/300x300 480w, https://placehold.co/300x300 800w"
          sizes="(width <= 600px) 480px, 800px"
          src="https://placehold.co/300x300"
          alt={item.name}
        />
      </picture>

      <div className="item__card-text">
        <h2>{item.brand}</h2>
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

        <p>{isItemAvailable(item) ? "In stock" : "Out of stock"}</p>

        <Link to={`/product/${item.id}`}>
          <button type="button">Details</button>
        </Link>
      </div>
    </article>
  );
};

export default ProductCard;

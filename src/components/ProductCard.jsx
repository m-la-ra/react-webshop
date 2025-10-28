import { Link } from "react-router";
import '../scss/productCard.scss'
const ProductCard = ({ item }) => {
  if (!item) return null;

  return (
    <article className="item__card" key={item.id}>
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

        <p>{item.available ? "In stock" : "Out of stock"}</p>

        <Link to={`/product/${item.id}`}>
          <button type="button">Details</button>
        </Link>
      </div>
    </article>
  );
};

export default ProductCard;

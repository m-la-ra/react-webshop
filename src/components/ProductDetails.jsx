import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { fetchItemById } from "../api/fetchData";
import "../scss/productDetails.scss";

const ProductDetails = () => {
  const { id } = useParams();

  const [itemDetails, setItemDetails] = useState(null);

  useEffect(() => {
    fetchItemById(id)
      .then(setItemDetails)
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [id]);
  console.log(itemDetails);

  if (!itemDetails) return <h1>Loading...</h1>;

  return (
    <article className="item__card">
      <picture>
        <img
          srcSet="https://placehold.co/300x300 480w, https://placehold.co/300x300 800w"
          sizes="(width <= 600px) 480px, 800px"
          src="https://placehold.co/300x300"
          alt={itemDetails.name}
        />
      </picture>

      <div className="item__card-text">
        <p>{itemDetails.name}</p>
        <p>{itemDetails.price} SEK</p>

        <div className="item__card-colors">
          {itemDetails.options &&
            itemDetails.options.map((option, index) => (
              <div
                key={index}
                className="item__card-color"
                style={{ backgroundColor: option.color }}
              />
            ))}
        </div>

        <p>{itemDetails.available ? "In stock" : "Out of stock"}</p>
      </div>
    </article>
  );
};

export default ProductDetails;

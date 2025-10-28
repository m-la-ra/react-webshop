import { useEffect, useState } from "react";
import { fetchData } from "../api/fetchData";
import "../scss/productList.scss";
import ProductCard from "./ProductCard";

const ProductList = () => {
  const [items, setItems] = useState(null);

  useEffect(() => {
    fetchData()
      .then(setItems)
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  if (!items) return <div>Loading...</div>;

  return (
    <section className="item-list">
      {items.map((item) => (
        <ProductCard item={item} />
      ))}
    </section>
  );
};

export default ProductList;

import "../scss/productList.scss";
import ProductCard from "./ProductCard";
import { useInventoryContext } from "../contexts/storeContext";

const ProductList = () => {
  const inventoryContext = useInventoryContext();
  const inventory = inventoryContext ? Object.values(inventoryContext) : [];

  if (!inventory || inventory.length === 0) return <div>Loading...</div>;

  return (
    <section className="item-list">
      {inventory.map((item) => (
        <ProductCard item={item} key={item.id} />
      ))}
    </section>
  );
};

export default ProductList;

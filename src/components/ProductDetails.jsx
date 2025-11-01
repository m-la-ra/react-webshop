import { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  useCartDispatch,
  useCartContext,
  useInventoryContext,
} from "../contexts/storeContext";
import { Link } from "react-router";
import { sanitizeItemName } from "../helpers/sanitizeItemName";
import "../scss/productDetails.scss";

const ProductDetails = () => {
  const { id } = useParams();
  const [variantIndex, setVariantIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(undefined);
  const [item, setItem] = useState(null);

  const cartContext = useCartContext();
  const cartDispatch = useCartDispatch();
  const inventoryContext = useInventoryContext();
  const inventory = inventoryContext ? Object.values(inventoryContext) : [];
  const currentItemById = inventory.find((item) => item.id === Number(id));

  useEffect(() => {
    setItem(currentItemById);
  }, [currentItemById]);

  if (!item) return <h1>Loading...</h1>;

  const variants = item.options || [];

  const selectedVariant = variants[variantIndex] || {};

  const isVariantAvailable = (selectedVariant.quantity || 0) > 0;

  const variantOptions = {
    ...(selectedVariant.power && { power: selectedVariant.power }),
    ...(selectedVariant.storage && { storage: selectedVariant.storage }),
  };

  let defaultOption;

  if (!selectedOption) {
    if (variantOptions.power) {
      defaultOption = `${variantOptions.power[0].toString()}W`;
    }

    if (variantOptions.storage) {
      defaultOption = `${variantOptions.storage[0]}GB`;
    }
  }

  const selectedItem = item.options[variantIndex];

  const itemKey = `${item.id}-${selectedItem.color.toString()}-${
    selectedOption ?? defaultOption
  }`;

  function handleAddItem() {
    if (!isVariantAvailable) return;

    const updatedVariants = [...item.options];

    updatedVariants[variantIndex] = {
      ...updatedVariants[variantIndex],
      quantity: updatedVariants[variantIndex].quantity - 1,
    };

    setItem({ ...item, options: updatedVariants });

    cartDispatch({
      type: "ADD_ITEM",
      payload: {
        item,
        variant: updatedVariants[variantIndex],
        itemKey,
        quantity: 1,
        selectedOption: selectedOption ?? defaultOption,
      },
    });
  }

  function handleRemoveItem() {
    if (!item) return;

    cartDispatch({ type: "REMOVE_ITEM", payload: { itemKey } });

    const updatedVariants = [...item.options];
    updatedVariants[variantIndex] = {
      ...selectedItem,
      quantity: Math.min(
        selectedItem.quantity + 1,
        selectedItem.originalQuantity
      ),
    };

    setItem({ ...item, options: updatedVariants });
  }

  function handleDeleteItem() {
    if (!item) return;

    const cartItem = cartContext.items.find(
      (cartItem) => cartItem.itemKey === itemKey
    );
    const quantityInCart = cartItem ? cartItem.quantity : 0;

    if (quantityInCart > 0) {
      const updatedVariants = [...item.options];
      updatedVariants[variantIndex] = {
        ...selectedItem,
        quantity: selectedItem.originalQuantity,
      };
      setItem({ ...item, options: updatedVariants });

      cartDispatch({ type: "DELETE_ITEM", payload: { itemKey } });
    }
  }

  return (
    <section>
      <h1>Product details</h1>
      <Link to="/">
        <button className="back-button">&larr; Back</button>
      </Link>

      <section className="item-details">
        <article className="item-details__card">
          <picture>
            <img
              src="https://placehold.co/480x480"
              alt={item.name}
              loading="lazy"
            />
          </picture>

          <div className="item-details__card-text">
            <h2>{sanitizeItemName(item.brand, item.name)}</h2>
            <p>Price: {item.price} SEK</p>
            <p>Weight: {item.weight} kg</p>
            <div className="item-details__card-colors">
              {variants &&
                variants.map((option, index) => (
                  <div
                    key={index}
                    className={
                      index === variantIndex
                        ? "item-color item-color--selected"
                        : "item-color"
                    }
                    style={
                      option.quantity > 0
                        ? { backgroundColor: option.color }
                        : { backgroundColor: option.color, opacity: 0.5 }
                    }
                    onClick={() => setVariantIndex(index)}
                    title={`Color: ${option.color}`}
                  />
                ))}
            </div>

            {variantOptions.power && (
              <>
                <label htmlFor="power-options">Power: </label>
                <select
                  name="power-options"
                  id="power-menu"
                  value={selectedOption}
                  onChange={(e) => setSelectedOption(e.target.value)}
                >
                  {variantOptions.power.map((alternative, key) => (
                    <option key={key}>{alternative}W</option>
                  ))}
                </select>
              </>
            )}
            {variantOptions.storage && (
              <>
                <label htmlFor="storage-options">Storage: </label>
                <select
                  name="storage-options"
                  id="storage-menu"
                  value={selectedOption}
                  onChange={(e) => setSelectedOption(e.target.value)}
                >
                  {variantOptions.storage.map((alternative, key) => (
                    <option key={key}>{alternative}GB</option>
                  ))}
                </select>
              </>
            )}

            <p>
              {variants[variantIndex].quantity
                ? `In stock:  ${variants[variantIndex].quantity} available`
                : "Out of stock"}
            </p>

            <button
              onClick={handleAddItem}
              disabled={!isVariantAvailable}
              className="button--add"
            >
              +
            </button>
            <button onClick={handleRemoveItem}>-</button>
            <button onClick={handleDeleteItem} className="button--delete">
              <svg
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 6.77273H9.2M19 6.77273H14.8M9.2 6.77273V5.5C9.2 4.94772 9.64772 4.5 10.2 4.5H13.8C14.3523 4.5 14.8 4.94772 14.8 5.5V6.77273M9.2 6.77273H14.8M6.4 8.59091V15.8636C6.4 17.5778 6.4 18.4349 6.94673 18.9675C7.49347 19.5 8.37342 19.5 10.1333 19.5H13.8667C15.6266 19.5 16.5065 19.5 17.0533 18.9675C17.6 18.4349 17.6 17.5778 17.6 15.8636V8.59091M9.2 10.4091V15.8636M12 10.4091V15.8636M14.8 10.4091V15.8636"
                  stroke="#fff"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </article>
      </section>
    </section>
  );
};

export default ProductDetails;

import { CartContext } from "../store/shopping-cart-context.jsx";
import { useContext } from "react";

export default function Product({ id, image, title, price, description }) {
  const { addToCart, items } = useContext(CartContext);
  console.log(items);

  const filteredQuantity = items.filter((item) => item.id === id);
  const filteredQuantityCount =
    filteredQuantity.length > 0 ? filteredQuantity[0].quantity : 0;
  let quantity = null;
  if (filteredQuantityCount > 0) {
    quantity = `(${filteredQuantityCount})`;
  }
  return (
    <article className="product">
      <img src={image} alt={title} />
      <div className="product-content">
        <div>
          <h3>{title}</h3>
          <p className="product-price">${price}</p>
          <p>{description}</p>
        </div>
        <p className="product-actions">
          <button onClick={() => addToCart(id)}>Add to Cart {quantity}</button>
        </p>
      </div>
    </article>
  );
}

import Header from "./components/Header.jsx";
import Shop from "./components/Shop.jsx";
import { DUMMY_PRODUCTS } from "./dummy-products.js";
import CartContextProvider from "./store/shopping-cart-context.jsx";
import Product from "./components/Product.jsx";

function App() {
  return (
    <CartContextProvider>
      <Header />
      <Shop>
        {DUMMY_PRODUCTS.map((item) => (
          <li key={item.id}>
            <Product {...item} />
          </li>
        ))}
      </Shop>
    </CartContextProvider>
  );
}

export default App;

import { Routes, Route } from "react-router";
import ProductList from "./ProductList";
import Cart from "./Cart";
import ProductDetails from "./ProductDetails";
import Navbar from "./Navbar";


function App() {

  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/" element={<ProductList />} />
      <Route path="/checkout" element={<Cart />} />
      <Route path="/product/:id" element={<ProductDetails />} />
    </Routes>
    </>
  );
}

export default App;

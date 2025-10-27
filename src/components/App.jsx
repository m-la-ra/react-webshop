import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./Home";
import Cart from "./Cart";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/checkout" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

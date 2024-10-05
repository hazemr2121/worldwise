import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Pricing from "./pages/Pricing";
import Product from "./pages/Product";
import PageNotFound from "./pages/PageNotFound";
import AppLayount from "./pages/AppLayout";
import Login from "./pages/Login";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/product" element={<Product />} />
        <Route path="/login" element={<Login />} />
        <Route path="/app" element={<AppLayount />}>
          <Route index element={<p> List </p>} />
          <Route path="cities" element={<p> List of cities </p>} />
          <Route path="countries" element={<p> Countries </p>} />
          <Route path="form" element={<p> Form </p>} />
        </Route>
        {/* Not found page */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

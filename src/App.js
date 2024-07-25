import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CheckOutPage from "./pages/CheckOutPage";
import OrdersPage from "./pages/OrdersPage";
import AdminPrivateRoute from "./components/AdminPrivateRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route element={<AdminPrivateRoute />}>
        <Route path="/admin/" element={<AdminDashboard />} />
      </Route>

      <Route path="/authentication/login/" element={<Login />} />

      <Route path="/products/" element={<ProductsPage />} />
      <Route
        path="/product/:NAME/:productID/"
        element={<ProductDetailsPage />}
      />

      <Route path="/checkout/" element={<CheckOutPage />} />
      <Route path="/orders/" element={<OrdersPage />} />
    </Routes>
  );
}

export default App;

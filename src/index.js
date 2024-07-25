import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import AuthContext from "./contexts/AuthContext";
import ProductsContext from "./contexts/ProductsContext";
import CartContext from "./contexts/CartContext";
import OrderContext from "./contexts/OrderContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider>
        <AuthContext>
          <ProductsContext>
            <CartContext>
              <OrderContext>
                <App />
              </OrderContext>
            </CartContext>
          </ProductsContext>
        </AuthContext>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);

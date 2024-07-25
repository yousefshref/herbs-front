import React, { useContext, useEffect, useState } from "react";
import ClientHeader from "../components/ClientHeader";
import { CartContextProvider } from "../contexts/CartContext";
import { getCookie } from "../utlits/Functions";

import CartComponent from "../components/CartComponent";
import OrderForm from "../components/OrderForm";
import LoadingPage from "../components/LoadingPage";
import { OrderContextProvider } from "../contexts/OrderContext";

const CheckOutPage = () => {
  const cartContext = useContext(CartContextProvider);

  const carts = cartContext.carts;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (getCookie("token")) {
      cartContext.getCarts();
    } else {
      cartContext.setCarts(JSON.parse(localStorage.getItem("cart")) || []);
    }
    setLoading(false);
  }, []);

  const [totalPrice, setTotalPrice] = useState(0);

  const getTheTotalPrice = () => {
    // reduce the total price
    const totalPrice = carts?.reduce((acc, cart) => {
      return acc + cart.quantity * cart?.variant_details?.sell_price;
    }, 0);

    setTotalPrice(totalPrice);
  };

  useEffect(() => {
    getTheTotalPrice();
  }, [carts]);

  const orderContext = useContext(OrderContextProvider);

  return (
    <div className="cairo flex flex-col" dir="rtl">
      {loading || orderContext?.loading ? <LoadingPage /> : null}
      <ClientHeader />
      <div className="flex md:flex-row flex-col gap-3 mt-10">
        {/* items */}
        <div className="md:w-1/2 w-full flex flex-col gap-4 p-3 h-fit">
          {carts?.map((cart, index) => (
            <CartComponent key={index} cart={cart} />
          ))}
          <hr />
          <div className="flex flex-col gap-1">
            <p>المجموع النهائي: </p>
            <p className="font-bold text-2xl text-green-600">
              {totalPrice} EGP
            </p>
          </div>
        </div>
        <div className="md:w-1/2 w-full p-3 flex flex-col justify-center h-fit">
          <OrderForm />
        </div>
      </div>
    </div>
  );
};

export default CheckOutPage;

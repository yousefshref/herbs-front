import React, { createContext } from "react";
import { getCookie } from "../utlits/Functions";
import axios from "axios";
import { server } from "../utlits/Variables";

const OrderContext = ({ children }) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Token ${getCookie("token")}`,
  };

  const [orders, setOrders] = React.useState([]);
  const getOrders = async ({ status = "", date_from = "", date_to = "" }) => {
    const res = await axios.get(
      `${server}api/orders/?status=${status}&date_from=${date_from}&date_to=${date_to}`,
      {
        headers,
      }
    );
    setOrders(res.data);
    return res;
  };

  const createOrder = async (data) => {
    const res = await axios.post(`${server}api/orders/`, data, {
      headers,
    });
    return res;
  };

  return (
    <OrderContextProvider.Provider
      value={{ orders, setOrders, getOrders, createOrder }}
    >
      {children}
    </OrderContextProvider.Provider>
  );
};

export default OrderContext;
export const OrderContextProvider = createContext();

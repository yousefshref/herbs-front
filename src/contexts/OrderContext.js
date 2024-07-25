import React, { createContext } from "react";
import { getCookie } from "../utlits/Functions";
import axios from "axios";
import { server } from "../utlits/Variables";

const OrderContext = ({ children }) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Token ${getCookie("token")}`,
  };

  const [loading, setLoading] = React.useState(false);

  const [orders, setOrders] = React.useState([]);
  const getOrders = async ({ status = "", date_from = "", date_to = "" }) => {
    setLoading(true);
    const res = await axios.get(
      `${server}api/orders/?status=${status}&date_from=${date_from}&date_to=${date_to}`,
      {
        headers,
      }
    );
    setOrders(res.data);
    setLoading(false);
    return res;
  };

  const createOrder = async (data) => {
    setLoading(true);
    const res = await axios.post(`${server}api/orders/`, data, {
      headers,
    });
    setLoading(false);
    return res;
  };

  return (
    <OrderContextProvider.Provider
      value={{ orders, setOrders, getOrders, createOrder, loading }}
    >
      {children}
    </OrderContextProvider.Provider>
  );
};

export default OrderContext;
export const OrderContextProvider = createContext();

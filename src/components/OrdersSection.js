import React, { useEffect, useState } from "react";
import { OrderContextProvider } from "../contexts/OrderContext";
import LoadingPage from "./LoadingPage";
import { Alert, AlertIcon } from "@chakra-ui/react";

const OrdersSection = ({ date_from, date_to }) => {
  const orderContext = React.useContext(OrderContextProvider);

  const orders = orderContext?.orders;

  const [loading, setLoading] = useState(true);

  const [status, setStatus] = useState("");

  useEffect(() => {
    setLoading(true);
    orderContext.getOrders({
      status,
      date_from,
      date_to,
    });
    setLoading(false);
  }, [status, date_from, date_to]);
  return (
    <div className="md:w-[65%] w-full relative h-fit p-2 rounded-lg flex flex-col gap-3">
      {loading && <LoadingPage />}
      <div className="flex gap-4">
        <div
          onClick={() => {
            if (status == "Pending") {
              setStatus("");
            } else {
              setStatus("Pending");
            }
          }}
          className={`
            p-3 text-center rounded-l cursor-pointer hover:rounded-xl bg-white flex flex-col gap-4 border transition-all hover:border-slate-700 hover:bg-slate-700 hover:text-white h-fit w-1/3
            ${
              status == "Pending"
                ? "border-slate-700 bg-slate-700 text-white"
                : ""
            }
            `}
        >
          <p className="md:text-3xl text-xl">في الأنتظار</p>
          <p>PENDING</p>
        </div>
        <div
          onClick={() => {
            if (status == "Shipped") {
              setStatus("");
            } else {
              setStatus("Shipped");
            }
          }}
          className={`
            p-3 text-center rounded-l cursor-pointer hover:rounded-xl bg-white flex flex-col gap-4 border transition-all hover:border-slate-700 hover:bg-slate-700 hover:text-white h-fit w-1/3
            ${
              status == "Shipped"
                ? "border-slate-700 bg-slate-700 text-white"
                : ""
            }
            `}
        >
          <p className="md:text-3xl text-xl">في الطريق</p>
          <p>SHIPPED</p>
        </div>
        <div
          onClick={() => {
            if (status == "Delivered") {
              setStatus("");
            } else {
              setStatus("Delivered");
            }
          }}
          className={`
            p-3 text-center rounded-l cursor-pointer hover:rounded-xl bg-white flex flex-col gap-4 border transition-all hover:border-slate-700 hover:bg-slate-700 hover:text-white h-fit w-1/3
            ${
              status == "Delivered"
                ? "border-slate-700 bg-slate-700 text-white"
                : ""
            }
            `}
        >
          <p className="md:text-3xl text-xl">تم التوصيل</p>
          <p>ARRIVED</p>
        </div>
      </div>
      <div className="flex flex-col gap-14">
        <div className="flex-wrap flex gap-3 justify-around p-3 rounded-lg from-slate-100 to-yellow-100 bg-gradient-to-tr">
          {orders?.length > 0 ? (
            orders?.map((order) => (
              <div
                key={order?.id}
                className="flex relative sm:flex-row flex-col text-gray-700 gap-2 items-center w-full p-2 bg-white rounded-lg"
              >
                <small className="absolute text-xs bottom-2 left-2">
                  {new Date(order?.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })}
                </small>
                <div className="w-full sm:w-1/2 max-h-[170px] h-fit overflow-y-scroll flex p-2 flex-col gap-2">
                  {order?.items_details?.map((item) => (
                    <div
                      key={item?.id}
                      className="flex w-full p-1 rounded-lg bg-indigo-50 gap-3"
                    >
                      <img
                        className="w-1/3"
                        src={item?.product_details?.images_details[0]?.image}
                        alt=""
                      />
                      <div className="flex flex-col justify-center">
                        <strong>{item?.variant_details?.name}</strong>
                        <small>{item?.product_details?.name}</small>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col gap-1 justify-center w-full sm:w-1/2">
                  <div className="flex text-xs items-center gap-2">
                    <p>{order?.name}</p>
                    <p>( {order?.phone} )</p>
                  </div>
                  <p></p>
                  <p className="text-xs">{order?.address}</p>
                  <p className="text-xs">{order?.state_details?.name}</p>
                  <p className="text-2xl font-bold text-green-500">
                    {order?.total} EGP
                  </p>
                  <p
                    className={`p-1 w-fit h-fit rounded-full text-xs px-3 ${
                      order?.status == "Pending" && "bg-yellow-200"
                    }
                        ${order?.status == "Shipped" && "bg-blue-200"}
                        ${order?.status == "Delivered" && "bg-green-200"}
                        `}
                  >
                    {order?.status}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <Alert className="shadow-md" status="warning">
              <AlertIcon />
              ليس لديك طلبات في الوقت الحالي
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrdersSection;

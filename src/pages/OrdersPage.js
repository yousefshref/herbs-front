import React, { useEffect, useState } from "react";
import ClientHeader from "../components/ClientHeader";
import { Button, Input } from "@chakra-ui/react";
import OrdersSection from "../components/OrdersSection";
import {
  getCookie,
  getCurrentDate,
  getCurrentDateMinusDays,
} from "../utlits/Functions";
import { OrderContextProvider } from "../contexts/OrderContext";
import { AuthContextProvider } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import BGColor from "../components/BGColor";

const OrdersPage = () => {
  const [date_from, setDate_from] = useState(getCurrentDateMinusDays(7));
  const [date_to, setDate_to] = useState(getCurrentDate());

  const orderContext = React.useContext(OrderContextProvider);

  const userContext = React.useContext(AuthContextProvider);

  const user = userContext.user;

  useEffect(() => {
    userContext.getUser();
  }, []);

  if (!user || !getCookie("token")) {
    return (
      <div dir="rtl" className="cairo flex flex-col h-[100vh]">
        <ClientHeader />
        <div className="flex flex-col gap-2 p-2 h-[100vh] items-center relative justify-center">
          <BGColor
            bgColor={"bg-indigo-300/40"}
            padding={"p-10"}
            left={"-left-[3vw]"}
            top={"-top-[3vw]"}
            className={"w-[300px] rounded-full h-[300px] md:block hidden"}
          />
          <BGColor
            bgColor={"bg-yellow-200/30"}
            padding={"p-10"}
            left={"-right-[5vw]"}
            top={"-top-[15vw]"}
            className={"w-[300px] rounded-full h-[300px]"}
          />
          <BGColor
            bgColor={"bg-red-300/10"}
            padding={"p-20"}
            left={"-right-[5vw]"}
            top={"-bottom-[15vw]"}
            className={"w-[500px] rounded-full h-[500px]"}
          />
          <p>لا يوجد لديك حساب, يمكنك التسجيل حتي تتبع طلباتك</p>
          <Button variant={"solid"} colorScheme="green" paddingX={"20px"}>
            <Link to="/authentication/login/">تسجيل الدخول</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="cairo flex flex-col" dir="rtl">
      <ClientHeader />
      <div className="flex md:flex-row flex-col-reverse md:gap-0 gap-20 mt-14 p-3">
        <OrdersSection date_from={date_from} date_to={date_to} />
        <div className="relative md:w-[35%] md:min-w-[35%] w-full h-fit p-2 rounded-lg shadow-lg from-red-50/80 to-slate-100 bg-gradient-to-b">
          <img
            className="w-[80px] absolute md:-top-[4.4vw] -bottom-[65px] md:rotate-0 rotate-45 -z-10 md:-right-[3vw] -right-[0px] drop-shadow-md"
            alt=""
            src="/check-out.png"
          />
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 justify-between flex-col">
              <div className="w-full text-start items-end justify-between flex gap-3">
                <p>عدد اوردراتك</p>
                <small className="text-xs">
                  أخر{" "}
                  {Math.ceil(
                    (new Date(date_to) - new Date(date_from)) /
                      (1000 * 3600 * 24)
                  )}{" "}
                  ايام
                </small>
              </div>
              <div className="flex mt-2 w-full gap-5 justify-between text-xs">
                <div className="w-1/2 flex items-center gap-2">
                  <p>من:</p>
                  <Input
                    value={date_from}
                    onChange={(e) => {
                      setDate_from(e.target.value);
                    }}
                    backgroundColor={"white"}
                    className="w-1/2"
                    type="date"
                    size={"xs"}
                  />
                </div>
                <div className="w-1/2 flex items-center gap-2">
                  <p>إلي:</p>
                  <Input
                    value={date_to}
                    onChange={(e) => {
                      setDate_to(e.target.value);
                    }}
                    backgroundColor={"white"}
                    className="w-1/2"
                    type="date"
                    size={"xs"}
                  />
                </div>
              </div>
            </div>
            <div className="flex items-end gap-2 text-5xl mt-3 justify-center">
              <strong className="bg-gradient-to-t from-indigo-900 to-black/45 bg-clip-text text-transparent">
                {orderContext?.orders?.length}
              </strong>
              <small className="text-sm">اوردرات</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;

import React, { useEffect } from "react";
import { CiHeart, CiSearch, CiShoppingCart, CiUser } from "react-icons/ci";
import { Link } from "react-router-dom";
import { CartContextProvider } from "../contexts/CartContext";
import { getCookie } from "../utlits/Functions";
import { Button, Input } from "@chakra-ui/react";
import { BiLogIn, BiLogOut, BiTrash, BiUserCircle } from "react-icons/bi";
import CartItemComponent from "./CartItemComponent";
import { AuthContextProvider } from "../contexts/AuthContext";

const ClientHeader = () => {
  const cartsContext = React.useContext(CartContextProvider);

  const [openedCart, setOpenedCart] = React.useState(false);

  const carts = cartsContext.carts;

  useEffect(() => {
    if (getCookie("token") && openedCart) {
      cartsContext.getCarts();
    } else {
      cartsContext?.setCarts(JSON.parse(localStorage.getItem("cart")) || []);
    }
  }, [openedCart]);

  const authContext = React.useContext(AuthContextProvider);

  const user = authContext.user;

  useEffect(() => {
    authContext.getUser();
  }, []);

  const [openProfile, setOpenProfile] = React.useState(false);

  return (
    <header className="flex justify-between p-2 bg-white shadow-md px-5 items-center gap-5 z-50">
      {openedCart || openProfile ? (
        <div
          onClick={() => {
            setOpenedCart(false);
            setOpenProfile(false);
          }}
          className="fixed left-0 bottom-0 w-full h-full bg-black/20 z-[80]"
        ></div>
      ) : null}
      <div className="md:flex hidden items-center gap-5 md:w-1/3">
        <p>الرئيسية</p>
        <p>المنتجات</p>
        <p>من نحن</p>
      </div>
      <div className="flex md:justify-center w-1/3">
        <Link to="/products">
          <img className="w-[50px]" src="/logos/humming-bird.png" />
        </Link>
      </div>
      <div className="flex text-2xl items-center justify-end gap-5 w-1/3">
        <div>
          <CiSearch className="cursor-pointer transition-all" />
        </div>
        <div>
          <CiUser
            onClick={() => setOpenProfile(true)}
            className="cursor-pointer transition-all"
          />
          {openProfile &&
            (user?.id ? (
              <div className="absolute text-sm md:left-[5vw] left-1/2 md:-translate-x-0 mt-1 -translate-x-1/2 z-[100] flex flex-col gap-3 p-2 w-full max-w-[180px] rounded-xl from-slate-200 to-indigo-100 bg-gradient-to-t">
                <div className="p-2 gap-2 rounded-lg bg-white flex items-center">
                  <BiUserCircle />
                  <p>{user?.username}</p>
                </div>
                <div
                  onClick={() => authContext.signOut()}
                  className="p-2 gap-2 rounded-lg bg-red-200 transition-all hover:bg-red-300 cursor-pointer flex items-center"
                >
                  <BiLogOut />
                  <p>{"تسجيل الخروج"}</p>
                </div>
              </div>
            ) : (
              <div className="absolute text-sm md:left-[5vw] left-1/2 md:-translate-x-0 mt-1 -translate-x-1/2 z-[100] flex flex-col gap-3 p-2 w-full max-w-[180px] rounded-xl from-slate-200 to-indigo-100 bg-gradient-to-t">
                <div className="p-2 gap-2 rounded-lg bg-white flex items-center">
                  <BiUserCircle />
                  <p>{"ليس لديك جساب..."}</p>
                </div>
                <Link
                  to={"/authentication/login/"}
                  className="p-2 gap-2 rounded-lg bg-yellow-200 transition-all hover:bg-yellow-300 cursor-pointer flex items-center"
                >
                  <BiLogIn />
                  <p>{"تسجيل الدخول"}</p>
                </Link>
              </div>
            ))}
        </div>
        <div>
          <CiHeart
            onClick={() => setOpenedCart(true)}
            className="cursor-pointer transition-all hover:text-red-500"
          />
          {openedCart && (
            <div className="absolute text-sm md:left-[5vw] left-1/2 md:-translate-x-0 -translate-x-1/2 z-[100] flex flex-col gap-3 p-2 w-full max-w-[400px] rounded-xl from-slate-200 to-indigo-100 bg-gradient-to-t">
              {carts?.length ? (
                carts?.map((cart) => {
                  return <CartItemComponent cart={cart} key={cart?.id} />;
                })
              ) : (
                <p>لا يوجد منتجات مضافة حاليا</p>
              )}

              {carts?.length > 0 && (
                <div className="w-full">
                  <Link to="/checkout">
                    <Button
                      width={"100%"}
                      variant="outline"
                      colorScheme="yellow"
                    >
                      شراء
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
        <div>
          <Link to="/orders/">
            <CiShoppingCart className="cursor-pointer transition-all hover:text-green-500" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default ClientHeader;

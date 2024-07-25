import axios from "axios";
import React, { createContext } from "react";
import { server } from "../utlits/Variables";
import { getCookie } from "../utlits/Functions";

const CartContext = ({ children }) => {
  const headers = {
    Authorization: `Token ${getCookie("token")}`,
  };
  const createCart = async (data) => {
    const res = await axios.post(`${server}api/carts/`, data, { headers });
    return res;
  };

  const [carts, setCarts] = React.useState([]);
  const getCarts = async () => {
    const res = await axios.get(`${server}api/carts/`, { headers });
    setCarts(res.data);
    return res;
  };

  const addToCart = ({ product, variant, quantity, setOpen }) => {
    const user = getCookie("token");
    // if not user -> add to localstorage
    if (!user) {
      const cart = localStorage.getItem("cart");
      if (cart) {
        const cartArr = JSON.parse(cart);
        const existingItem = cartArr.find(
          (item) => item.variant?.id === variant?.id
        );
        if (!existingItem) {
          cartArr.push({
            product: product,
            variant: variant,
            quantity: quantity,
          });
          localStorage.setItem("cart", JSON.stringify(cartArr));
        } else {
          alert("تم اضافة هذا المنتج من قبل");
        }
      } else {
        localStorage.setItem(
          "cart",
          JSON.stringify([
            {
              product: product,
              variant: variant,
              quantity: quantity,
            },
          ])
        );
      }

      alert("تم الاضافة");
      if (setOpen) {
        setOpen(false);
      }
    }
    // if user -> add to cart
    else {
      createCart({
        product: product?.id,
        variant: variant?.id,
        quantity: 1,
      })
        .then((res) => {
          if (res.data.id) {
            alert("تم الاضافة");
            if (setOpen) {
              setOpen(false);
            }
          } else {
            alert("حدث خطأ ما, انت بالفعل أضف هذا المنتج من قبل");
          }
        })
        .catch((err) => {
          console.log(err);
          alert("حدث خطأ ما في السيرفر");
        });
    }
  };

  const deleteCart = async (id) => {
    const res = await axios.delete(`${server}api/cart/${id}/`, { headers });
    return res;
  };

  const updateCart = async (data) => {
    if (getCookie("token")) {
      const res = await axios.put(`${server}api/cart/${data.id}/`, data, {
        headers,
      });
      getCarts();
      return res;
    } else {
      const cart = localStorage.getItem("cart");
      if (cart) {
        const cartArr = JSON.parse(cart);
        const existingItem = cartArr.find(
          (item) => item.variant?.id === data.variant?.id
        );
        if (existingItem) {
          existingItem.quantity = data.quantity;
          localStorage.setItem("cart", JSON.stringify(cartArr));
          return { data: { id: true } };
        }
      }
    }
  };

  const deleteUserCart = async () => {
    const res = await axios.delete(`${server}api/cart/delete/`, { headers });
    return res;
  };
  return (
    <CartContextProvider.Provider
      value={{
        createCart,
        carts,
        setCarts,
        getCarts,
        addToCart,
        deleteCart,
        updateCart,
        deleteUserCart,
      }}
    >
      {children}
    </CartContextProvider.Provider>
  );
};

export default CartContext;
export const CartContextProvider = createContext();

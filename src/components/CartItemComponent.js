import React, { useContext, useState } from "react";
import { CartContextProvider } from "../contexts/CartContext";
import { Button, Input } from "@chakra-ui/react";
import { BiTrash } from "react-icons/bi";

const CartItemComponent = ({ cart }) => {
  const cartsContext = useContext(CartContextProvider);

  const [quantity, setQuantity] = useState(cart?.quantity);

  const updateCart = () => {
    // db
    if (cart?.id) {
      cartsContext
        ?.updateCart({
          id: cart?.id,
          quantity: quantity,
        })
        .then((e) => {
          if (e.data.id) {
            alert("تم التعديل");
            cartsContext?.getCarts();
          }
        });
    }
    // local storage
    else {
      const cartStorage = JSON.parse(localStorage.getItem("cart")) || [];
      const findedCart = cartStorage?.find(
        (e) => e.variant?.id == cart?.variant?.id
      );
      findedCart["quantity"] = quantity;
      localStorage.setItem("cart", JSON.stringify(cartStorage));
      cartsContext?.setCarts(cartStorage);
      alert("تم التعديل");
    }
  };
  return (
    <div key={cart?.id} className="flex flex-col gap-2 p-2 bg-white rounded-xl">
      <div className="relative flex md:flex-row flex-col md:items-center gap-4">
        <BiTrash
          onClick={() => {
            if (cart?.id) {
              cartsContext.deleteCart(cart?.id).then((res) => {
                cartsContext.getCarts();
              });
            } else {
              const cartArr = JSON.parse(localStorage.getItem("cart"));
              const index = cartArr.findIndex(
                (item) => item.variant?.id === cart?.variant?.id
              );
              cartArr.splice(index, 1);
              localStorage.setItem("cart", JSON.stringify(cartArr));
              cartsContext.setCarts(cartArr);
            }
          }}
          className="cursor-pointer absolute top-2 left-2 text-red-500"
        />
        <div className="flex items-center w-full md:max-w-[80px] bg-yellow-100 p-1 rounded-xl gap-3 justify-between">
          {cart?.id ? (
            cart?.product_details?.images_details[0].image ? (
              <img src={cart?.product_details?.images_details[0].image} />
            ) : (
              <p>Loading...</p>
            )
          ) : (
            <img src={cart?.product?.images_details[0].image} />
          )}
        </div>
        <div className="flex flex-col gap-1">
          <p>{cart?.product?.name || cart?.product_details?.name}</p>
          <small>
            {cart?.variant?.sell_price || cart?.variant_details?.sell_price} EGP
          </small>
        </div>
        <div className="flex md:ms-auto flex-col gap-1">
          <p className="">الكمية: {cart?.quantity}</p>
          <small>
            السعر النهائي:{" "}
            {!cart?.id
              ? cart?.variant?.sell_price * cart?.quantity
              : cart?.variant_details?.sell_price * cart?.quantity}{" "}
            EGP
          </small>
        </div>
      </div>
      <hr />
      <div className="flex gap-2 w-full">
        <Input
          value={quantity}
          onChange={(e) => {
            setQuantity(e.target.value);
          }}
          size={"xs"}
          className="w-full"
          placeholder="تغيير الكمية"
        />
        <Button onClick={updateCart} colorScheme={"teal"} size={"xs"}>
          تحديث
        </Button>
      </div>
    </div>
  );
};

export default CartItemComponent;

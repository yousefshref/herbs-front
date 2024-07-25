import React, { useContext, useEffect } from "react";
import { BiMinusCircle, BiPlusCircle } from "react-icons/bi";
import { CartContextProvider } from "../contexts/CartContext";

const CartComponent = ({ cart }) => {
  const cartContext = useContext(CartContextProvider);

  const [image, setImage] = React.useState(
    cart?.product_details?.images_details[0]?.image
  );
  const [name, setName] = React.useState(cart?.product_details?.name);
  const [variantName, setVariantName] = React.useState(
    cart?.variant_details?.name
  );
  const [quantity, setQuantity] = React.useState(cart?.quantity);
  const [price, setPrice] = React.useState(cart?.variant_details?.sell_price);
  const [totalPrice, setTotalPrice] = React.useState(quantity * price);

  useEffect(() => {
    setTotalPrice(quantity * price);
  }, [quantity, price]);

  useEffect(() => {
    if (cart) {
      setImage(cart?.product_details?.images_details[0]?.image);
      setName(cart?.product_details?.name);
      setVariantName(cart?.variant_details?.name);
      setQuantity(cart?.quantity);
      setPrice(cart?.variant_details?.sell_price);
    }
  }, [cart]);

  const handleUpdateCart = (newQuantity) => {
    cartContext
      ?.updateCart({
        id: cart?.id,
        quantity: newQuantity,
      })
      .then((res) => {
        if (res.data.id) {
          cartContext?.getCarts();
          setQuantity(newQuantity);
        }
      });
  };
  return (
    <div className="p-2 rounded-md shadow-md w-full bg-indigo-50 flex items-center justify-between gap-3 text-sm">
      <img className="w-[50px]" src={image} />
      <div className="flex flex-col gap-0">
        <p>{name}</p>
        <p className="text-gray-500 text-xs">( {variantName} )</p>
      </div>
      <div className="flex gap-2 p-1 rounded-xl items-center bg-gray-300/60 px-2">
        <BiPlusCircle
          onClick={() => handleUpdateCart(quantity + 1)}
          className="bg-gray-700 cursor-pointer transition-all hover:bg-gray-600 active:bg-gray-800 p-0.5 text-2xl rounded-full text-white"
        />
        <p className="font-bold">{quantity}</p>
        <BiMinusCircle
          onClick={() => {
            if (quantity > 1) {
              handleUpdateCart(quantity - 1);
            }
          }}
          className="bg-gray-700 cursor-pointer transition-all hover:bg-gray-600 active:bg-gray-800 p-0.5 text-2xl rounded-full text-white"
        />
      </div>
      <p className="text-green-600">{totalPrice} EGP</p>
    </div>
  );
};

export default CartComponent;

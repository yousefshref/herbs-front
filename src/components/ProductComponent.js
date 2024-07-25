import React from "react";
import BGColor from "./BGColor";
import { Button } from "@chakra-ui/react";
import { Drawer } from "antd";
import "react-slideshow-image/dist/styles.css";
import { Slide } from "react-slideshow-image";
import { CiHeart, CiShoppingCart } from "react-icons/ci";
import { getCookie } from "../utlits/Functions";
import { CartContextProvider } from "../contexts/CartContext";
import { Link } from "react-router-dom";

const ProductComponent = ({ product }) => {
  //   {
  //     "id": 20,
  //     "variants_details": [
  //         {
  //             "id": 23,
  //             "name": "تست",
  //             "description": "مميسش يسش  يسءئ يسشيسكم ميةسش",
  //             "buy_price": 100,
  //             "sell_price": 160,
  //             "earning": null,
  //             "stock": 20,
  //             "product": 20
  //         },
  //         {
  //             "id": 24,
  //             "name": "واحد تاني كبير",
  //             "description": "تست علي شكل المنتجات اللي بشوفها في الشاره",
  //             "buy_price": 70,
  //             "sell_price": 140,
  //             "earning": null,
  //             "stock": 40,
  //             "product": 20
  //         }
  //     ],
  //     "images_details": [
  //         {
  //             "id": 12,
  //             "image": "https://i.ibb.co/LntXynF/othamni.png",
  //             "product": 20
  //         }
  //     ],
  //     "mother_category_details": {
  //         "id": 9,
  //         "name": "الإلكترونيات"
  //     },
  //     "category_details": {
  //         "id": 8,
  //         "name": "شاشات",
  //         "mother_category": 9
  //     },
  //     "name": "منتج ابديت",
  //     "description": "يسششش",
  //     "mother_category": 9,
  //     "category": 8
  // }

  const cartContext = React.useContext(CartContextProvider);

  const [open, setOpen] = React.useState(false);

  const divStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundSize: "cover",
    height: "400px",
  };

  const addToCart = ({ variant }) => {
    cartContext?.addToCart({
      product: product,
      variant: variant,
      quantity: 1,
      setOpen: setOpen,
    });
  };

  return (
    <div className="w-full h-fit flex flex-col rounded-xl border border-[#d9d9d9]">
      <div className="relative -mt-24 overflow-hidden">
        <Link
          to={`/product/${product?.name?.replace(/ /g, "-")}/${product?.id}/`}
        >
          <img
            className="w-full hover:scale-105 transition-all z-50 relative"
            src={product?.images_details[0]?.image}
          />
        </Link>
        <BGColor
          bgColor={"bg-indigo-500/10"}
          padding={"md:p-[100px] p-[70px]"}
          left={"left-[50%]"}
          top={"top-[50%]"}
          className="-translate-x-1/2 -translate-y-1/2"
        />
      </div>
      <div className="rounded-t-2xl bg-gray-900 text-white p-2 rounded-md flex flex-col gap-1">
        <div className="flex gap-2 items-center flex-wrap justify-between">
          <h1 className="font-bold">{product?.name}</h1>
          <p className="text-gray-300 text-xs">باقي 3 فقط</p>
        </div>
        <div className="text-xs mt-3">
          <p>{product?.description}</p>
        </div>
        <div className="flex mt-3 justify-between gap-2">
          <Button
            onClick={() => setOpen(true)}
            size={"sm"}
            colorScheme="teal"
            width={"full"}
          >
            أضف للمفضلة
          </Button>
          <Button size={"sm"} colorScheme="green" width={"full"}>
            شراء
          </Button>
        </div>
      </div>

      <Drawer placement="right" onClose={() => setOpen(false)} open={open}>
        <div dir="rtl" className="cairo flex flex-col">
          <Slide>
            {product?.images_details.map((slideImage, index) => (
              <div key={index}>
                <div
                  style={{
                    ...divStyle,
                    backgroundImage: `url(${slideImage.image})`,
                  }}
                ></div>
              </div>
            ))}
          </Slide>
          <div className="flex items-center justify-between gap-1">
            <strong className="mt-3 text-xl">{product?.name}</strong>
            <p>{product?.category_details?.name}</p>
          </div>
          <div className="flex flex-col gap-4 p-2">
            {product?.variants_details?.map((variant) => {
              return (
                <div
                  key={variant?.id}
                  className="p-2 rounded-xl from-indigo-200/60 text-gray-700 via-white to-yellow-200/60 bg-gradient-to-tr"
                >
                  <div className="flex justify-between items-center gap-2">
                    <strong>{variant?.name}</strong>
                    <p>{variant?.sell_price} EGP</p>
                  </div>
                  <small>
                    <p>
                      {variant?.description?.length > 50
                        ? variant?.description?.slice(0, 50) + "..."
                        : variant?.description}
                    </p>
                  </small>
                  <div className="flex mt-3 gap-2 items-center">
                    <Button
                      colorScheme="teal"
                      size={"xs"}
                      leftIcon={<CiHeart />}
                      onClick={() =>
                        addToCart({
                          variant: variant,
                        })
                      }
                    >
                      أضف للمفضلة
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default ProductComponent;

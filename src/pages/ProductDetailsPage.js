import React, { useEffect } from "react";
import { ProductsContextProvider } from "../contexts/ProductsContext";
import { useParams } from "react-router-dom";
import ClientHeader from "../components/ClientHeader";
import { Slide } from "react-slideshow-image";
import { Button } from "@chakra-ui/react";
import { CartContextProvider } from "../contexts/CartContext";
import LoadingPage from "../components/LoadingPage";

const ProductDetailsPage = () => {
  const productsContext = React.useContext(ProductsContextProvider);
  const cartsContext = React.useContext(CartContextProvider);

  const params = useParams();
  const id = params?.productID;

  const product = productsContext.product;

  useEffect(() => {
    if (id) productsContext.getProduct(id);
  }, [id]);

  const [selectedVariant, setSelectedVariant] = React.useState(0);
  useEffect(() => {
    if (product?.id) setSelectedVariant(product?.variants_details[0]);
  }, [product?.id]);
  return (
    <div className="flex flex-col cairo" dir="rtl">
      {productsContext.loading && <LoadingPage />}
      <ClientHeader />
      <div className="flex md:flex-row flex-col gap-4 justify-between">
        <div className="md:w-1/3 w-full flex flex-col justify-center gap-2">
          <Slide>
            {product?.id ? (
              product?.images_details?.map((image) => (
                <div className="w-full">
                  <img src={image?.image} className="w-full" />
                </div>
              ))
            ) : (
              <p>Loading...</p>
            )}
          </Slide>
          <div className="w-full flex items-center flex-wrap gap-2">
            {product?.images_details?.map((image, index) => (
              <div
                onClick={() => {
                  const newImages = [...product?.images_details];
                  const selectedImage = newImages.splice(index, 1)[0];
                  newImages.unshift(selectedImage);
                  productsContext?.setProduct({
                    ...product,
                    images_details: newImages,
                  });
                }}
                className={`w-[20%] shadow-md p-1 transition-all hover:bg-yellow-200/60 cursor-pointer bg-${
                  index === 0 ? "yellow-200/30" : "yellow-200/20"
                } rounded-xl`}
              >
                <img src={image?.image} className="w-full" />
              </div>
            ))}
          </div>
        </div>
        <div className="w-full p-3 flex flex-col gap-4 justify-center">
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl font-bold">{product?.name}</h1>
            <p className="text-gray-500">{product?.description}</p>
          </div>
          <hr className="w-full py-1 my-2" />
          <div className="flex flex-wrap rounded-xl gap-5 justify-around p-2 bg-indigo-200/70 items-center">
            {product?.variants_details?.map((variant) => (
              <div
                key={variant?.id}
                onClick={() => setSelectedVariant(variant)}
                className={`
              flex p-1 rounded-xl bg-white w-full max-w-[200px] items-center transition-all hover:bg-yellow-50 cursor-pointer justify-center flex-col gap-1
              ${variant?.id === selectedVariant?.id ? "bg-yellow-50" : ""}
              `}
              >
                <p>{variant?.name}</p>
                <p>{variant?.sell_price}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex gap-10 items-end">
              <strong>{selectedVariant?.name}</strong>
              <strong className="text-green-500 text-2xl">
                {selectedVariant?.sell_price} EGP
              </strong>
            </div>
            <p className="text-gray-500">{selectedVariant?.description}</p>
          </div>
          <hr className="w-full py-1 my-2" />
          <div className="flex gap-5 items-center">
            <Button
              onClick={() => {
                cartsContext?.addToCart({
                  product: product,
                  variant: selectedVariant,
                  quantity: 1,
                });
              }}
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
      </div>
    </div>
  );
};

export default ProductDetailsPage;

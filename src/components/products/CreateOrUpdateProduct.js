import {
  Button,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Input,
  Select,
  Spinner,
  Textarea,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { BiPlus, BiTrash } from "react-icons/bi";
import { ProductsContextProvider } from "../../contexts/ProductsContext";
import { BsPlus } from "react-icons/bs";
import LoadingScreen from "../LoadingScreen";

const CreateOrUpdateProduct = ({ open, onClose, btnRef, product }) => {
  const productsContext = React.useContext(ProductsContextProvider);

  const [images, setImages] = React.useState([]);

  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [mother_category, setMotherCategory] = React.useState(null);
  const [category, setCategory] = React.useState(null);

  const [variants, setVariants] = React.useState([]);

  const [motherCategories, setMotherCategories] = React.useState([]);
  useEffect(() => {
    if (open) {
      productsContext?.getMotherCategories().then((e) => {
        setMotherCategories(e.data);
      });
    }
  }, [open]);

  const [categories, setCategories] = React.useState([]);
  useEffect(() => {
    if (mother_category) {
      productsContext
        ?.getCategorys({ mother_category })
        .then((e) => setCategories(e.data));
    } else {
      setCategories([]);
    }
  }, [mother_category]);

  const convertImageToURLWithImgBB = async (image) => {
    const apiKey = "e4b8ad3db37cc93ecaf2897f75edc685";
    const data = new FormData();
    data.append("image", image);
    const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: "POST",
      body: data,
    });
    const json = await res.json();
    if (!res.ok) {
      throw new Error(`ImgBB upload failed: ${json.error.message}`);
    }
    return json.data;
  };

  const [loading, setLoading] = React.useState(false);

  const createProduct = async () => {
    setLoading(true);

    const imagesURLsPromises = images?.map(async (image) => {
      const url = await convertImageToURLWithImgBB(image);
      return { image: url.url };
    });

    const imagesURLs = await Promise.all(imagesURLsPromises);

    productsContext
      ?.createProduct({
        name,
        description,
        mother_category,
        category,
        variants,
        images: imagesURLs,
      })
      .then((res) => {
        if (res.data.id) {
          onClose();
          productsContext?.getProducts({});
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description);
      setMotherCategory(product.mother_category);
      setCategory(product.category);
      setVariants(product.variants_details);
      setImages(product.images_details);
    }
  }, [product]);

  const updateProduct = async () => {
    setLoading(true);

    const imagesURLsPromises = images?.map(async (image) => {
      if (image?.id) {
        return { image: image?.image };
      } else {
        const url = await convertImageToURLWithImgBB(image);
        return { image: url.url };
      }
    });

    const imagesURLs = await Promise.all(imagesURLsPromises);

    // updated variants
    const updatedVariants = variants?.filter((e) => e?.id);
    const createdVariants = variants?.filter((e) => !e?.id);

    productsContext
      ?.updateProduct({
        id: product?.id,
        name,
        description,
        mother_category,
        category,
        variants: createdVariants,
        updatedVariants: updatedVariants,
        images: imagesURLs,
      })
      .then((res) => {
        if (res.data.id) {
          onClose();
          productsContext?.getProducts({});
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Drawer
      isOpen={open}
      placement="bottom"
      onClose={onClose}
      finalFocusRef={btnRef}
      size={"full"}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader className="cairo">اضافة منتج</DrawerHeader>
        <div
          dir="rtl"
          className="cairo flex flex-col gap-3 p-2 overflow-y-scroll"
        >
          {loading && <LoadingScreen />}
          {/* images */}
          <div className="flex gap-3 items-center w-full h-full p-2 bg-gray-300/40 rounded-xl">
            <label
              htmlFor="file-input"
              className="p-2 cursor-pointer active:bg-indigo-900/90 transition-all duration-200 hover:bg-indigo-900 rounded-xl flex flex-col justify-center items-center bg-indigo-900/70 h-[200px] w-[200px] text-white"
            >
              <BiPlus className="text-3xl" />
              <input
                id="file-input"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setImages([...images, file]);
                }}
              />
            </label>
            {images?.map((e, i) => (
              <div
                key={i}
                className="w-[200px] h-[200px] rounded-xl overflow-hidden relative"
              >
                <img
                  src={e?.image ? e.image : URL.createObjectURL(e)}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() =>
                    setImages(images?.filter((_, index) => index !== i))
                  }
                  className="absolute top-0 left-0 w-full h-full bg-black/20 hover:bg-red-900/20 transition-all flex justify-center items-center"
                >
                  <BiTrash className="text-white text-3xl" />
                </button>
              </div>
            ))}
          </div>
          {/* basic info */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <Input
                placeholder="اسم المنتج"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Select
                placeholder="الفئة الأم"
                value={mother_category}
                onChange={(e) => setMotherCategory(e.target.value)}
              >
                {motherCategories?.map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.name}
                  </option>
                ))}
              </Select>
              <Select
                placeholder="الفئة"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories?.map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.name}
                  </option>
                ))}
              </Select>
            </div>
            <Textarea
              placeholder="وصف المنتج"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          {/* variants */}
          <div className="flex flex-col gap-3 p-3 bg-gray-300/50">
            <strong>انواع المنتج</strong>
            <div className="flex flex-col overflow-x-scroll max-w-full w-full p-2 gap-2">
              {variants?.length > 0 ? (
                variants?.map((variant, i) => (
                  <div
                    key={i}
                    className="flex flex-col gap-2 p-3 rounded-xl bg-indigo-900/20"
                  >
                    <BiTrash
                      onClick={() => {
                        if (product?.id) {
                          productsContext?.deleteVariant(variant?.id);
                          setVariants(variants?.filter((v) => v !== variant));
                        } else {
                          setVariants(variants?.filter((v) => v !== variant));
                        }
                      }}
                      className="text-red-500 cursor-pointer"
                    />
                    <div className="flex gap-3">
                      <div className="flex flex-col gap-1 w-full">
                        <Input
                          value={variant.name}
                          onChange={(e) => {
                            const newVariants = [...variants];
                            newVariants[i].name = e.target.value;
                            setVariants(newVariants);
                          }}
                          bgColor={"white"}
                          placeholder="الاسم"
                        />
                        <Textarea
                          bgColor={"white"}
                          type="number"
                          placeholder="وصف القطعة"
                          value={variant.description}
                          onChange={(e) => {
                            const newVariants = [...variants];
                            newVariants[i].description = e.target.value;
                            setVariants(newVariants);
                          }}
                        />
                      </div>
                      <div className="flex flex-col gap-1 w-full">
                        <Input
                          bgColor={"white"}
                          type="number"
                          placeholder="سعر الشراء (للقطعة)"
                          value={variant.buy_price}
                          onChange={(e) => {
                            const newVariants = [...variants];
                            newVariants[i].buy_price = e.target.value;
                            setVariants(newVariants);
                          }}
                        />
                        <Input
                          bgColor={"white"}
                          type="number"
                          placeholder="سعر البيع (للقطعة)"
                          value={variant.sell_price}
                          onChange={(e) => {
                            const newVariants = [...variants];
                            newVariants[i].sell_price = e.target.value;
                            setVariants(newVariants);
                          }}
                        />
                        <Input
                          bgColor={"white"}
                          type="number"
                          placeholder="كم قطعة في المخزن"
                          value={variant.stock}
                          onChange={(e) => {
                            const newVariants = [...variants];
                            newVariants[i].stock = e.target.value;
                            setVariants(newVariants);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-red-500">لا يوجد قطع تمت اضافتها</p>
              )}
            </div>
            <BsPlus
              onClick={() =>
                setVariants([
                  ...variants,
                  {
                    name: "",
                    description: "",
                    buy_price: "",
                    sell_price: "",
                    stock: "",
                  },
                ])
              }
              className="text-3xl text-green-500 cursor-pointer"
            />
          </div>
          <Button
            colorScheme="green"
            className="w-fit"
            padding={"10px 30px"}
            onClick={() => {
              if (product?.id) {
                updateProduct();
              } else {
                createProduct();
              }
            }}
          >
            انشاء
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CreateOrUpdateProduct;

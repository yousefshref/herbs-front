import React, { useEffect } from "react";
import { CiHeart, CiSearch, CiShoppingCart, CiUser } from "react-icons/ci";
import { Alert, AlertIcon, Button, Input } from "@chakra-ui/react";
import BGColor from "../components/BGColor";
import ProductComponent from "../components/ProductComponent";
import { ProductsContextProvider } from "../contexts/ProductsContext";
import ClientHeader from "../components/ClientHeader";
import { Pagination } from "antd";
import LoadingPage from "../components/LoadingPage";

const ProductsPage = () => {
  const productsContext = React.useContext(ProductsContextProvider);

  const products = productsContext.products;

  const [loading, setLoading] = React.useState(true);

  const [search, setSearch] = React.useState("");
  const [categorySearch, setCategory] = React.useState("");
  const [mother_category, setMotherCategory] = React.useState("");

  const getProducts = async () => {
    setLoading(true);
    productsContext?.getProducts({
      search,
      category: categorySearch,
      mother_category,
    });
    setLoading(false);
  };

  useEffect(() => {
    getProducts();
  }, [categorySearch, mother_category]);

  const categorys = productsContext?.motherCategories;

  const getMotherCategories = () => {
    productsContext.getMotherCategories();
  };

  useEffect(() => {
    getMotherCategories();
  }, []);

  return (
    <div className="cairo flex flex-col" dir="rtl">
      {loading && <LoadingPage />}
      {/* header */}
      <ClientHeader />
      {/* all */}
      <div className="flex md:flex-row flex-col-reverse gap-3 justify-between p-3">
        {/* products */}
        <div className="flex flex-col gap-4 w-full">
          <div className="flex gap-3 p-2 rounded-lg bg-white w-full">
            <Input
              bgColor={"white"}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="بحث"
              className="w-full"
              size="md"
            />
            <CiSearch
              onClick={getProducts}
              className="text-3xl bg-slate-100 transition-all hover:text-white hover:bg-indigo-500 cursor-pointer w-[80px] h-[40px] rounded-lg"
            />
          </div>
          <Pagination
            defaultCurrent={1}
            total={productsContext?.productsCount}
            pageSize={10}
            onChange={(page) => productsContext.getProducts({ page })}
            className="w-full"
          />
          <div className="gap-16 justify-around flex flex-wrap w-full">
            {products?.length > 0 ? (
              products?.map((product) => {
                return (
                  <div key={product.id} className="sm:w-[300px] w-full mt-28">
                    <ProductComponent product={product} />
                  </div>
                );
              })
            ) : (
              <Alert status="warning">
                <AlertIcon />
                لا يوجد منتجات
              </Alert>
            )}
          </div>
        </div>
        {/* filter */}
        <div className="p-2 bg-slate-50 overflow-hidden rounded-xl relative md:w-[250px] h-fit sm:min-w-[250px] flex flex-col gap-3">
          <BGColor
            padding={"p-[30px]"}
            bgColor={"bg-indigo-500/50"}
            left={"left-[5vw]"}
            top={"top-[2vw]"}
          />
          <BGColor
            padding={"p-[30px]"}
            bgColor={"bg-yellow-700/50"}
            left={"left-[9vw]"}
            top={"md:top-[20vw] top-[50vw]"}
          />
          <div className="flex flex-col gap-1 text-sm">
            <strong>الفئات</strong>
            <div className="flex gap-2 flex-col">
              {categorys?.map((category) => {
                return (
                  <div key={category.id} className="flex flex-col">
                    <p
                      onClick={() => {
                        if (category.id == mother_category) {
                          setMotherCategory("");
                        } else {
                          setMotherCategory(category.id);
                        }
                      }}
                      className={`cursor-pointer ${
                        mother_category == category.id ? "text-indigo-500" : ""
                      }`}
                    >
                      {category.name}
                    </p>
                    <div className="flex text-xs flex-col ms-5">
                      {category?.categories?.map((subCategory) => {
                        return (
                          <p
                            onClick={() => {
                              if (categorySearch == subCategory.id) {
                                setCategory("");
                              } else {
                                setCategory(subCategory.id);
                              }
                            }}
                            key={subCategory.id}
                            className={`text-xs cursor-pointer ${
                              categorySearch == subCategory.id
                                ? "text-indigo-400"
                                : ""
                            }`}
                          >
                            - {subCategory.name}
                          </p>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;

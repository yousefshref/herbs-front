import React, { useEffect } from "react";
import AdminLayout from "../components/Layouts/AdminLayout";
import { Button, Input, Select, useDisclosure } from "@chakra-ui/react";
import Categories from "../components/Categories";
import CreateOrUpdateProduct from "../components/products/CreateOrUpdateProduct";
import { IoCreateOutline } from "react-icons/io5";
import { ProductsContextProvider } from "../contexts/ProductsContext";
import ProductTableComponent from "../components/ProductTableComponent";
import Countries from "../components/Countries";
import { getCookie } from "../utlits/Functions";

const AdminDashboard = () => {
  const productsContext = React.useContext(ProductsContextProvider);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  useEffect(() => {
    productsContext?.getProducts({});
  }, []);

  return (
    <AdminLayout>
      {/* countries and categories */}
      <div className="flex md:flex-row flex-col gap-4 justify-between w-full">
        <div className="category border border-black/40 h-fit py-1 md:w-1/2 w-full rounded-md">
          <p className="font-bold border-b border-b-black/40 px-3 text-center">
            الدول والشحن
          </p>
          {/* Categories */}
          <Countries />
        </div>
        <div className="category border border-black/40 h-fit py-1 md:w-1/2 w-full rounded-md">
          <p className="font-bold border-b border-b-black/40 px-3 text-center">
            الفئات
          </p>
          {/* Categories */}
          <Categories />
        </div>
      </div>
      {/* create and search */}
      <div className="flex flex-col gap-3 w-full mt-5">
        <Button
          leftIcon={<IoCreateOutline />}
          width={"fit-content"}
          ref={btnRef}
          colorScheme="green"
          onClick={onOpen}
        >
          انشاء منتج
        </Button>
        {/* search */}
        <div className="flex flex-col gap-1 p-2 rounded-xl bg-indigo-200/30 w-full">
          <Input
            placeholder="بحث"
            className="w-full"
            size="md"
            backgroundColor={"white"}
          />
          <div className="flex items-center gap-3 w-full">
            <Select placeholder="الفئة الام" bgColor={"white"}>
              <option>الكل</option>
              <option>الكل</option>
              <option>الكل</option>
            </Select>
            <Select placeholder="الفئة " bgColor={"white"}>
              <option>الكل</option>
              <option>الكل</option>
            </Select>
          </div>
          <Button width={"fit-content"} colorScheme="teal" paddingX={10}>
            بحث
          </Button>
        </div>
      </div>
      <CreateOrUpdateProduct open={isOpen} onClose={onClose} btnRef={btnRef} />
      {/* display */}
      <div className="w-full overflow-x-scroll">
        <table className="table-auto mt-4 w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 text-start">الاسم</th>
              <th className="px-4 py-2 text-start">الوصف</th>
              <th className="px-4 py-2 text-start">الفئة</th>
              <th className="px-4 py-2 text-start">الفئة الام</th>
            </tr>
          </thead>
          <tbody>
            {productsContext?.products.map((product) => (
              <ProductTableComponent key={product.id} product={product} />
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;

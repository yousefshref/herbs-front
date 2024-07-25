import React, { useContext, useEffect, useState } from "react";
import { ProductsContextProvider } from "../contexts/ProductsContext";
import MotherCategoryComponent from "./MotherCategoryComponent";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Input,
} from "@chakra-ui/react";

const Categories = () => {
  const productsContext = useContext(ProductsContextProvider);

  const [motherCategories, setMotherCategory] = useState([]);

  const getMotherCategories = () => {
    productsContext.getMotherCategories().then((e) => {
      setMotherCategory(e.data);
    });
  };

  useEffect(() => {
    getMotherCategories();
  }, []);

  const [motherCategoryValue, setMotherCategoryValue] = useState("");

  return (
    <div className="flex flex-col gap-4 text-xs px-2 py-1 h-[200px] overflow-y-scroll">
      {motherCategories?.length > 0 ? (
        motherCategories?.map((category) => (
          <MotherCategoryComponent
            getMotherCategories={getMotherCategories}
            key={category.id}
            category={category}
          />
        ))
      ) : (
        <Alert rounded={"md"} status="error">
          <AlertIcon />
          <AlertTitle>لا يوجد فئات</AlertTitle>
        </Alert>
      )}
      <hr />
      <div className="flex items-center gap-2">
        <Input
          onChange={(e) => setMotherCategoryValue(e.target.value)}
          value={motherCategoryValue}
          placeholder="اضافة فئة جديدة"
          size={"xs"}
        />
        <Button
          onClick={() => {
            productsContext
              .createMotherCategory({ name: motherCategoryValue })
              .then((e) => {
                if (e.status == 200) {
                  setMotherCategoryValue("");
                  getMotherCategories();
                }
              });
          }}
          colorScheme="green"
          className="w-fit"
          paddingX={4}
          size={"xs"}
        >
          انشاء فئة
        </Button>
      </div>
    </div>
  );
};

export default Categories;

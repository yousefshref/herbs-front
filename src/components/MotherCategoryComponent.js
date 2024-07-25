import { Button, Editable, Input } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { BiEdit, BiPencil, BiTrash } from "react-icons/bi";
import { ProductsContextProvider } from "../contexts/ProductsContext";
import CategoryComponent from "./CategoryComponent";

const MotherCategoryComponent = ({ category, getMotherCategories }) => {
  const productsContext = useContext(ProductsContextProvider);

  const [edit, setEdit] = useState(false);

  const [newMotherCategory, setNewMotherCategory] = useState(category.name);

  const [categories, setCategories] = useState([]);

  const getCategorys = () => {
    productsContext
      ?.getCategorys({ mother_category: category.id })
      .then((e) => {
        setCategories(e.data);
      });
  };

  useEffect(() => {
    getCategorys();
  }, []);

  const [newCategoryValue, setNewCategoryValue] = useState("");
  const createCategory = () => {
    productsContext
      ?.createCategory({
        name: newCategoryValue,
        mother_category: category.id,
      })
      .then((e) => {
        if (e.status == 200) {
          setNewCategoryValue("");
          getCategorys();
        }
      });
  };

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between">
        {edit ? (
          <div className="flex w-full flex-row items-center gap-2">
            <Input
              size={"xs"}
              value={newMotherCategory}
              onChange={(e) => setNewMotherCategory(e.target.value)}
            />
            <Button
              onClick={() => {
                productsContext
                  ?.updateMotherCategory({
                    id: category.id,
                    name: newMotherCategory,
                  })
                  .then((e) => {
                    if (e.data.id) {
                      setEdit(!edit);
                      getMotherCategories();
                    }
                  });
              }}
              colorScheme={"green"}
              paddingX={4}
              size={"xs"}
            >
              تم
            </Button>
          </div>
        ) : (
          <strong>- {category?.name}</strong>
        )}
        {!edit ? (
          <div className="flex gap-2 items-center">
            <Button
              color={"blue"}
              onClick={() => setEdit(!edit)}
              rounded={"full"}
              size={"xs"}
            >
              <BiEdit />
            </Button>
            <Button
              onClick={() => {
                productsContext?.deleteMotherCategory(category.id).then((e) => {
                  if (e.data.deleted) {
                    getMotherCategories();
                  }
                });
              }}
              rounded={"full"}
              size={"xs"}
              color={"red"}
            >
              <BiTrash />
            </Button>
          </div>
        ) : null}
      </div>
      <div className="flex flex-col gap-2">
        {categories?.length > 0 ? (
          categories?.map((category) => (
            <CategoryComponent
              getCategorys={getCategorys}
              key={category.id}
              category={category}
            />
          ))
        ) : (
          <small>لا يوجد</small>
        )}
        <div className="flex gap-2 items-center">
          <Input
            size={"xs"}
            value={newCategoryValue}
            onChange={(e) => setNewCategoryValue(e.target.value)}
            placeholder="اضافة عنصر جديد"
          />
          <Button
            onClick={createCategory}
            colorScheme={"green"}
            paddingX={4}
            size={"xs"}
          >
            انشاء
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MotherCategoryComponent;

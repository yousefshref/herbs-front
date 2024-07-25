import { Input } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { BiPencil, BiTrash } from "react-icons/bi";
import { FcCheckmark } from "react-icons/fc";
import { ProductsContextProvider } from "../contexts/ProductsContext";

const CategoryComponent = ({ category, getCategorys }) => {
  const productsContext = useContext(ProductsContextProvider);

  const [edit, setEdit] = useState(false);
  const [newCategoryValue, setNewCategoryValue] = useState(category?.name);

  const updateProduct = () => {
    productsContext
      ?.updateCategory({ id: category?.id, name: newCategoryValue })
      .then((e) => {
        if (e.data.id) {
          setEdit(false);
          getCategorys();
        }
      });
  };

  return (
    <div className="flex gap-3 items-center" key={category?.id}>
      {edit ? (
        <FcCheckmark onClick={updateProduct} className="cursor-pointer" />
      ) : (
        <div className="flex items-center gap-2">
          <BiPencil
            onClick={() => setEdit(true)}
            className="text-blue-500 cursor-pointer"
          />
          <BiTrash
            onClick={() => {
              productsContext?.deleteCategory(category?.id).then((e) => {
                if (e.data.deleted) {
                  getCategorys();
                }
              });
            }}
            className="text-red-500 cursor-pointer"
          />
        </div>
      )}
      {edit ? (
        <Input
          size={"xs"}
          value={newCategoryValue}
          onChange={(e) => setNewCategoryValue(e.target.value)}
        />
      ) : (
        <p>{category?.name}</p>
      )}
    </div>
  );
};

export default CategoryComponent;

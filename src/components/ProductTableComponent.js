import React from "react";
import CreateOrUpdateProduct from "./products/CreateOrUpdateProduct";
import { useDisclosure } from "@chakra-ui/react";

const ProductTableComponent = ({ product }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <tr>
        <td
          onClick={onOpen}
          className="border px-4 py-2 bg-yellow-100 transition-all hover:bg-yellow-50 cursor-pointer"
        >
          {product.name}
        </td>
        <td className="border px-4 py-2">{product.description}</td>
        <td className="border px-4 py-2">{product.category_details?.name}</td>
        <td className="border px-4 py-2">
          {product.mother_category_details?.name}
        </td>
      </tr>

      <CreateOrUpdateProduct
        product={product}
        open={isOpen}
        onClose={onClose}
      />
    </>
  );
};

export default ProductTableComponent;

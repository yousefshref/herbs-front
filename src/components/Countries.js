import React, { useEffect } from "react";
import { ProductsContextProvider } from "../contexts/ProductsContext";
import { Button } from "@chakra-ui/react";
import CreateOrUpdateCountry from "./CreateOrUpdateCountry";
import CountryComponent from "./CountryComponent";

const Countries = () => {
  const productsContext = React.useContext(ProductsContextProvider);

  const countries = productsContext?.countries;

  useEffect(() => {
    productsContext?.getCountries();
  }, []);

  const [open, setOpen] = React.useState(false);
  return (
    <div className="flex flex-col gap-5 p-2 text-sm">
      {countries?.length > 0 ? (
        countries?.map((country) => {
          return <CountryComponent key={country?.id} country={country} />;
        })
      ) : (
        <div className="flex items-center justify-between gap-3">
          <p>لا يوجد بيانات</p>
          <Button
            onClick={() => setOpen(true)}
            colorScheme="green"
            size="xs"
            variant="solid"
          >
            اضافة دولة
          </Button>
        </div>
      )}
      <Button
        onClick={() => setOpen(true)}
        colorScheme="green"
        size="xs"
        variant="solid"
      >
        اضافة دولة
      </Button>

      <CreateOrUpdateCountry open={open} onClose={() => setOpen(false)} />
    </div>
  );
};

export default Countries;

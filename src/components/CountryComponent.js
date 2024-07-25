import React from "react";
import CreateOrUpdateCountry from "./CreateOrUpdateCountry";
import { BiTrash } from "react-icons/bi";
import { ProductsContextProvider } from "../contexts/ProductsContext";

const CountryComponent = ({ country }) => {
  const productsContext = React.useContext(ProductsContextProvider);
  const [opne, setOpen] = React.useState(false);
  return (
    <div
      onClick={() => setOpen(true)}
      className="p-2 rounded-md bg-yellow-100 transition-all hover:bg-yellow-200/70 cursor-pointer"
    >
      <div className="flex gap-2 justify-between">
        <p>{country?.name}</p>
        <BiTrash
          onClick={() => {
            productsContext?.deleteCountry(country?.id).then((e) => {
              productsContext?.getCountries();
            });
          }}
          className="text-red-500 cursor-pointer"
        />
      </div>

      <CreateOrUpdateCountry
        countryData={country}
        open={opne}
        onClose={() => setOpen(false)}
      />
    </div>
  );
};

export default CountryComponent;

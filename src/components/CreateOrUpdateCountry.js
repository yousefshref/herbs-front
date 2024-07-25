import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import { Drawer } from "antd";
import React, { useEffect, useState } from "react";
import { BiTrash } from "react-icons/bi";
import { ProductsContextProvider } from "../contexts/ProductsContext";

const CreateOrUpdateCountry = ({ open, onClose, countryData }) => {
  const productsContext = React.useContext(ProductsContextProvider);

  const [country, setCountry] = useState("");
  const [cities, setCities] = useState([{ name: "", states: [{ name: "" }] }]);

  const handleCountryChange = (e) => {
    setCountry(e.target.value);
  };

  const handleCityChange = (index, e) => {
    const newCities = [...cities];
    newCities[index].name = e.target.value;
    setCities(newCities);
  };

  const handleStateChange = (cityIndex, stateIndex, e) => {
    const newCities = [...cities];
    newCities[cityIndex].states[stateIndex].name = e.target.value;
    setCities(newCities);
  };
  const handleStateShippingChange = (cityIndex, stateIndex, e) => {
    const newCities = [...cities];
    newCities[cityIndex].states[stateIndex].shipping_fee = e.target.value;
    setCities(newCities);
  };

  const addCity = () => {
    setCities([
      ...cities,
      { name: "", states: [{ name: "", shipping_fee: 0 }] },
    ]);
  };

  const addState = (cityIndex) => {
    const newCities = [...cities];
    newCities[cityIndex].states.push({ name: "" });
    setCities(newCities);
  };

  const removeCity = (index) => {
    const newCities = [...cities];
    newCities.splice(index, 1);
    setCities(newCities);
  };

  const removeState = (cityIndex, stateIndex) => {
    const newCities = [...cities];
    newCities[cityIndex].states.splice(stateIndex, 1);
    setCities(newCities);
  };

  const createCountry = () => {
    productsContext
      ?.createCountry({ name: country, cities: cities })
      .then((res) => {
        if (res.data.id) {
          alert("تم الاضافة بنجاح");
          productsContext?.getCountries();
          setCountry("");
          setCities([{ name: "", states: [{ name: "" }] }]);
          onClose();
        } else {
          alert("حدث خطأ ما");
        }
      });
  };

  useEffect(() => {
    if (countryData) {
      setCountry(countryData?.name);
      productsContext
        ?.getCities({ country: countryData?.id })
        .then((res) => setCities(res.data));
    }
  }, [countryData]);

  const updateCountry = () => {
    productsContext
      ?.updateCountry({
        id: countryData?.id,
        name: country,
        cities: cities,
      })
      .then((e) => {
        if (e.data.id) {
          alert("تم التعديل بنجاح");
          productsContext?.getCountries();
          setCountry("");
          setCities([{ name: "", states: [{ name: "" }] }]);
          onClose();
        }
      });
  };

  return (
    <Drawer placement="right" onClose={onClose} open={open} width={500}>
      <div dir="rtl" className="cairo">
        <Box>
          <FormControl className="mb-6">
            <FormLabel>اسم البلد</FormLabel>
            <Input
              size={"xs"}
              type="text"
              value={country}
              onChange={handleCountryChange}
              className="border border-gray-300"
            />
          </FormControl>
          {cities?.map((city, cityIndex) => (
            <Box key={cityIndex} className="mb-6 ms-5">
              <HStack>
                <FormControl className="mb-4 flex-grow">
                  <FormLabel>
                    <p className="text-xs font-bold">مدينة {cityIndex + 1}</p>
                  </FormLabel>
                  <Input
                    size={"xs"}
                    type="text"
                    value={city.name}
                    onChange={(e) => handleCityChange(cityIndex, e)}
                    className="border border-gray-300"
                  />
                </FormControl>

                <BiTrash
                  onClick={() => {
                    if (countryData?.id) {
                      productsContext?.deleteCity(city.id);
                      removeCity(cityIndex);
                    } else {
                      removeCity(cityIndex);
                    }
                  }}
                  className="text-red-400 hover:text-red-600 transition-all cursor-pointer"
                />
              </HStack>
              {city?.states?.map((state, stateIndex) => (
                <HStack key={stateIndex} className="ms-6">
                  <FormControl className="mb-4 flex-grow">
                    <FormLabel className="">
                      <p className="text-xs">منطقة {stateIndex + 1}</p>
                    </FormLabel>
                    <div className="flex gap-2">
                      <Input
                        size={"xs"}
                        type="text"
                        value={state.name}
                        onChange={(e) =>
                          handleStateChange(cityIndex, stateIndex, e)
                        }
                        className="border border-gray-300"
                      />
                      <Input
                        size={"xs"}
                        type="text"
                        placeholder="سعر الشحن"
                        value={state.shipping_fee}
                        onChange={(e) =>
                          handleStateShippingChange(cityIndex, stateIndex, e)
                        }
                        className="border border-gray-300"
                      />
                    </div>
                  </FormControl>
                  <BiTrash
                    onClick={() => {
                      if (countryData?.id) {
                        productsContext?.deleteState(state.id);
                        removeState(cityIndex, stateIndex);
                      } else {
                        removeState(cityIndex, stateIndex);
                      }
                    }}
                    className="text-red-400 hover:text-red-600 transition-all cursor-pointer"
                  />
                </HStack>
              ))}
              <Button
                size={"xs"}
                onClick={() => addState(cityIndex)}
                className="bg-green-500 hover:bg-green-600 ms-6 text-white"
              >
                أضف منطقة
              </Button>
            </Box>
          ))}
          <Button
            onClick={addCity}
            size={"xs"}
            className="bg-blue-500 ms-5 hover:bg-blue-600 text-white"
          >
            أضف مدينة
          </Button>
        </Box>
        <hr className="mt-6" />
        {countryData ? (
          <Button
            size={"md"}
            colorScheme="blue"
            className="mt-6"
            onClick={updateCountry}
          >
            تعديل
          </Button>
        ) : (
          <Button
            size={"md"}
            colorScheme="green"
            className="mt-6"
            onClick={createCountry}
          >
            انشاء
          </Button>
        )}
      </div>
    </Drawer>
  );
};

export default CreateOrUpdateCountry;

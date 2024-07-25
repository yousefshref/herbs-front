import { Button, Input, Select, Textarea } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { ProductsContextProvider } from "../contexts/ProductsContext";
import { CartContextProvider } from "../contexts/CartContext";
import { OrderContextProvider } from "../contexts/OrderContext";
import { getCookie } from "../utlits/Functions";
import LoadingPage from "./LoadingPage";

const OrderForm = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [total, setTotal] = useState(0);
  const [status, setStatus] = useState("Pending");

  const productsContext = React.useContext(ProductsContextProvider);

  const countries = productsContext.countries;
  const cities = productsContext.cities;
  const states = productsContext.states;

  useEffect(() => {
    productsContext.getCountries();
  }, [country]);

  useEffect(() => {
    if (country) {
      productsContext.getCities({
        country: country,
      });
    } else {
      productsContext?.setCities([]);
    }
  }, [country]);

  useEffect(() => {
    if (city && country) {
      productsContext.getStates({
        city: city,
      });
    } else {
      productsContext?.setStates([]);
    }
  }, [city, country]);

  const cartsContext = React.useContext(CartContextProvider);

  const orderContext = React.useContext(OrderContextProvider);

  const [loading, setLoading] = useState(false);

  const order = async () => {
    setLoading(true);
    var total = 0;
    await cartsContext?.getCarts().then((e) =>
      e.data.map((cart) => {
        total += Number(cart.quantity * cart.variant_details.sell_price);
      })
    );

    const order = {
      name: name,
      phone: phone,
      address: address,
      country: country,
      city: city,
      state: state?.id,
      total: total + state?.shipping_fee,
      status: status,
      order_items: await cartsContext?.getCarts().then((e) => e.data),
    };
    orderContext.createOrder(order).then((e) => {
      if (e.data.id) {
        if (getCookie("token")) {
          cartsContext?.deleteUserCart();
        } else {
          localStorage.removeItem("cart");
        }
        window.location.href = `/orders/`;
      } else {
        Object.entries(e.data).map(([key, value]) => {
          alert(`${key}: ${value}`);
        });
      }
    });

    setLoading(false);
  };

  return (
    <form className="flex flex-col gap-3 p-2 rounded-lg bg-slate-100">
      {loading && <LoadingPage />}
      <div className="flex gap-4">
        <div className="flex flex-col w-1/2 gap-1">
          <label htmlFor="name">الاسم</label>
          <Input
            backgroundColor={"white"}
            rounded={"5px"}
            size={"sm"}
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex flex-col w-1/2 gap-1">
          <label htmlFor="phone">رقم الهاتف</label>
          <Input
            backgroundColor={"white"}
            rounded={"5px"}
            size={"sm"}
            id="phone"
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
      </div>
      <div className="flex gap-4">
        <div className="flex flex-col w-1/3 gap-1">
          <label htmlFor="country">الدولة</label>
          <Select
            backgroundColor={"white"}
            rounded={"5px"}
            size={"sm"}
            id="country"
            value={country}
            onChange={(e) => {
              setCountry(e.target.value);
            }}
          >
            <option value={""}>أختر</option>
            {countries?.map((country) => (
              <option key={country.id} value={country.id}>
                {country.name}
              </option>
            ))}
          </Select>
        </div>
        <div className="flex flex-col w-1/3 gap-1">
          <label htmlFor="city">المدينة</label>
          <Select
            backgroundColor={"white"}
            rounded={"5px"}
            size={"sm"}
            id="city"
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
            }}
          >
            <option value={""}>أختر</option>
            {cities?.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </Select>
        </div>
        <div className="flex flex-col w-1/3 gap-1">
          <label htmlFor="state">المنطقة</label>
          <Select
            backgroundColor={"white"}
            rounded={"5px"}
            size={"sm"}
            id="state"
            value={state ? JSON.stringify(state) : ""}
            onChange={(e) => {
              setState(e.target.value ? JSON.parse(e.target.value) : "");
            }}
          >
            <option value={""}>أختر</option>
            {states?.map((state) => (
              <option key={state.id} value={JSON.stringify(state)}>
                {state.name}
              </option>
            ))}
          </Select>
        </div>
      </div>
      <div className="w-full flex flex-col">
        <div className="flex flex-col gap-1">
          <label htmlFor="address">العنوان</label>
          <Textarea
            backgroundColor={"white"}
            rounded={"5px"}
            size={"sm"}
            id="address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <small className="text-red-500">يرجي الكتابة بالتفصيل</small>
        </div>
      </div>
      <Button
        onClick={order}
        paddingX={6}
        colorScheme="green"
        width={"fit-content"}
      >
        <p>شراء</p>
      </Button>
      <div className="mt-4 flex flex-col">
        {state?.id && (
          <p>
            تم اضافة سعر الشحن:{" "}
            <strong className="text-red-500">{state?.shipping_fee} EGP</strong>
          </p>
        )}
      </div>
    </form>
  );
};

export default OrderForm;

import axios from "axios";
import React, { createContext } from "react";
import { getCookie } from "../utlits/Functions";
import { server } from "../utlits/Variables";

const ProductsContext = ({ children }) => {
  const headers = {
    Authorization: `Token ${getCookie("token")}`,
  };

  //   mother category
  const [motherCategories, setMotherCategories] = React.useState([]);
  const getMotherCategories = async () => {
    const res = await axios.get(`${server}api/mother-category/`, { headers });
    setMotherCategories(res.data);
    return res;
  };

  const createMotherCategory = async (data) => {
    const res = await axios.post(`${server}api/mother-category/`, data, {
      headers,
    });
    return res;
  };

  const updateMotherCategory = async (data) => {
    const res = await axios.put(
      `${server}api/mother-category/${data.id}/`,
      data,
      {
        headers,
      }
    );
    return res;
  };

  const deleteMotherCategory = async (id) => {
    const res = await axios.delete(`${server}api/mother-category/${id}/`, {
      headers,
    });
    return res;
  };

  //   category
  const getCategorys = async ({ mother_category = "" }) => {
    const res = await axios.get(
      `${server}api/category/?mother_category=${mother_category}`,
      { headers }
    );
    return res;
  };

  const createCategory = async (data) => {
    const res = await axios.post(`${server}api/category/`, data, {
      headers,
    });
    return res;
  };

  const updateCategory = async (data) => {
    const res = await axios.put(`${server}api/category/${data.id}/`, data, {
      headers,
    });
    return res;
  };

  const deleteCategory = async (id) => {
    const res = await axios.delete(`${server}api/category/${id}/`, {
      headers,
    });
    return res;
  };

  // countries
  const [countries, setCountries] = React.useState([]);
  const getCountries = async () => {
    const res = await axios.get(`${server}api/countries/`, { headers });
    setCountries(res.data);
    return res;
  };

  const createCountry = async (data) => {
    const res = await axios.post(`${server}api/countries/`, data, {
      headers,
    });
    return res;
  };

  const updateCountry = async (data) => {
    const res = await axios.put(`${server}api/country/${data.id}/`, data, {
      headers,
    });
    return res;
  };

  const deleteCountry = async (id) => {
    const res = await axios.delete(`${server}api/country/${id}/`, {
      headers,
    });
    return res;
  };

  const deleteCity = async (id) => {
    const res = await axios.delete(`${server}api/city/${id}/`, {
      headers,
    });
    return res;
  };

  const deleteState = async (id) => {
    const res = await axios.delete(`${server}api/state/${id}/`, {
      headers,
    });
    return res;
  };

  const [cities, setCities] = React.useState([]);
  const getCities = async ({ country = "" }) => {
    const res = await axios.get(`${server}api/cities/?country=${country}`, {
      headers,
    });
    setCities(res.data);
    return res;
  };

  const [states, setStates] = React.useState([]);
  const getStates = async ({ city = "" }) => {
    const res = await axios.get(`${server}api/states/?city=${city}`, {
      headers,
    });
    setStates(res.data);
    return res;
  };

  //   products
  const [products, setProducts] = React.useState([]);
  const [productsCount, setProductsCount] = React.useState(0);
  const [productsNext, setProductsNext] = React.useState("");
  const [productsPrevious, setProductsPrevious] = React.useState("");
  const getProducts = async ({
    page = 1,
    search = "",
    category = "",
    mother_category = "",
  }) => {
    const res = await axios.get(
      `${server}api/product/?page=${page}&search=${search}&category=${category}&mother_category=${mother_category}`,
      {
        headers,
      }
    );
    setProducts(res.data.results);
    setProductsCount(res.data.count);
    setProductsNext(res.data.next);
    setProductsPrevious(res.data.previous);
    return res;
  };

  const [product, setProduct] = React.useState({});
  const getProduct = async (id) => {
    const res = await axios.get(`${server}api/product/${id}/`, { headers });
    setProduct(res.data);
    return res;
  };

  const createProduct = async (data) => {
    const res = await axios.post(`${server}api/product/`, data, {
      headers,
    });
    return res;
  };

  const updateProduct = async (data) => {
    const res = await axios.put(`${server}api/product/${data.id}/`, data, {
      headers,
    });
    return res;
  };

  const deleteVariant = async (id) => {
    const res = await axios.delete(`${server}api/variant/${id}/`, {
      headers,
    });
    return res;
  };

  return (
    <ProductsContextProvider.Provider
      value={{
        // mother category
        motherCategories,
        getMotherCategories,
        createMotherCategory,
        updateMotherCategory,
        deleteMotherCategory,
        // category
        getCategorys,
        createCategory,
        updateCategory,
        deleteCategory,
        // countries
        countries,
        setCountries,
        getCountries,
        createCountry,
        updateCountry,
        deleteCountry,
        cities,
        setCities,
        getCities,
        deleteCity,
        states,
        setStates,
        getStates,
        deleteState,
        // product create
        products,
        setProducts,
        getProducts,
        product,
        productsCount,
        productsNext,
        setProductsNext,
        productsPrevious,
        setProductsPrevious,
        setProduct,
        getProduct,
        createProduct,
        updateProduct,
        deleteVariant,
      }}
    >
      {children}
    </ProductsContextProvider.Provider>
  );
};

export default ProductsContext;
export const ProductsContextProvider = createContext();

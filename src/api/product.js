import CLIENT from "./client";

export const fetchCategories = async () => {
  const { data } = await CLIENT.get("/products/categories");
  return data;
};

export const fetchProductsByCategory = async (category) => {
  const { data } = await CLIENT.get(`/products/category=${category}`);
  return data;
};

export const fetchAllProducts = async () => {
  const { data } = await CLIENT.get("/products");
  return data;
};

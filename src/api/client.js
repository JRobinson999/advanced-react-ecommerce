import axios from "axios";

const CLIENT = axios.create({
  baseURL: "https://fakestoreapi.com",
  timeout: 10000,
});

export default CLIENT;

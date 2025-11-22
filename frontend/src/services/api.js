import axios from "axios";

export const api = axios.create({
  baseURL: "https://codewithrandom.onrender.com/api",
  // baseURL: "http://localhost:5000/api",
});

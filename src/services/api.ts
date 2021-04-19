import axios from "axios";

const api = axios.create({
  baseURL: "https://theblackwomanhistory.firebaseio.com",
});

export default api;

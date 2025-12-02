import axios from "axios";

const api = axios.create({
  baseURL:
    process.env.REACT_APP_API_URL || "https://bazar-online-zl1v.onrender.com",
});

export default api;

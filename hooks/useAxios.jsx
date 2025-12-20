import axios from "axios";

const useAxios = () => {
  const instance = axios.create({
    baseURL:  "http://localhost:5000",
  });

  const token = localStorage.getItem("access-token");
  if (token) {
    instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  
  

  return instance;
};

export default useAxios;

import axios from "axios";

const useAxios = () => {
  const instance = axios.create({
    baseURL:  "https://blooddonation-nu.vercel.app",
  });

  const token = localStorage.getItem("access-token");
  if (token) {
    instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  
  

  return instance;
};

export default useAxios;

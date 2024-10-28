// packages
import axios from "axios";

const instance = axios.create();

instance.interceptors.request.use((config) => {
  config.validateStatus = () => true;

  return config;
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return error.error.message;
  },
);

export default instance;

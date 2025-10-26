import axios, { AxiosError } from "axios";
const BASE_API = import.meta.env.VITE_BASE_API;

const api = axios.create({
  baseURL: BASE_API,
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response) {
      const status = error.response.status;
      const data = error.response.data;

      console.error(`API Error - Status ${status}:`, data);

      switch (status) {
        case 400:
          console.log("Bad Request: Data sent was invalid.");
          break;
        case 401:
          console.log(
            "Unauthorized. Redirecting to login or refreshing token..."
          );
          break;
        case 403:
          console.log("Access Forbidden.");
          break;
        case 404:
          console.log("Resource not found.");
          break;
        case 500:
          console.log("A server error occurred. Please try again.");
          break;
        default:
          break;
      }
    } else if (error.request) {
      console.error(
        "Network Error: No response received from server. Check your connection or server status."
      );
    } else {
      console.error("Request Setup Error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default api;

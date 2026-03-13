import axios, { InternalAxiosRequestConfig, AxiosError } from "axios";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://13.233.56.90";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");

      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

api.interceptors.response.use(
  (res) => res,
  (error: AxiosError) => {
    if (typeof window !== "undefined" && error.response?.status === 401) {
      localStorage.clear();
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);


export default api;

// interface ApiConfig {
//     baseUrl: string;
//     isProduction: boolean;
// }

// export const getApiConfig = (): ApiConfig => {
//     const isClient = typeof window !== "undefined";

//     let baseUrl: string;

//     if (isClient) {
//         baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
//     } else {
//         baseUrl = process.env.API_ENDPOINT || "http://localhost:8000/api"
//     }

//     const isProduction =
//         process.env.NODE_ENV === "production" ||
//         process.env.NEXT_PUBLIC_API_URL === "production";

//     return {
//         baseUrl,
//         isProduction
//     };
// };



// export async function fetchWithConfig<T>(
//     endpoint: string,
//     options?: RequestInit
// ): Promise<T> {
//     const {baseUrl} = getApiConfig();

//     const url = `${baseUrl}${
//         endpoint.startsWith("/") ? endpoint : `${endpoint}`
//     }`;
// }
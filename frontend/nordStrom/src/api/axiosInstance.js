import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000',
});

// Request interceptor to attach token if available
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    console.log("fromfrontend", token)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("YES")
    }
    console.log(config)
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor (optional: you can handle errors globally here)
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error)
    // console.log(response)
);

export default axiosInstance;

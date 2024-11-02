// src/api/axios.js
import axios from 'axios';

// Create an Axios instance
const apiClient = axios.create({
  baseURL: 'http://localhost:8000/api', // Adjust the baseURL as needed
  withCredentials: true, // Necessary for Sanctum
});

// Add a request interceptor to include CSRF token
apiClient.interceptors.request.use(
  async (config) => {
    await axios.get('http://localhost:8000/sanctum/csrf-cookie'); // Adjust the URL if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;

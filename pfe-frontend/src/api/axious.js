import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8000', // Your Laravel API URL
  withCredentials: true, // Required for Laravel Sanctum
});

export default apiClient;

import axios from 'axios';
import { LOCAL_STORAGE_KEY } from '../constant/common';

export  const API = axios.create({
  baseURL: 'http://localhost:5210/',
  headers: {
    'Content-Type': 'application/json',
  },
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(LOCAL_STORAGE_KEY.token); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


import axios from 'axios';
import { LOCAL_STORAGE_KEY } from '../constant/common';
import { isTokenExpired, logout } from '../ultils/helper';
import { toast } from 'react-toastify';
export const BASE_URL_DOWNLOAD =process.env.REACT_APP_URL_DOWNLOAD
export  const API = axios.create({
  baseURL: process.env.REACT_APP_URL_API,
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
    const token = localStorage.getItem(LOCAL_STORAGE_KEY.token);
    
    if (isTokenExpired(token)) {
      toast.error("Phiên đăng nhập đã hết hạn",{
        onClose:() =>  logout()
      })
      
    }
   else{
    return Promise.reject(error);
   }
  }
);
API.interceptors.response.use(
  response => response,
  error => {
    const token = localStorage.getItem(LOCAL_STORAGE_KEY.token);
    
    if (token && isTokenExpired(token)) {
      toast.error("Phiên đăng nhập đã hết hạn",{
        onClose:() =>  logout()
      })
      
    }
    else{
      return Promise.reject(error);
    }
  }
 
);


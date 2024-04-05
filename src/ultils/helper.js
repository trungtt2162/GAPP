import axios from "axios";
import { toast } from "react-toastify";
import { LOCAL_STORAGE_KEY } from "../constant/common";

export function uploafFileBase64(event, setValue) {
  const file = event.target.files[0];
  const reader = new FileReader();
  let base64;
  reader.onload = function (e) {
    base64 = e.target.result;
    setValue(base64);
  };

  reader.readAsDataURL(file);
}

export function getQuery() {
  const queryString = window.location.search.slice(1);
  const params = {};

  if (queryString) {
    const paramPairs = queryString.split("&");

    paramPairs.forEach((pair) => {
      const [key, value] = pair.split("=");
      const decodedKey = decodeURIComponent(key);
      const decodedValue = value ? decodeURIComponent(value) : true;

      if (decodedKey.endsWith("[]")) {
        const paramName = decodedKey.slice(0, -2);
        if (!params[paramName]) {
          params[paramName] = [];
        }
        params[paramName].push(decodedValue);
      } else {
        params[decodedKey] = decodedValue;
      }
    });
  }

  return params;
}

// handleErr
export const handleError = (error,isshowToast=true) => {
  let mess = "";
  if (axios.isAxiosError(error)) {
    mess = error.response?.data?.Message || "Something went wrong";
    const errorObj = error.response?.data?.errors;
    if(errorObj){
      const listKey = Object.keys(errorObj);
      const key = listKey.find(i => !i.includes("$"));
      
      if(key){
        const listErr = errorObj[key];
        mess = listErr.join("\n");
      }
    }


  } else {
    mess = error.message || "Something went wrong";
  }
  if(isshowToast){
    toast.error(mess)
  }
  return mess;
};



export const logout = (isRedirect = true) => {
  localStorage.removeItem(LOCAL_STORAGE_KEY.token);
  if(isRedirect){
    window.location.href = "/login";
  }
}
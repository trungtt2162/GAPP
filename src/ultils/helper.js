import axios from "axios";
import { toast } from "react-toastify";
import { LOCAL_STORAGE_KEY } from "../constant/common";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./../firebase";
import { v4 } from "uuid";
import moment from "moment";
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
 export function isTokenExpired(token) {
  // Tách phần payload của token từ phần còn lại bằng cách tách chuỗi bằng dấu chấm
  const tokenParts = token?.split('.');
  const payload = JSON.parse(atob(tokenParts[1]));

  // Lấy thời gian hết hạn (exp) từ payload
  const expirationTime = payload?.exp;
  console.log(expirationTime)

  // Lấy thời gian hiện tại (tính bằng giây)
  const currentTime = Math.floor(Date.now() / 1000);

  // So sánh thời gian hết hạn với thời gian hiện tại
  return expirationTime < currentTime;
}



export async function uploadImageToFirebase(file) {
  try {
    const imageRef = ref(storage, `images/${file.name + v4()}`);
    await uploadBytes(imageRef, file);
    const url = await getDownloadURL(imageRef);
    return url;
  } catch (error) {
    console.error("Error uploading image to Firebase:", error);
    return null;
  }
}

// 
export const dateFormat = (date) =>  date ? moment(date).format("DD-MM-YYYY"):"";
export const dateFormat2 = (date) =>  date ? moment(date).format("YYYY-MM-DD"):"";



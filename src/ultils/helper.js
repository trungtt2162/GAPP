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
export const handleError = (error, isshowToast = true) => {
  let mess = "";
  if (axios.isAxiosError(error)) {
    mess = error.response?.data?.Message || "Có lỗi xảy ra";
    const errorObj = error.response?.data?.errors;
    if (errorObj) {
      const listKey = Object.keys(errorObj);
      const key = listKey.find((i) => !i.includes("$"));

      if (key) {
        const listErr = errorObj[key];
        mess = listErr.join("\n");
      }
    }
  } else {
    mess = error.message || "Có lỗi xảy ra";
  }
  if (isshowToast) {
    toast.dismiss()
    toast.error("Có lỗi xảy ra");
  }
  return mess;
};

export const logout = (isRedirect = true) => {
  localStorage.removeItem(LOCAL_STORAGE_KEY.token);
  if (isRedirect) {
    window.location.href = "/login";
  }
};
export function isTokenExpired(token) {
  // Tách phần payload của token từ phần còn lại bằng cách tách chuỗi bằng dấu chấm
  const tokenParts = token?.split(".");
  const payload = JSON.parse(atob(tokenParts[1]));

  // Lấy thời gian hết hạn (exp) từ payload
  const expirationTime = payload?.exp;
  console.log(expirationTime);

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
export const dateFormat = (date) =>
  date ? moment(date).format("DD/MM/YYYY") : "";
export const dateFormat2 = (date) =>
  date ? moment(date).format("YYYY-MM-DD") : "";
  export const dateFormat3 = (date) => {
    if (!date) return "";
  
    const formattedDate = new Date(date);
    const day = formattedDate.getDate().toString().padStart(2, '0');
    const month = (formattedDate.getMonth() + 1).toString().padStart(2, '0');
    const year = formattedDate.getFullYear();
    const hours = formattedDate.getHours().toString().padStart(2, '0');
    const minutes = formattedDate.getMinutes().toString().padStart(2, '0');
    const seconds = formattedDate.getSeconds().toString().padStart(2, '0');
  
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  };

export function buildTree(data) {
  let map = {},
    node,
    roots = [],
    i;

  // Đầu tiên tạo một map với tất cả các phần tử trong data
  for (i = 0; i < data.length; i += 1) {
    map[data[i].Id] = i; // dùng Id làm khóa
    data[i].children = []; // thêm thuộc tính children để chứa các nút con
  }

  for (i = 0; i < data.length; i += 1) {
    node = data[i];
    if (node.ParentID !== null) {
      // Nếu có ParentID, tìm phần tử cha và thêm nút hiện tại vào mảng children của nó
      data[map[node.ParentID]].children.push(node);
    } else {
      // Nếu không có ParentID, nó là nút gốc
      roots.push(node);
    }
  }

  // Trả về mảng gốc, trong trường hợp này chỉ có một phần tử gốc
  return roots[0]; // Giả sử chỉ có một gốc
}

export const checkEmptyData = (list) => {
  if (list.length === 0) {
    return (
      <div>
        <img
          style={{
            width: 100,
          }}
          src="/empty.png"
        />
        <p
          style={{
            color: "gray",
            padding: 20,
            marginTop: 20,
          }}
        >
          Dữ liệu trống
        </p>
      </div>
    );
  }
};

// Sort By Date
export function sortArrByDate(arr, key) {
  try {
    return arr.sort((a, b) => new Date(b[key]) - new Date(a[key]));
  } catch (error) {
    console.log("errr");
  }
}
export const splitText = (txt="") => {
  return txt.split("\n").map(i => <div>{i}</div>)
}


export const formatMoney = (amount="") => {
  amount = amount + ""
  const parts = amount?.trim().toString().split('.');
  const integerPart = parts[0];
  let decimalPart = parts.length > 1 ? `.${parts[1]}` : '';
  let formattedInteger = '';
  for (let i = integerPart.length - 1, j = 0; i >= 0; i--, j++) {
    if (j > 0 && j % 3 === 0) {
      formattedInteger = ',' + formattedInteger;
    }
    formattedInteger = integerPart[i] + formattedInteger;
  }

  return  formattedInteger + decimalPart;
}

export const validatePhoneNumber = (phoneNumber) => {
  if(!phoneNumber)return true;
  const phoneRegex = /^[0-9]{10}$/; 

  return phoneRegex.test(phoneNumber.trim());
}


export const validateIDCard = (idCard) => {
 if(!idCard){
  return ;
 }
  const idCardRegex = /^[0-9]{9}$|^[0-9]{12}$/;


  return idCardRegex.test(idCard.trim());
};


export const validateAddress = (address) => {
  if(!address){
return true;
  }
 
  const addressRegex = /.{5,}/;

  return addressRegex.test(address.trim());
};

export const validateBirthday = (birthday) => {

  const birthdayRegex = /^(0?[1-9]|[12][0-9]|3[01])[/](0?[1-9]|1[0-2])[/](19|20)\d{2}$/;

  
  if (!birthdayRegex.test(birthday)) {
    return false; // Ngày sinh nhật không đúng định dạng
  }

  // Kiểm tra xem ngày sinh nhật có hợp lệ không
  const parts = birthday.split('/');
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const year = parseInt(parts[2], 10);

  const today = new Date();
  const birthDate = new Date(year, month - 1, day);

  return (
    birthDate.getFullYear() === year &&
    birthDate.getMonth() === month - 1 &&
    birthDate.getDate() === day &&
    birthDate < today
  );
};

export const checkValidEmail = (email = "") => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};


//
export function extractUserDataFromFamilyTree(data, idFamilyTree) {
  // Tạo một đối tượng mới để lưu trữ dữ liệu người dùng
  let result = {};

  // Hàm đệ quy để duyệt qua cây genealogy và trích xuất dữ liệu người dùng
  function extractUsers(node) {
      // Kiểm tra nếu có người dùng trong node và có idFamilyTree tương ứng
      if (node?.Users && node?.Users.length > 0) {
          const users = node?.Users.filter(user => user.IdFamilyTree === idFamilyTree);
          // Nếu có người dùng thuộc idFamilyTree, thêm vào kết quả
          if (users.length > 0) {
              result = { ...node, Users: users };
              return;
          }
      }

      // Nếu có nút con, tiếp tục đệ quy qua từng nút con
      if (node?.children && node?.children.length > 0) {
          node?.children.forEach(child => {
              extractUsers(child);
          });
      }
  }

  // Bắt đầu quá trình trích xuất từ gốc của cây genealogy
  extractUsers(data);

  // Trả về kết quả đã trích xuất
  return result;
}
export function checkUserExistence(data, idUser) {
   // Hàm đệ quy để duyệt qua tất cả các node trong cây genealogy
   function traverse(node) {
    // Kiểm tra nếu node hiện tại chứa thông tin user và có idUser trùng khớp
    if (node?.Users && node?.Users.some(user => user.UserId === idUser)) {
        // Trả về idFamilyTree của user tương ứng
        return node?.Users.find(user => user.UserId === idUser).IdFamilyTree;
    }
    // Duyệt qua tất cả các con của node hiện tại
    if (node?.children) {
        for (let i = 0; i < node?.children.length; i++) {
            const familyTreeId = traverse(node?.children[i]);
            if (familyTreeId !== null) {
                return familyTreeId; // Trả về idFamilyTree nếu tìm thấy
            }
        }
    }
    return null; // Trả về null nếu không tìm thấy user có idUser tương ứng trong cây genealogy
}

// Bắt đầu duyệt từ node gốc của cây genealogy
return traverse(data);
}
import { useEffect, useId } from "react";
import "./App.css";
import ConfigRoutes from "./router/configRoutes";
import useAuthStore from "./zustand/authStore";
import io from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
import { handleError } from "./ultils/helper";
import { notiApi } from "./api/noti.api";

const App = () => {
  // const socket = io.connect(process.env.REACT_APP_URL_SOCKET);
  const connectionID = uuidv4();

  const { isLogin, getInfoUser, user ,setListNoti,listNoti} = useAuthStore();

  // connect
  const connectSocket = () => {
    const userID = user.Id;
    const url = `${process.env.REACT_APP_URL_SOCKET}/api/${userID}/register?connectionId=${connectionID}`;
    // thông tin token cấu hình như dưới
    const authToken = process.env.REACT_APP_TOKEN_SOCKET;
    console.log(authToken);

    // B1: đăng ký ng dùng nhận socket
    // B2: Đăng ký thành công thì khởi tạo socket
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-AUTH-TOKEN": authToken,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response;
      })
      .then((data) => {
        const socket = io(process.env.REACT_APP_URL_SOCKET);

        socket.on("connect", () => {
          console.log("Connected to server");
          socket.emit("register", userID, connectionID);
        });
        // nhận thông báo từ ng dùng
        socket.on("message", (message) => {
          const currentId = message.SenderID;
          const item = listNoti.find(i => i.SenderID == currentId);
          if(!item){
            setListNoti([message,...listNoti])
          }
        });
      })
      .catch((error) => {
        console.error("Error registering user:", error);
      });
  };
  useEffect(() => {
    if (user && user.Id) {
      connectSocket();
    }
  }, [user]);
  useEffect(() => {
    if (isLogin) {
      getInfoUser();
    }
  }, [isLogin]);


  // get List Noti
  const getListNoti = async() => {
    try {
      const res = await notiApi.getListNoti()
      setListNoti(res?.data?.Data?.Data || [])
    } catch (error) {
   
    }
  }
  useEffect(() => {
   if(user){
    getListNoti()
   }
  },[user])
  return <ConfigRoutes />;
};

export default App;

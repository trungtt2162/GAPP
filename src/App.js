import { useEffect } from "react";
import "./App.css";
import ConfigRoutes from "./router/configRoutes";
import useAuthStore from "./zustand/authStore";

const App = () => {
  console.log(process.env)
  const { isLogin, getInfoUser } = useAuthStore();
  useEffect(() => {
    if (isLogin) {
      getInfoUser();
    }
  }, [isLogin]);
  return <ConfigRoutes />;
};

export default App;

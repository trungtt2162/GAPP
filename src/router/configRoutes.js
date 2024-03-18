import { Route, Routes } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./../theme";

import App from "./../App";
import { ToastContainer } from "react-toastify";
import Login from "./../components/Auth/Login";
import DashBoard from "./../components/Auth/DashBoard";
import Register from "./../components/Auth/Register";
import PageTree from "../page/family-tree/PageTree";
import HistoryFamily from "../page/history-family/HistoryFamily";
import Footer from "../components/layout/footer";
import PraviteLayout from "../layouts/PrivateLayout";
import Home from "../page/home/Home";
import PageTreeAdmin from "../page/family-tree/admin-family-tree/PageTreeAdmin";
const NotFound = () => {
  return (
    <div className="container mt-3 alert alert-danger" role="alert">
      404 - Not found data with your current URL
    </div>
  );
};
const ConfigRoutes = (props) => {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<PraviteLayout />}>
          <Route path="/" element={<Home />} />

            <Route path="users" element={<></>} />
        
          <Route path="/pageTree" element={<PageTreeAdmin />}></Route>
          <Route path="/history" element={<HistoryFamily />}></Route>
          <Route path="/quiz/:id" element={<></>} />
          <Route path="/admin" element={<></>}>
            <Route index element={<DashBoard />} />
            <Route path="" element={<></>} />
          </Route>
        
          <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        {/* <Footer /> */}
      </ThemeProvider>
    </div>
  );
};
export default ConfigRoutes;

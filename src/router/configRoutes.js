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
import ManageAdmin from "../page/manage-admin/ManageAdmin";
import ManageMemberFund from "../page/funds/member-fund/MemberFund";
import ManageAdminFund from "../page/funds/admin-fund/AdminFund";
import ProfileManager from "../page/profile/ProfileManage";
import EventMember from "../page/member-event.jsx/EventMember";
import RequestEvents from "../page/request-event/RequestEvent";
import HomeNoLogin from "../page/home/HomeNologin";
import useAuthStore from "../zustand/authStore";
import { USER_ROLE } from "../constant/common";
const NotFound = () => {
  return (
    <div className="container mt-3 alert alert-danger" role="alert">
      404 - Not found data with your current URL
    </div>
  );
};


const ConfigRoutes = (props) => {
  
const { isLogin, roleCode } = useAuthStore();
const isSiteAdmin = isLogin && roleCode === USER_ROLE.SiteAdmin;
const isSupperAdmin = isLogin && roleCode === USER_ROLE.SupperAdmin;
const isUser = isLogin && roleCode === USER_ROLE.User;
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
        <Route path="/" element={<PraviteLayout />}>
            <Route path="/" element={!isLogin ?<HomeNoLogin />: <Home />} />
            {!isLogin && (
              <Route path="/home-nologin" element={<HomeNoLogin />} />
            )}

            {(isSiteAdmin||isUser) && <Route path="/pageTree" element={<PageTreeAdmin />}></Route>}
           {isSupperAdmin &&  <Route path="/admin" element={<ManageAdmin />} />}
            {isUser && <Route path="/member-fund" element={<ManageMemberFund />} />}
            {isSiteAdmin && <Route path="/admin-fund" element={<ManageAdminFund />} />}
            {isLogin && <Route path="/profile" element={<ProfileManager />} />}
            {(isUser || isSiteAdmin) && <Route path="/event" element={<EventMember />} />}
            {(isUser ||  isSiteAdmin) && <Route path="/request-event" element={<RequestEvents />} />}
           {(isSiteAdmin || isUser) &&  <Route path="/history" element={<HistoryFamily />} />}
          </Route>
          { <Route path="/login" element={<Login />} />}
          {!isLogin && <Route path="/register" element={<Register />} />}
          {/* <Route path="*" element={<NotFound />} /> */}
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

import { CssBaseline, ThemeProvider } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { theme } from "./../theme";

import { ToastContainer } from "react-toastify";
import { USER_ROLE } from "../constant/common";
import PraviteLayout from "../layouts/PrivateLayout";
import EventGuest from "../page/event-guest/EventGuest";
import PageTreeAdmin from "../page/family-tree/admin-family-tree/PageTreeAdmin";
import ManageAdminFund from "../page/funds/admin-fund/AdminFund";
import ManageMemberFund from "../page/funds/member-fund/MemberFund";
import HistoryFamily from "../page/history-family/HistoryFamily";
import Home from "../page/home/Home";
import HomeNoLogin from "../page/home/HomeNologin";
import ManageAdmin from "../page/manage-admin/ManageAdmin";
import EventMember from "../page/member-event.jsx/EventMember";
import ProfileManager from "../page/profile/ProfileManage";
import RequestEvents from "../page/request-event/RequestEvent";
import useAuthStore from "../zustand/authStore";
import Login from "./../components/Auth/Login";
import Register from "./../components/Auth/Register";
import HistoryGuest from "../page/history-guest/HistoryGuest";
import GeneGuest from "../page/gene-guest/GeneGuest";
const NotFound = () => {
  return (
    <div className="container mt-3 alert alert-danger" role="alert">
      404 - Not found data with your current URL
    </div>
  );
};


const ConfigRoutes = (props) => {
  
const { isLogin, roleCode } = useAuthStore();
console.log(roleCode,isLogin)
const isAdmin = isLogin && (roleCode === USER_ROLE.SiteAdmin || roleCode === USER_ROLE.PeopleAdmin);
  const isSiteAdmin = isLogin && roleCode === USER_ROLE.SiteAdmin;
  const isPeopleAdmin = isLogin && roleCode === USER_ROLE.PeopleAdmin;
  const isSupperAdmin = isLogin && roleCode === USER_ROLE.SupperAdmin;
  const isUser = isLogin && roleCode === USER_ROLE.User;
  const isMember = isUser || isAdmin;
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
          
            {(isAdmin||isUser || !isLogin) && <Route path="/pageTree" element={isLogin ? <PageTreeAdmin /> :<GeneGuest />}></Route>}
           {isSupperAdmin &&  <Route path="/admin" element={<ManageAdmin />} />}
            {(isUser || isPeopleAdmin) && <Route path="/member-fund" element={<ManageMemberFund />} />}
            {isSiteAdmin && <Route path="/admin-fund" element={<ManageAdminFund />} />}
            {isLogin && <Route path="/profile" element={<ProfileManager />} />}
            {(isUser || isAdmin | !isLogin) && <Route path="/event" element={isLogin ?<EventMember />:<EventGuest />} />}
            {(isUser ||  isAdmin) && <Route path="/request-event" element={<RequestEvents />} />}
           {(isUser || isAdmin | !isLogin) &&  <Route path="/history" element={isLogin?<HistoryFamily />:<HistoryGuest />} />}
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

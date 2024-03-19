import React from "react";
import TabContainer from "../../components/common/tabs/TabContainer";
import ManageSiteAdmin from "./components/manage-site-admin/ManageSiteAdmin";
import AdminLog from "./components/admin-log/LogAdmin";
import ListFeedBack from "./components/feedback/ListFeedback";
import ListAccount from "./account/ListAccount";
const ManageAdmin = () => {
  const listSideBar = [
    {
      key: 1,
      name: "Tài khoản",
      component: ListAccount,
    },
    {
      key: 2,
      name: "Quản lý site admin",
      component:ManageSiteAdmin,
    },
    {
      key: 3,
      name: "Quản lý log",
      component:AdminLog,
    },
    {
      key: 4,
      name: "Danh sách chờ phản hồi",
      component:ListFeedBack,
    },
    
    {
      key: 5,
      name: "Report",
      component:ListAccount,
    },
  ];
  return <TabContainer listSideBar={listSideBar} />;
};

export default ManageAdmin;

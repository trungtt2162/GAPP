import React from "react";
import TabContainer from "../../../components/common/tabs/TabContainer";
import ManageMember from "./components/manage-member/ManageMember";
import ManageLocation from "./components/manage-location/ManageLocation";
import LogManage from "./components/manage-log/ManageLog";
import ManageEvent from "./components/manage-event/ManageEvent";
import ManageHistory from "./components/manage-history/ManageHistory";
const PageTreeAdmin = () => {
  
  const listSideBar = [
    {
      key: 1,
      name: "Quản lý thành viên",
      component:ManageMember
    },
    {
      key: 2,
      name: "Quản lý lịch sử",
      component:ManageHistory
    },
    {
      key: 3,
      name: "Quản lý địa điểm",
      component:ManageLocation
    },
    {
      key: 4,
      name: "Quản lý log",
      component:LogManage
    },
    {
      key: 5,
      name: "Quản lý sự kiện",
      component:ManageEvent
    },
    {
      key: 6,
      name: "Quản lý thông báo",
      component:ManageMember
    },
  ];
  return (
    
   <TabContainer listSideBar={listSideBar} />
  );
};

export default PageTreeAdmin;

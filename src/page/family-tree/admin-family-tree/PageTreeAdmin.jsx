import React from "react";
import TabContainer from "../../../components/common/tabs/TabContainer";
import ManageMember from "./components/manage-member/ManageMember";
import ManageLocation from "./components/manage-location/ManageLocation";
import LogManage from "./components/manage-log/ManageLog";
import ManageEvent from "./components/manage-event/ManageEvent";
import ManageHistory from "./components/manage-history/ManageHistory";
import FamilyTree from "./components/family-tree/FamilyTree";
import useAuthStore from "../../../zustand/authStore";
import { USER_ROLE } from "../../../constant/common";
const PageTreeAdmin = () => {
  const { isLogin, roleCode } = useAuthStore();

  const isSiteAdmin = isLogin && roleCode === USER_ROLE.SiteAdmin;
  const isSupperAdmin = isLogin && roleCode === USER_ROLE.SupperAdmin;
  const isUser = isLogin && roleCode === USER_ROLE.User;
  const isMember = isUser || isSiteAdmin;
  
  const listSideBar = [
    {
      key: 1,
      name: "Cây gia phả",
      component:FamilyTree,
      show:isMember
    },
    {
      key: 2,
      name: "Quản lý thành viên",
      component:ManageMember,
      show:isSiteAdmin
    },
    {
      key: 3,
      name: "Quản lý lịch sử",
      component:ManageHistory,
      show:isSiteAdmin
    },
    {
      key: 4,
      name: "Quản lý địa điểm",
      component:ManageLocation,
      show:isSiteAdmin
    },
    {
      key: 5,
      name: "Quản lý log",
      component:LogManage,
      show:isSiteAdmin
    },
    {
      key: 6,
      name: "Quản lý sự kiện",
      component:ManageEvent,
      show:isSiteAdmin

    },
    // {
    //   key: 6,
    //   name: "Quản lý thông báo",
    //   component:ManageMember
    // },
  ];
  return (
    
   <TabContainer listSideBar={listSideBar.filter(i => i.show)} />
  );
};

export default PageTreeAdmin;

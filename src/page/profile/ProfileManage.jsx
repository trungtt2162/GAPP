import React from "react";
import TabContainer from "../../components/common/tabs/TabContainer";
import Profile from "./Profile";
import ChangePasswordForm from "./ChangePass";
import RequestGele from "./RequestGele";

const ProfileManager = () => {
  const listSideBar = [
    {
      key: 1,
      name: "Thông tin cá nhân",
      component: Profile,
    },
    {
      key: 2,
      name: "Đổi mật khẩu",
      component:ChangePasswordForm,
    },
    {
      key: 3,
      name: "Request vào gia phả",
      component:RequestGele,
    },
    
  ];
  return <TabContainer listSideBar={listSideBar} />;
};

export default ProfileManager;

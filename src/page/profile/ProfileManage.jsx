import React from "react";
import TabContainer from "../../components/common/tabs/TabContainer";
import Profile from "./Profile";
import ChangePasswordForm from "./ChangePass";

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
    
  ];
  return <TabContainer listSideBar={listSideBar} />;
};

export default ProfileManager;

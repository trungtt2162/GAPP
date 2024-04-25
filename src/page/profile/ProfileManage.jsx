import React from "react";
import TabContainer from "../../components/common/tabs/TabContainer";
import Profile from "./Profile";
import ChangePasswordForm from "./ChangePass";
import RequestGele from "./RequestGele";
import useAuthStore from "../../zustand/authStore";
import { USER_ROLE } from "../../constant/common";
import CurrentPositionGene from "./CurrentPostionGene";

const ProfileManager = () => {
  const { isLogin, roleCode } = useAuthStore();

  const isSiteAdmin = isLogin && roleCode === USER_ROLE.SiteAdmin;
  const isSupperAdmin = isLogin && roleCode === USER_ROLE.SupperAdmin;
  const isPeopleAdmin = isLogin && roleCode === USER_ROLE.PeopleAdmin;
  const isUser = isLogin && roleCode === USER_ROLE.User;
  const isMember = isUser || isSiteAdmin || isPeopleAdmin;

  const listSideBar = [
    {
      key: 1,
      name: "Thông tin cá nhân",
      component: Profile,
      show:true
    },
    {
      key: 2,
      name: "Đổi mật khẩu",
      component:ChangePasswordForm,
      show:true
    },
    // {
 
    //   key: 2.5,
    //   name: "Vị trí trong gia phả",
    //   component:CurrentPositionGene,
    //   show:    isSiteAdmin 
    // },
    
    // {
 
    //   key: 3,
    //   name: "Yêu cầu vào gia phả",
    //   component:RequestGele,
    //   show:    (isUser || isPeopleAdmin || isSiteAdmin) 
    // },
    
    
  ];
  return <TabContainer listSideBar={listSideBar.filter(i =>i.show)} />;
};

export default ProfileManager;

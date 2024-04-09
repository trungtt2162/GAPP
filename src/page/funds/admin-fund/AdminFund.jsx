import React from "react";
import { useLocation } from "react-router-dom";
import TabContainer from "../../../components/common/tabs/TabContainer";
import { getQuery } from "../../../ultils/helper";
import FeedBackFund from "../components/feedback-fund/FeedBackFund";
import FundAdminDetail from "../components/list-fund-admin/FundAdminDetail";
import ListFundAdmin from "../components/list-fund-admin/ListFundAdmin";
import DonateManage from "../components/list-fund-admin/DonateManage";
import useAuthStore from "../../../zustand/authStore";
import { USER_ROLE } from "../../../constant/common";
const ManageAdminFund = () => {
  const { isLogin, roleCode } = useAuthStore();

  const isSiteAdmin = isLogin && roleCode === USER_ROLE.SiteAdmin;
  const isSupperAdmin = isLogin && roleCode === USER_ROLE.SupperAdmin;
  const isPeopleAdmin = isLogin && roleCode === USER_ROLE.PeopleAdmin;
  const isUser = isLogin && roleCode === USER_ROLE.User;
  const isMember = isUser || isSiteAdmin || isPeopleAdmin;
  const { id } = getQuery();
  const location = useLocation();
  const listSideBar = [
    {
      key: 1,
      name: "Danh sách quỹ",
      component: id ? FundAdminDetail : ListFundAdmin,
      path: "/fund",
    },
    {
      key: 2,
      name: "Thu và chi",
      component: DonateManage,
    },
  ];
  return <TabContainer listSideBar={listSideBar} />;
};

export default ManageAdminFund;

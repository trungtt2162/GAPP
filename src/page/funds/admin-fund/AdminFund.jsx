import React from "react";
import { useLocation } from "react-router-dom";
import TabContainer from "../../../components/common/tabs/TabContainer";
import { getQuery } from "../../../ultils/helper";
import FeedBackFund from "../components/feedback-fund/FeedBackFund";
import FundAdminDetail from "../components/list-fund-admin/FundAdminDetail";
import ListFundAdmin from "../components/list-fund-admin/ListFundAdmin";
import DonateManage from "../components/list-fund-admin/DonateManage";
const ManageAdminFund = () => {
  const { id } = getQuery();
  const location = useLocation();
  const listSideBar = [
    {
      key: 1,
      name: "Xem danh sách quỹ",
      component: id ? FundAdminDetail : ListFundAdmin,
      path: "/admin-fund",
    },
    {
      key: 2,
      name: "Quản lý donate",
      component: DonateManage,
    },
  ];
  return <TabContainer listSideBar={listSideBar} />;
};

export default ManageAdminFund;

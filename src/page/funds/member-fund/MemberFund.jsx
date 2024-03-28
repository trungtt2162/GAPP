import React from "react";
import ListAccount from "../../manage-admin/account/ListAccount";
import TabContainer from "../../../components/common/tabs/TabContainer";
import ListFundMember from "../components/list-fund-member/ListFundMember";
import FundDetail from "../components/list-fund-member/FundMemberDetail";
import { useLocation, useParams } from "react-router-dom";
import { getQuery } from "../../../ultils/helper";
import FeedBackFund from "../components/feedback-fund/FeedBackFund";
const ManageMemberFund = () => {
    const {id}  = getQuery();
    const location = useLocation();
  const listSideBar = [
    {
      key: 1,
      name: "Xem danh sách quỹ",
      component: id  ? FundDetail:ListFundMember,
      path:"/member-fund"
    },
    {
      key: 2,
      name: "Góp ý",
      component:FeedBackFund,

    },
   
    
  ];
  return <TabContainer listSideBar={listSideBar} />;
};

export default ManageMemberFund;

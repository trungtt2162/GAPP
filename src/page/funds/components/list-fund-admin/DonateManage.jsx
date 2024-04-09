import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import ButtonTab from "../../../../components/common/button/ButtonTab";
import TabPenal from "../../../../components/common/tabs/TabPenal";
import { getQuery } from "../../../../ultils/helper";
import ListFundMember from "../list-fund-member/ListFundMember";
import "./../list-fund-member/ListFund.scss";
import AddDonateMember from "./AddDonatemember";
import DonateDetail from "./DonateDetail";
import AddSpend from "./AddSpend";
import ListContributor from "./ListContributor";
import ListSend from "./ListSend";
import useAuthStore from "../../../../zustand/authStore";
import { USER_ROLE } from "../../../../constant/common";
const DonateManage = () => {
  const [value, setValue] = useState(1);
  const location = useLocation();
  const { id } = getQuery();
  const { isLogin, roleCode } = useAuthStore();

  const isSiteAdmin = isLogin && roleCode === USER_ROLE.SiteAdmin;
  const isSupperAdmin = isLogin && roleCode === USER_ROLE.SupperAdmin;
  const isPeopleAdmin = isLogin && roleCode === USER_ROLE.PeopleAdmin;
  const isUser = isLogin && roleCode === USER_ROLE.User;
  const isMember = isUser || isSiteAdmin || isPeopleAdmin;
  return (
    <div>
      <div className="flex-center">
        <ButtonTab
          path="/fund"
          index={1}
          value={value}
          text={"Danh sách đóng góp"}
          onClick={(e) => setValue(1)}
        />
        <ButtonTab
          path="/fund"
          index={2}
          value={value}
          text={"Danh sách đã chi"}
          onClick={(e) => setValue(2)}
        />
        {isSiteAdmin && <ButtonTab
          index={3}
          value={value}
          text={"Thêm Người đóng góp"}
          onClick={(e) => setValue(3)}
        />}
        {isSiteAdmin && <ButtonTab
          index={4}
          value={value}
          text={"Thêm khoản chi"}
          onClick={(e) => setValue(4)}
        />}
      </div>
      <div>
        <div
          style={{
            marginTop: 30,
          }}
        >
          <TabPenal value={value} index={1}>
            <ListContributor />
          </TabPenal>
          <TabPenal value={value} index={2}>
            <ListSend />
          </TabPenal>
          <TabPenal value={value} index={3}>
            <AddDonateMember />
          </TabPenal>
          <TabPenal value={value} index={4}>
            <AddSpend />
          </TabPenal>
        </div>
      </div>
    </div>
  );
};

export default DonateManage;

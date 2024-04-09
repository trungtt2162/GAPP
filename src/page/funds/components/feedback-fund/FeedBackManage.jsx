import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import FeedBackFund from "./FeedBackFund";
import useAuthStore from "../../../../zustand/authStore";
import { USER_ROLE } from "../../../../constant/common";
import ButtonTab from "../../../../components/common/button/ButtonTab";
import TabPenal from "../../../../components/common/tabs/TabPenal";
import ListFeedback from "./ListFeedBack";
const FeedBackManage = () => {
  const [value, setValue] = useState(1);
  const location = useLocation();
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
          index={1}
          value={value}
          text={"Danh sách góp ý"}
          onClick={(e) => setValue(1)}
        />
        <ButtonTab
          index={2}
          value={value}
          text={"Thêm góp ý"}
          onClick={(e) => setValue(2)}
        />
      
      </div>
      <div>
        <div
          style={{
            marginTop: 30,
          }}
        >
          <TabPenal value={value} index={1}>
            <ListFeedback />
          </TabPenal>
          <TabPenal value={value} index={2}>
            <FeedBackFund />
          </TabPenal>
          
        </div>
      </div>
    </div>
  );
};

export default FeedBackManage;

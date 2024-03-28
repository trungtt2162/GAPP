import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import ButtonTab from "../../../../components/common/button/ButtonTab";
import TabPenal from "../../../../components/common/tabs/TabPenal";
import { getQuery } from "../../../../ultils/helper";
import ListFundMember from "../list-fund-member/ListFundMember";
import "./../list-fund-member/ListFund.scss";
import AddDonateMember from "./AddDonatemember";
import DonateDetail from "./DonateDetail";
const DonateManage = () => {
   const [value,setValue] = useState(1)
   const location = useLocation();
   const { id } = getQuery();

  return (
    <div>
    
      <div className="flex-center">
        <ButtonTab
      path="/admin-fund"
          index={1}
          value={value}
          text={"Người đóng góp"}
          onClick={(e) => setValue(1)}
        />
        <ButtonTab
          index={2}
          value={value}
          text={"Thêm Người đóng góp"}
          onClick={(e) => setValue(2)}
        />
       
      </div>
      <div>
        <div
          style={{
            marginTop: 30,
          }}
        >
          <TabPenal  value={value} index={1}>
          {!id ?  <ListFundMember /> :<DonateDetail />}
          </TabPenal>
          <TabPenal value={value} index={2}>
            <AddDonateMember />
          </TabPenal>
         
        </div>
      </div>
    </div>
  );
};

export default DonateManage;

import { Card } from "@mui/material";
import React, { useState } from "react";
import "./../list-fund-member/ListFund.scss"
import { useLocation, useNavigate } from "react-router-dom";
import ButtonTab from "../../../../components/common/button/ButtonTab";
import TabPenal from "../../../../components/common/tabs/TabPenal";
import ListFundMember from "../list-fund-member/ListFundMember";
import AddFundForm from "./AddFundAdmin";
const ListFundAdmin = () => {
   const [value,setValue] = useState(1)

  return (
    <div>
    
      <div className="flex-center">
        <ButtonTab
          index={1}
          value={value}
          text={"Danh sách quỹ"}
          onClick={(e) => setValue(1)}
        />
        <ButtonTab
          index={2}
          value={value}
          text={"Thêm quỹ"}
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
           <ListFundMember />
          </TabPenal>
          <TabPenal value={value} index={2}>
            <AddFundForm />
          </TabPenal>
         
        </div>
      </div>
    </div>
  );
};

export default ListFundAdmin;

import { Card } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./ListFund.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { handleError,formatMoney } from "../../../../ultils/helper";
import { fundApi } from "../../../../api/fund.api";
import useAuthStore from "../../../../zustand/authStore";
const ListFundMember = () => {
    const location = useLocation();
    const navigate = useNavigate();
  const [listFund, setListFund] = useState([]);
  const {currentIdGenealogy} = useAuthStore()
  
const getListFund = async() => {
try {
  const res = await fundApi.getlistFund(currentIdGenealogy)
  if(res.data.StatusCode === 200){
    setListFund(res.data.Data.Data||[])
  }
} catch (error) {
  handleError(error)
}

}
useEffect(() => {
  if(currentIdGenealogy){
    getListFund()
  }
  },[currentIdGenealogy])

  return (
    <div>
      <h4 className="bold">Danh sách quỹ</h4>
      {listFund.map((item, index) => {
        return (
          <div className="fund-wrap card-bg">
            <div
              style={{
                paddingRight: 10,
              }}
              className="border-right w100"
            >
              {item.Name}
            </div>
            <div
              style={{
                paddingRight: 10,
              }}
              className="border-right w100"
            >
              {formatMoney(item.EstimatedMoney)} VND
            </div>
            {/* <div className="w100">{item.SpendPurpose}</div> */}
            <div style={{color:"white"}}  onClick={() => navigate(location.pathname + "?id="+item.Id)} className="button-more">Xem thêm</div>
          </div>
        );
      })}
    </div>
  );
};

export default ListFundMember;

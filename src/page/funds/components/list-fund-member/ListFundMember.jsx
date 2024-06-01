import { Card } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./ListFund.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { handleError,formatMoney } from "../../../../ultils/helper";
import { fundApi } from "../../../../api/fund.api";
import useAuthStore from "../../../../zustand/authStore";
import Checkbox from "@mui/material/Checkbox";
import { toast } from "react-toastify";
import EditIcon from "@mui/icons-material/Edit";
import CustomModal from "../../../../components/common/modal/CustomModal";
import AddFundForm from "../list-fund-admin/AddFundAdmin";
import { USER_ROLE } from "../../../../constant/common";

const ListFundMember = () => {
  const {
    isLogin,
    roleCode,
    user,
    logOutAction,
    isCreateGene,
    listRole,
    selectGeneAction,
    listNoti,
    setListNoti
  } = useAuthStore();
  const isSiteAdmin = isLogin && roleCode === USER_ROLE.SiteAdmin;

    const location = useLocation();
    const navigate = useNavigate();
  const [listFund, setListFund] = useState([]);
  const {currentIdGenealogy} = useAuthStore()
  const [currentFund,setCurremtFund] = useState(null);
  const closeFund  = () => {
    setCurremtFund(null)
  }
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

  const handleToggleCheck  = async(value,item) =>{
    try {
      const res = await fundApi.updateFund({...item,isCheck:value});
      if(res.data.StatusCode === 200){
        await getListFund();
        toast.success(value  ? "Đã đóng quỹ" : "Đã  mở lại quỹ")
      }
    } catch (error) {
      handleError(error)
    }
  }
  const listFundCheck = listFund.filter(i => i.IsCheck);
  const lisFundNotCheck = listFund.filter(i => !i.IsCheck);
  const list = [...lisFundNotCheck,...listFundCheck]
  return (
    <div>
      <h4 className="bold">Danh sách quỹ</h4>
      {list.map((item, index) => {
        return (
          <div className="fund-wrap card-bg" style={{
            background:item.IsCheck && "rgb(70 21 17)",
            fontWeight:500,
            fontSize:20
          }}>
            <div>
              <Checkbox checked={item.IsCheck} onChange={(v) => handleToggleCheck(v.target.checked,item)} />
            </div>
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
              className={`w100 ${isSiteAdmin && "border-right"}`}
            >
              {formatMoney(item.EstimatedMoney)} VND
            </div>
           {isSiteAdmin &&  <div
              style={{
                paddingRight: 10,
              }}
              className="w100"
            >
              <EditIcon onClick={() => setCurremtFund(item)} style={{
                cursor:"pointer"
              }} />
            </div>}
            {/* <div className="w100">{item.SpendPurpose}</div> */}
            <div style={{color:"white"}}  onClick={() => navigate(location.pathname + "?id="+item.Id)} className="button-more">Xem thêm</div>
          </div>
        );
      })}
      <CustomModal open={currentFund} onClose={closeFund}>
        <AddFundForm item={currentFund} reset = {() => {
          getListFund()
          closeFund()
        }} />
      </CustomModal>
    </div>
  );
};

export default ListFundMember;

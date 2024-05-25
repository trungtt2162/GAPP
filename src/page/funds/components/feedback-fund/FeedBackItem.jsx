import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Card,
} from "@mui/material";
import { toast } from "react-toastify";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import moment from "moment";
import useAuthStore from "../../../../zustand/authStore";
import { handleError } from "../../../../ultils/helper";
import { feedbackApi } from "../../../../api/feedback.api";
import { blue } from "@mui/material/colors";
import Checkbox from "@mui/material/Checkbox";
import { USER_ROLE } from "../../../../constant/common";
import { fundApi } from "../../../../api/fund.api";

const FeedBackItem = ({
  Name,
  Image,
  CreatedBy,
  ModifiedDate,
  Description,
  Id,
  refreshList,
  setCurr,
  item
}) => {
  const { user, currentIdGenealogy } = useAuthStore();
  console.log(user)
  console.log(CreatedBy)
  const isMine = (user.FirstName +" " +user.LastName)  === CreatedBy;
  const { isLogin, roleCode } = useAuthStore();
  const isSiteAdmin = isLogin && roleCode === USER_ROLE.SiteAdmin;
  const [check,setCheck] = useState(item.IsCheck)
  const onDelete = async () => {
    try {
      const res = await feedbackApi.deleteFeedBack(Id, currentIdGenealogy);
      if (res.data.StatusCode === 200) {
        await refreshList();
        toast.success("Đã xóa");
      }
    } catch (error) {
      handleError(error);
    }
  };

  // Check
  const handleCheck = async (v) => {
    try {
       const res  = await feedbackApi.updateFeedBack({...item,IsCheck:v});
       if(res.data.StatusCode === 200){
        toast.success(v === true ? "Đã ghi nhận" :"Đã hủy ghi nhận");
        refreshList()
       }
    } catch (error) {
      handleError(error)
    }
  }
  return (
    <div
      style={{
        width: "100%",
        minHeight: 150,
        padding: 10,

        color: "red",
        position: "relative",
        background:item.IsCheck && "rgb(70 21 17)"
      }}
      className="card-bg"
    >
      {/* <div
        style={{
          fontWeight: "bold",
          fontSize: 18,
          textAlign: "start",
          marginTop: isMine && 10,
        }}
      >
        {CreatedBy}
      </div> */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          className="title"
          style={{
            fontWeight: "bold",
            textAlign: "start",
            color: "white",
            fontSize: 24,
          }}
        >
          {Name}
        </div>
        <div
          style={{
            fontWeight: "",
            textAlign: "start",
            fontSize: 12,
            color:"white"
           
          }}
        >
          {ModifiedDate && moment(ModifiedDate).format("DD/MMYYYY")}
        </div>
      </div>
      <p style={{ color: "white", textAlign: "start",marginBottom:20 }}>
        <span className="bold"> {CreatedBy} góp ý</span> : {Description}
      </p>

      {/* <div style={{ textAlign: "start",color:"white" }}>{Description}</div> */}
      {Image && (
        <div style={{ fontWeight: "bold", textAlign: "start" }}>
          <img
            src={Image}
            style={{
              width: 60,
              height: 60,
              borderRadius: 5,
            }}
          />
        </div>
      )}
      {isMine && (
        <div
          style={{
            position: "absolute",
            top: 5,
            right: 5,
          }}
        >
          <EditIcon
            onClick={() => setCurr()}
            style={{
              color: "blue",
              cursor: "pointer",
              fontSize: 20,
            }}
          />
          <DeleteIcon
            onClick={() => onDelete()}
            style={{
              color: "red",
              cursor: "pointer",
              fontSize: 20,
            }}
          />
        </div>
      )}
     {
      item.IsCheck &&  <div
      style={{
        position: "absolute",
        right: 10,
        bottom: 5,
        fontStyle:"italic"
      }}
    >
      Đã ghi nhận
    </div>
     }
      <div div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
        }}>
        {isSiteAdmin && <Checkbox checked={item.IsCheck} onChange={e => handleCheck(e.target.checked)} />}
      </div>
    </div>
  );
};

export default FeedBackItem;

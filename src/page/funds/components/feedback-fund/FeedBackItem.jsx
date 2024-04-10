import React from "react";
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

const FeedBackItem = ({
  Name,
  Title: Image,
  CreatedBy,
  ModifiedDate,
  Description,
  Id,refreshList,
  setCurr
}) => {
  const { user ,currentIdGenealogy,} = useAuthStore();
  const isMine = user.Email === CreatedBy;
  const onDelete = async () => {
    try {
      const res = await feedbackApi.deleteFeedBack(Id, currentIdGenealogy);
      if (res.data.StatusCode === 200) {
        await refreshList()
        toast.success("Đã xóa");
      }
    } catch (error) {
      handleError(error);
    }
  };
  return (
    <div
      style={{
        width: "100%",
        minHeight: 150,
        padding: 10,
       
        color: "#fff",
        position: "relative",
      }}
      className="card-bg"
    >
      <div
        style={{
          fontWeight: "bold",
          fontSize: 18,
          textAlign: "start",
          marginTop: isMine && 10,
        }}
      >
        {CreatedBy}
      </div>
      <div style={{ fontWeight: "", textAlign: "start", fontSize: 12 }}>
        {ModifiedDate && moment(ModifiedDate).format("DD-MM-YYYY")}
      </div>
      <div style={{ fontWeight: "bold", textAlign: "start" }}>{Name}</div>

      <div style={{ textAlign: "start" }}>{Description}</div>
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
    </div>
  );
};

export default FeedBackItem;

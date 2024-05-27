import React, { useEffect, useState } from "react";
import { Box, Card, Grid, Avatar, TextField, Button } from "@mui/material";
import { useTheme } from "@emotion/react";
import { theme } from "../../theme";
import Navbar from "../../components/layout/Navbar";
import "./History.scss";
import { historyApi } from "../../api/history.api";
import { toast } from "react-toastify";
import {
  checkEmptyData,
  dateFormat,
  dateFormat3,
  handleError,
} from "../../ultils/helper";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import useAuthStore from "../../zustand/authStore";
import CustomModal from "../../components/common/modal/CustomModal";
import { USER_ROLE } from "../../constant/common";
import EditIcon from "@mui/icons-material/Edit";
import PrimaryButton from "../../components/common/button/PrimaryButton";
import { Description } from "@mui/icons-material";
import AddHistory from "../family-tree/admin-family-tree/components/manage-history/AddHostory";
const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
  clipboard: {
    matchVisual: false,
  },
};
const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];
const HistoryFamily = ({ list, desHis }) => {
  const { palette } = useTheme(theme);
  const [des, setDes] = useState("");
  const [txtEdit, setTxtEdit] = useState("");
  const { currentIdGenealogy } = useAuthStore();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const { isLogin, roleCode } = useAuthStore();
  const isSiteAdmin = isLogin && roleCode === USER_ROLE.SiteAdmin;
  const [isEdit, setIsEdit] = useState(false);
  const [data,setData] = useState({})
  const modifyInitialValue = (value) => {
    const modifiedValue = value?.replace(
      /<img/g,
      '<img style="width: 100%; height: auto;"'
    );
    return modifiedValue;
  };
  const [curent, setCurrent] = useState(null);
  const [listHistory, setListHistory] = useState([]);
  const lisFinal = list || listHistory;
  const desFinal = desHis || des;
  const getListHistory = async (id) => {
    let query = "";
    if (startDate) {
      query += ` and Date>='${startDate}' `;
    }
    if (endDate) {
      query += ` and Date<='${endDate}' `;
    }
    try {
      const res = await historyApi.getListAllHistoryByGenealogyId(id, query);
      if (res.data.StatusCode === 200) {
        setListHistory(res.data.Data.Data);
      }
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    if (!list) {
      getListHistory(currentIdGenealogy);
    }
  }, [currentIdGenealogy, list]);
  const getDes = async (id) => {
    try {
      const res = await historyApi.getDescriptionHistorufamily(id);
      if (res.data.StatusCode === 200) {
        setDes(res.data?.Data?.Description);
        setTxtEdit(res.data?.Data?.Description);
        setData(res.data?.Data)
      }
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    if (currentIdGenealogy) {
      getDes(currentIdGenealogy);
    }
  }, [currentIdGenealogy]);

  // Change Des
  const onChangeDes = async () => {
    const dataPost = {
     ...data,
     Description:txtEdit
    };
    try {
      const res = await historyApi.updateDescriptionHistorufamily({
        ...dataPost,
        IDGenealogy: currentIdGenealogy,
      });
      if (res.data.StatusCode === 200) {
        setIsEdit(false)
        setDes(txtEdit)
        toast.success("Lưu thành công");
        
      }
    } catch (error) {
      handleError(error);
    }
  };

  const [openModal,setOpenModal] = useState(false)


  return (
    <div>
      <div className="how-work">
        <Box
          sx={{
            display: "flex",

            flexDirection: { xs: "column", md: "column" },
            p: "40px 200px",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <div className="">
                <p className="title">
                  Giới thiệu lịch sử{" "}
                  {isSiteAdmin && (
                    <EditIcon
                      onClick={() => setIsEdit(true)}
                      style={{
                        cursor: "pointer",
                        marginLeft: 5,
                        fontSize: 20,
                      }}
                    />
                  )}
                </p>
                {!isEdit ? (
                  <p style={{ textAlign: "start" }}>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: modifyInitialValue(desFinal),
                      }}
                    />
                  </p>
                ) : (
                  <div>
                    <ReactQuill
                      theme="snow"
                      onChange={(v) => setTxtEdit(v)}
                      value={txtEdit}
                      modules={modules}
                      formats={formats}
                      bounds={".app"}
                      style={{
                        height: 300,
                      }}
                    />
                    <div
                      style={{
                        marginTop: 50,
                        display: "flex",
                        justifyContent: "flex-end",
                      }}
                    >
                      <PrimaryButton
                        event={() => onChangeDes()}
                        title={"Lưu"}
                      />
                      <Button
                        onClick={() => {
                          setIsEdit(false);
                          setTxtEdit(des);
                        }}
                      >
                        Hủy
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </Grid>
            <Grid item xs={12}>
              <div className="">
                <p className="title">Các mốc sự kiện lịch sử</p>
                <Grid
                  style={{ marginTop: 20 }}
                  container
                  spacing={2}
                  alignItems="center"
                >
                  <Grid item>
                    <TextField
                      sx={{ "& input": { height: "12px" } }}
                      type="date"
                      label="Từ ngày"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      sx={{ "& input": { height: "12px" } }}
                      type="date"
                      label="Đến ngày"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <Button
                      onClick={() => getListHistory(currentIdGenealogy)}
                      variant="contained"
                      color="primary"
                    >
                      Lọc
                    </Button>
                  </Grid>
                  <Grid style={{display:"flex",alignItems:"center",justifyContent:"flex-end",gap:10}} item flex={1}>
                  {isSiteAdmin &&   <Button onClick={() => setOpenModal(true)} variant={"outlined"}>+ Tạo mốc lịch sử mới</Button>}
                    <div style={{ textAlign: "end" }}>
                      Có {lisFinal.length} sự kiện
                    </div>
                  </Grid>
                </Grid>
              </div>
            </Grid>
            <Grid item xs={12}></Grid>
          </Grid>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            {lisFinal.map((item, index) => (
              <div
                key={index}
                style={{ width: "calc(50% - 10px)", marginBottom: "10px" }}
              >
                <div
                  style={{
                    cursor: "pointer",
                    width: "100%",
                    height: "90%",
                    background: "rgb(242, 184, 79)",
                  }}
                  onClick={() => setCurrent(item)}
                  className="item-history-wrap card-bg"
                >
                  <div className="item-history">
                    <div
                      className="flex-center"
                      style={{
                        width: "100%",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        justifyContent: "center",
                      }}
                    >
                      <div className="title">{item.Title}</div>
                      <div style={{ textAlign: "start" }}>
                        Thời gian : {dateFormat(item.Date)}
                      </div>
                    </div>
                    {item.Image && (
                      <Avatar
                        style={{
                          width: 70,
                          height: 70,
                        }}
                        src={item.Image}
                      />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {checkEmptyData(lisFinal)}
        </Box>
      </div>

      <CustomModal
        minHeight={600}
        open={curent}
        onClose={() => setCurrent(null)}
      >
        <div
          style={{
            textAlign: "center",
            fontSize: 24,
            fontWeight: "bold",
            overflow: "auto",
          }}
        >
          {curent?.Title}
        </div>
        <div>
          <span className="bold">Thời gian diễn ra : </span>
          <span>{dateFormat(curent?.Date)}</span>
        </div>
        <div>
          <span className="bold">Nội dung: </span>
          <span
            style={{
              textAlign: "start",
            }}
          >
            {curent?.Description}
          </span>{" "}
        </div>
        <Grid
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
          }}
          item
          xs={24}
        >
          {curent?.Image && (
            <img
              src={curent?.Image}
              style={{
                width: 400,
                height: 400,
                objectFit: "contain",
              }}
            />
          )}
        </Grid>
      </CustomModal>
      <CustomModal width={1000} open={openModal} onClose={() => setOpenModal(false)}>
          <AddHistory  reset={() => {
        setOpenModal(false);
        getListHistory(currentIdGenealogy)
      }} />
      </CustomModal>
    </div>
  );
};

export default HistoryFamily;

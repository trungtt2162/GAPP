import React, { useEffect, useState } from "react";
import { Box, Button, Card, Grid, Avatar, TextField } from "@mui/material";
import { useTheme } from "@emotion/react";
import { theme } from "../../theme";
import Navbar from "../../components/layout/Navbar";
import "./History.scss";
import { historyApi } from "../../api/history.api";
import { dateFormat, handleError } from "../../ultils/helper";

import useAuthStore from "../../zustand/authStore";
import CustomModal from "../../components/common/modal/CustomModal";
const HistoryFamily = () => {
  const { palette } = useTheme(theme);
  const [des, setDes] = useState("");
  const { currentIdGenealogy } = useAuthStore();
  const [startDate,setStartDate] = useState("");
  const [endDate,setEndDate]  = useState("")
  const modifyInitialValue = (value) => {
    const modifiedValue = value?.replace(
      /<img/g,
      '<img style="width: 100%; height: auto;"'
    );
    return modifiedValue;
  };
  const [curent, setCurrent] = useState(null);
  const [listHistory, setListHistory] = useState([]);
  const getListHistory = async (id) => {
    let query = "";
    if(startDate ){
      query += ` and Date>='${startDate}' `
    }
    if(endDate){
      query += ` and Date<='${endDate}' `
    }
    try {
      const res = await historyApi.getListAllHistoryByGenealogyId(id,query);
      if (res.data.StatusCode === 200) {
        setListHistory(res.data.Data.Data);
      }
    } catch (error) {
      handleError(error);
    }
  };
  useEffect(() => {
    getListHistory(currentIdGenealogy);
  }, [currentIdGenealogy]);
  const getDes = async (id) => {
    try {
      const res = await historyApi.getDescriptionHistorufamily(id);
      if (res.data.StatusCode === 200) {
        setDes(res.data?.Data?.Description);
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
  return (
    <div>
      <Navbar />
      <Box
        width="100%"
        max-width="10w"
        sx={{
          p: "2.5rem",
        }}
      ></Box>
      <div className="how-work">
        <Box
          sx={{
            display: "flex",
            alignItems: { md: "flex-end", xs: "center" },
            flexDirection: { xs: "column", md: "row" },
            justifyContent: { md: "space-between", xs: "center" },
            p: "40px",
            background: "#f0f0f0",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <div className="content-card card-item">
                <h4 className="bold">Giới thiệu lịch sử</h4>
                <p style={{ textAlign: "start" }}>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: modifyInitialValue(des),
                    }}
                  />
                </p>
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className="content-card card-item">
                <h4 className="bold">Các mốc sự kiện lịch sử</h4>
                <Grid style={{marginTop:20}} container spacing={2} alignItems="center">
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
                    <Button onClick={() => getListHistory(currentIdGenealogy)} variant="contained" color="primary">
                      Lọc
                    </Button>
                  </Grid>
                  <Grid item flex={1}>
                    <div style={{textAlign:"end"}}>Có {listHistory.length} sự kiện</div>
                  </Grid>
                </Grid>
                {listHistory.map((item, index) => (
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => setCurrent(item)}
                    className="item-history-wrap card-bg"
                  >
                    <div className="item-history">
                      <div style={{ width: "100%" }}>
                        <div
                          className="display-3-line "
                          style={{
                            width: "calc(100% - 80px)",
                            textAlign: "start",
                            fontSize: 20,
                            fontWeight: "bold",
                          }}
                        >
                          {item.Title}
                        </div>
                        <div
                          className="display-3-line "
                          style={{
                            textAlign: "start",
                          }}
                        >
                          {dateFormat(item.Date)}
                        </div>
                      </div>
                      <Avatar
                        src={item.Image}
                        sx={{ width: 100, height: 100 }}
                      ></Avatar>
                    </div>
                  </div>
                ))}
              </div>
            </Grid>
          </Grid>
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
              overflow:"auto"
            }}
          >
            {curent?.Title}
          </div>
          <div>
            <span className="bold">Ngày diễn ra : </span>
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
        <Grid item xs={24}>
          <img
            src={curent?.Image}
            style={{
              width: "60%",
              height: "auto",
            }}
          />
        </Grid>
      </CustomModal>
    </div>
  );
};

export default HistoryFamily;

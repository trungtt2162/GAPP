import React, { useEffect, useState } from "react";
import { Box, Button, Card, Grid, Avatar, TextField } from "@mui/material";
import { useTheme } from "@emotion/react";
import { theme } from "../../theme";
import Navbar from "../../components/layout/Navbar";
import "./History.scss";
import { historyApi } from "../../api/history.api";
import { checkEmptyData, dateFormat, dateFormat3, handleError } from "../../ultils/helper";

import useAuthStore from "../../zustand/authStore";
import CustomModal from "../../components/common/modal/CustomModal";
const HistoryFamily = ({ list, desHis }) => {
  const { palette } = useTheme(theme);
  const [des, setDes] = useState("");
  const { currentIdGenealogy } = useAuthStore();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
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
                <p className="title">Giới thiệu lịch sử</p>
                <p style={{ textAlign: "start" }}>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: modifyInitialValue(desFinal),
                    }}
                  />
                </p>
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
                  <Grid item flex={1}>
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
                        Thời gian : {dateFormat3(item.Date)}
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
              width: 300,
              height: 300,
              objectFit:"contain"
            }}
          />
        </Grid>
      </CustomModal>
    </div>
  );
};

export default HistoryFamily;

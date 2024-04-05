import React, { useEffect, useState } from "react";
import { Box, Button, Card, Grid } from "@mui/material";
import { useTheme } from "@emotion/react";
import { theme } from "../../theme";
import Navbar from "../../components/layout/Navbar";
import "./History.scss";
import { historyApi } from "../../api/history.api";
import { handleError } from "../../ultils/helper";
import useAuthStore from "../../zustand/authStore";
import CustomModal from "../../components/common/modal/CustomModal";
const HistoryFamily = () => {
  const { palette } = useTheme(theme);
  const [des, setDes] = useState("");
  const { currentIdGenealogy } = useAuthStore();
  const modifyInitialValue = (value) => {
    const modifiedValue = value.replace(
      /<img/g,
      '<img style="width: 100%; height: auto;"'
    );
    return modifiedValue;
  };
  const [curent, setCurrent] = useState(null);
  const [listHistory, setListHistory] = useState([]);
  const getListHistory = async (id) => {
    try {
      const res = await historyApi.getListAllHistoryByGenealogyId(id);
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
        setDes(res.data.Data.Description);
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
                {listHistory.map((item, index) => (
                  <Card className="item-history-wrap">
                    <div className="item-history">
                      <p
                        className="display-3-line "
                        style={{
                          width: "calc(100% - 80px)",
                          textAlign: "start",
                        }}
                      >
                        {item.Description}
                      </p>
                      <img src={item.Image} />
                    </div>
                    <div style={{ textAlign: "start" }}>
                      <Button onClick={() => setCurrent(item)} variant="contained" style={{}}>
                        Xem chi tiết
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </Grid>
          </Grid>
        </Box>
      </div>
      <CustomModal minHeight={600} open={curent} onClose={() => setCurrent(null)}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <img
              src={curent?.Image}
              style={{
                width: "100%",
                height: "auto",
              }}
            />
          </Grid>
          <Grid item xs={8}>
            <p
              style={{
                textAlign: "start",
              }}
            >
              {curent?.Description}
            </p>
          </Grid>
        </Grid>
      </CustomModal>
    </div>
  );
};

export default HistoryFamily;

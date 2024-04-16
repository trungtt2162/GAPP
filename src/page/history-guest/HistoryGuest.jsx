import React, { useEffect, useState } from "react";
import { Box, Card,TextField,Button } from "@mui/material";
import { useTheme } from "@emotion/react";
import "./../history-family/History.scss";
import { eventApi } from "../../api/event.api";
import { theme } from "../../theme";
import { dateFormat, handleError } from "../../ultils/helper";
import Navbar from "../../components/layout/Navbar";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  Avatar,
} from "@mui/material";
import { genealogyApi } from "../../api/genealogy.api";
import { historyApi } from "../../api/history.api";
import CustomModal from "../../components/common/modal/CustomModal";
import HistoryFamily from "../history-family/HistoryFamily";
const HistoryGuest = () => {
  const [curent, setCurrent] = useState(null);
  const [startDate,setStartDate] = useState("");
  const [endDate,setEndDate]  = useState("")
  const [id, setId] = useState("");
  const [des, setDes] = useState("");
  const [listEvent, setListEvent] = useState([]);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [listGene, setListGene] = useState([]);
  const [listHistory, setListHistory] = useState([]);
  const modifyInitialValue = (value) => {
    const modifiedValue = value?.replace(
      /<img/g,
      '<img style="width: 100%; height: auto;"'
    );
    return modifiedValue;
  };

  const getListEvent = async () => {
    try {
      const res = await eventApi.getListEventGuest(id);
      if (res.data.StatusCode === 200) {
        setListEvent(res.data.Data.Data);
        if (res.data?.Data?.Data?.length > 0) {
          setCurrentEvent(res.data.Data.Data[0]);
        }
      }
    } catch (error) {
      handleError(error);
    }
  };

  const getListPublicgene = async () => {
    try {
      const res = await genealogyApi.getListGegePublic();
      if (res.data.StatusCode === 200) {
        setListGene(res.data.Data.Data || []);
      }
    } catch (error) {
      handleError(error);
    }
  };
  useEffect(() => {
    getListPublicgene();
  }, [id]);

  // get dest
  const getDes = async () => {
    try {
      const res = await historyApi.getDescriptionHistoryGuest(id);
      if (res.data.StatusCode === 200) {
        setDes(res.data.Data?.Description);
      }
    } catch (error) {
      handleError(error);
    }
  };
  const getListHistory = async () => {
    let query = "";
    if(startDate ){
      query += ` and Date>='${startDate}' `
    }
    if(endDate){
      query += ` and Date<='${endDate}' `
    }
    try {
      const res = await historyApi.getListHistoryGuest(id,query);
      if (res.data.StatusCode === 200) {
        setListHistory(res.data.Data.Data || []);
      }
    } catch (error) {
      handleError(error);
    }
  };
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
            // display: "flex",
            // alignItems: { md: "flex-end", xs: "center" },
            // flexDirection: { xs: "column", md: "row" },
            // justifyContent: { md: "space-between", xs: "center" },
            p: "40px",
            background: "#f0f0f0",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <div
                style={{
                  height: "auto",
                  minHeight: 150,
                  marginTop: 30,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                className="content-card card-item "
              >
                <FormControl>
                  <InputLabel id="select-label">Gia phả</InputLabel>
                  <Select
                    style={{
                      width: 500,
                      marginRight: 20,
                    }}
                    labelId="select-label"
                    id="select"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    label="Gia phả"
                  >
                    {listGene.map((i) => (
                      <MenuItem value={i.Id}>{i.Name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Button

                  variant="contained"
                  onClick={async () => {
                    if (id) {
                      await getDes();
                      await getListHistory();
                    }
                  }}
                >
                  Tìm kiếm
                </Button>
              </div>
            </Grid>
            {/* <Grid item xs={6}>
              <div className="content-card card-item">
                <Grid item xs={6}>
                  <div className="content-card card-item">
                    <h4
                      style={{
                        textAlign: "center",
                      }}
                      className="bold"
                    >
                      Giới thiệu lịch sử
                    </h4>
                    <p style={{ textAlign: "start" }}>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: modifyInitialValue(des),
                        }}
                      />
                    </p>
                  </div>
                </Grid>
              </div>
            </Grid> */}
            {/* <Grid item xs={6}>
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
                    <Button  disabled={!id} onClick={() => getListHistory()} variant="contained" color="primary">
                      Lọc
                    </Button>
                  </Grid>
                  <Grid item flex={1}>
                    <div style={{textAlign:"end"}}>Có {listHistory.length} sự kiện</div>
                  </Grid>
                </Grid>
                {listHistory?.map((item, index) => (
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
            </Grid> */}
          </Grid>
          
        <div style={{
          background:"white",
          paddingTop:-50
        }}> 
        <HistoryFamily list={listHistory} desHis={des} />
        </div>
        </Box>
      
      </div>
      <CustomModal
        minHeight={600}
        open={curent}
        onClose={() => setCurrent(null)}
      >
        <Grid container spacing={2}></Grid>
        <Grid item xs={24}>
          <div
            style={{
              textAlign: "center",
              fontSize: 24,
              fontWeight: "bold",
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
        </Grid>
        <Grid item xs={24}>
          <img
            src={curent?.Image}
            style={{
              width: "100%",
              height: "auto",
            }}
          />
        </Grid>
      </CustomModal>
    </div>
  );
};

export default HistoryGuest;

import React, { useEffect, useState } from "react";
import { Box, Card, Grid,TextField,Button } from "@mui/material";
import { useTheme } from "@emotion/react";
import { theme } from "../../theme";
import Navbar from "../../components/layout/Navbar";
import "./../history-family/History.scss";
import { dateFormat, handleError } from "../../ultils/helper";
import useAuthStore from "../../zustand/authStore";
import { eventApi } from "../../api/event.api";
const EventMember = () => {
  const { palette } = useTheme(theme);
  const { currentIdGenealogy } = useAuthStore();
  const [startDate,setStartDate] = useState("");
  const [endDate,setEndDate]  = useState("")
  const [listEvent, setListEvent] = useState([]);
  const [currentEvent, setCurrentEvent] = useState(null);
  const getListEvent = async (id) => {
    try {
      let query = "";
      if(startDate ){
        query += ` and OrganizationDate>='${startDate}' `
      }
      if(endDate){
        query += ` and OrganizationDate<='${endDate}' `
      }
      const res = await eventApi.getListEventAdmin(id,query);
      if (res.data.StatusCode === 200) {
        setListEvent(res.data.Data.Data);
        if (res.data.Data.Data.length > 0) {
          setCurrentEvent(res.data.Data.Data[0]);
        }
      }
    } catch (error) {
      handleError(error);
    }
  };
  useEffect(() => {
    if (currentIdGenealogy) {
      getListEvent(currentIdGenealogy);
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
                {currentEvent && (
                  <>
                    {" "}
                    <h4 className="bold">{currentEvent?.Name}</h4>
                    <div
                      style={{
                        textAlign: "start",
                        marginTop: 10,
                      }}
                    >
                      <span className="bold">Chế độ : </span>
                      <span>{currentEvent?.Type =="0" ? "Online" :"Offline"}</span>
                    </div>
                {currentEvent?.Type =="0" &&     <div
                      style={{
                        textAlign: "start",
                        marginTop: 10,
                      }}
                    >
                      <span className="bold">Link sự kiện : </span>
                      <a
                        style={{
                          color: "blue",
                        }}
                        href={currentEvent?.LinkStream}
                      >
                        {currentEvent?.LinkStream}
                      </a>
                    </div>}
                    <div
                      style={{
                        textAlign: "start",
                        marginTop: 10,
                      }}
                    >
                      <span className="bold">Ngày diễn ra : </span>
                      <span>{currentEvent?.OrganizationDate}</span>
                    </div>
                    <div
                      style={{
                        textAlign: "start",
                        marginTop: 10,
                      }}
                    >
                      <span className="bold">Địa điểm tổ chức: </span>
                      <span>{currentEvent?.Location}</span>
                    </div>
                    <div
                      style={{
                        textAlign: "start",
                        marginTop: 10,
                      }}
                    >
                      <span className="bold">Nội dung : </span>
                      <span>{currentEvent?.Description}</span>
                    </div>
                    <div
                      style={{
                        textAlign: "start",
                        marginTop: 10,
                      }}
                    >
                      <img src={currentEvent?.Background} />
                    </div>
                  </>
                )}
              </div>
            </Grid>
            <Grid item xs={6}>
              <div
                style={{ paddingTop: 30 }}
                className="content-card card-item"
              >
                <h4 className="bold">Danh sách các sự kiện cũ và sắp tới</h4>
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
                    <Button onClick={() => getListEvent(currentIdGenealogy)} variant="contained" color="primary">
                      Lọc
                    </Button>
                  </Grid>
                  <Grid item flex={1}>
                    <div style={{textAlign:"end"}}>Có {listEvent.length} sự kiện</div>
                  </Grid>
                </Grid>
                {listEvent.map((item, index) => (
                  <div 
                  className="card-bg"
                    onClick={() => {
                      setCurrentEvent(item);
                    }}
                    style={{
                      marginTop: 10,
                      cursor: "pointer",

                      border:
                        item.Id === currentEvent.Id ? "1px solid white" : "",
                      minHeight: 100,
                      padding: 10,
                    }}
                  >
                    <div
                      style={{
                        border: "none !important",
                      }}
                      className="item-history"
                    >
                      <div style={{textAlign:"start"}}>
                      <div style={{
                        fontSize:20,
                        fontWeight:"bold"
                      }}>{item.Name}</div>
                      <div>{dateFormat(item.OrganizationDate)}</div>
                      </div>
                      <img
                        style={{
                          width: 70,
                          height: 70,
                          objectFit: "cover",
                        }}
                        src={item.Background}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
};

export default EventMember;

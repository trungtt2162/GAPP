import React, { useEffect, useState } from "react";
import { Box, Card, Grid, TextField, Button, Avatar } from "@mui/material";
import { useTheme } from "@emotion/react";
import { theme } from "../../theme";
import Navbar from "../../components/layout/Navbar";
import "./../history-family/History.scss";
import {
  checkEmptyData,
  dateFormat,
  dateFormat3,
  handleError,
  sortArrByDate,
  splitText,
} from "../../ultils/helper";
import useAuthStore from "../../zustand/authStore";
import { eventApi } from "../../api/event.api";
import CustomModal from "../../components/common/modal/CustomModal";
const EventMember = () => {
  const { palette } = useTheme(theme);
  const { currentIdGenealogy } = useAuthStore();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [listEvent, setListEvent] = useState([]);
  const [currentEvent, setCurrentEvent] = useState(null);
  const getListEvent = async (id) => {
    try {
      let query = "";
      if (startDate) {
        query += ` and OrganizationDate>='${startDate}' `;
      }
      if (endDate) {
        query += ` and OrganizationDate<='${endDate}' `;
      }
      const res = await eventApi.getListEventAdmin(id, query);
      if (res.data.StatusCode === 200) {
        setListEvent(res.data.Data.Data);
        if (res.data.Data.Data.length > 0) {
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
      <div className="how-work">
        <Box
          sx={{
            display: "flex",

            flexDirection: { xs: "column", md: "column" },
            p: "20px 200px",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <div style={{ paddingTop: 30 }}>
                <p className="title">Danh sách các sự kiện</p>
                <Grid
                  style={{ marginTop: 10 }}
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
                      onClick={() => getListEvent(currentIdGenealogy)}
                      variant="contained"
                      color="primary"
                    >
                      Lọc
                    </Button>
                  </Grid>
                  <Grid item flex={1}>
                    <div style={{ textAlign: "end" }}>
                      Có {listEvent.length} sự kiện
                    </div>
                  </Grid>
                </Grid>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                  }}
                >
                  {sortArrByDate(listEvent, "OrganizationDate").map(
                    (item, index) => {
                      const now = new Date();
                      const past = now > new Date(item.OrganizationDate);
                      return (
                        <div
                          className="card-bg"
                          onClick={() => {
                            setCurrentEvent(item);
                          }}
                          style={{
                            marginTop: 10,
                            cursor: "pointer",
                            padding: 10,
                            width: "calc(50% - 10px)",
                            marginBottom: "20px",
                            height: "90%",
                            background: past && "rgb(70 21 17)",
                          }}
                        >
                          <div
                            style={{
                              border: "none !important",
                            }}
                            className="item-history"
                          >
                            <div className="" style={{ textAlign: "start" }}>
                              <div
                                style={{
                                  fontSize: 20,
                                  fontWeight: "bold",
                                }}
                              >
                                {item.Name}
                              </div>
                              <div>
                                Thời gian : {dateFormat3(item.OrganizationDate)}
                              </div>
                            </div>
                            {item.Background && <Avatar style={{
                              width:60,height:60
                            }} src={item.Background} />}
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            </Grid>
          </Grid>
          {checkEmptyData(listEvent)}
        </Box>
      </div>
      <CustomModal open={currentEvent} onClose={() => setCurrentEvent(null)}>
        <Grid item xs={6}>
          <div
            style={{
              overflow: "hidden",
            }}
            className="content-card card-item"
          >
            {currentEvent && (
              <>
                {" "}
                <h4 className="bold " style={{
                  textAlign:'center'
                }}>{currentEvent?.Name}</h4>
                <div
                  style={{
                    textAlign: "start",
                    marginTop: 10,
                  }}
                >
                  <div
                    style={{
                      textAlign: "start",
                      marginTop: 10,
                    }}
                  >
                    <span className="bold">Người tổ chức : </span>
                    <span>{currentEvent?.CreatedBy}</span>
                  </div>
                  <span className="bold">Chế độ : </span>
                  <span>
                    {currentEvent?.Type == "0" ? "Online" : "Offline"}
                  </span>
                </div>
                {currentEvent?.Type == "0" && (
                  <div
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
                  </div>
                )}
                <div
                  style={{
                    textAlign: "start",
                    marginTop: 10,
                  }}
                >
                  <span className="bold">Ngày diễn ra : </span>
                  <span>{dateFormat3(currentEvent?.OrganizationDate)}</span>
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
                  <span>{splitText(currentEvent?.Description)}</span>
                </div>
                <div
                 style={{
                  display:'flex',
                  justifyContent:'center',
                  alignItems:"center"
                 }}
                >
                { currentEvent?.Background &&  <img  style={{
                    textAlign: "start",
                    marginTop: 10,
                    width: 400,
                    height: 400,
                    objectFit: "contain",
                  }} src={currentEvent?.Background} />}
                </div>
              </>
            )}
          </div>
        </Grid>
      </CustomModal>
    </div>
  );
};

export default EventMember;

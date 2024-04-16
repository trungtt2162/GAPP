import React, { useEffect, useState } from "react";
import { Box, Card } from "@mui/material";
import { useTheme } from "@emotion/react";
import "./../history-family/History.scss";
import { eventApi } from "../../api/event.api";
import { theme } from "../../theme";
import { handleError } from "../../ultils/helper";
import Navbar from "../../components/layout/Navbar";

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
  Grid,
  TextField,
  
} from "@mui/material";
import { genealogyApi } from "../../api/genealogy.api";
const EventGuest = () => {
  const [listEvent, setListEvent] = useState([]);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [listGene, setListGene] = useState([]);
  const [startDate,setStartDate] = useState("");
  const [endDate,setEndDate]  = useState("")
  const [id, setId] = useState("");
  const getListEvent = async () => {
    let query = "";
      if(startDate ){
        query += ` and OrganizationDate>='${startDate}' `
      }
      if(endDate){
        query += ` and OrganizationDate<='${endDate}' `
      }
    try {
      const res = await eventApi.getListEventGuest(id,query);
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
                    onChange={e => setId(e.target.value)}
                    label="Gia phả"
                  >
                    {listGene.map((i) => (
                      <MenuItem value={i.Id}>{i.Name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Button variant="contained" onClick={() =>{
                    if(id){
                        getListEvent()
                    }
                }}>
                  Tìm kiếm
                </Button>
              </div>
            </Grid>
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
                    <Button disabled={!id} onClick={() => getListEvent(id)} variant="contained" color="primary">
                      Lọc
                    </Button>
                  </Grid>
                  <Grid item flex={1}>
                    <div style={{textAlign:"end"}}>Có {listEvent.length} sự kiện</div>
                  </Grid>
                </Grid>
                {listEvent?.length > 0 ? (
                  listEvent?.map((item, index) => (
                    <div
                      onClick={() => {
                        setCurrentEvent(item);
                      }}
                      style={{
                        marginTop: 10,
                        cursor: "pointer",

                        border:
                          item.Id === currentEvent.Id ? "1px solid gray" : "",
                        minHeight: 100,
                        padding: 10,
                      }}
                      className="card-bg"
                    >
                      <div
                        style={{
                          border: "none !important",
                        }}
                        className="item-history"
                      >
                        <p>{item.Name}</p>
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
                  ))
                ) : (
                  <p style={{ marginTop: 30 }}>Không có dữ liệu</p>
                )}
              </div>
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
};

export default EventGuest;

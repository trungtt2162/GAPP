import React, { useEffect, useState } from "react";
import { Box, Button, Card, Grid, TextField, Avatar } from "@mui/material";
import { useTheme } from "@emotion/react";
import { theme } from "../../theme";
import Navbar from "../../components/layout/Navbar";
import "./../history-family/History.scss";
import PrimaryButton from "../../components/common/button/PrimaryButton";
import { useNavigate } from "react-router-dom";
import ButtonTab from "../../components/common/button/ButtonTab";
import ListMember from "../family-tree/admin-family-tree/components/manage-member/ListMember";
import { historyApi } from "../../api/history.api";
import { checkEmptyData, dateFormat, dateFormat3, handleError } from "../../ultils/helper";
import useAuthStore from "../../zustand/authStore";
import { genealogyApi } from "../../api/genealogy.api";
import ListEvent from "../family-tree/admin-family-tree/components/manage-event/ListEvent";
import { eventApi } from "../../api/event.api";
const MODE_SEARCH = {
  MEMBER: 0,
  EVENT: 1,
};
const HomeMemberLogin = () => {
  const { palette } = useTheme(theme);
  const navigate = useNavigate();
  const [value, setValue] = useState(1);
  const [txtSearch, setTxtSearch] = useState("");
  const { currentIdGenealogy } = useAuthStore();
  const [listHistory, setListHistory] = useState([]);
  const [modeSearch, setModeSearch] = useState(MODE_SEARCH.MEMBER);
  const [listSearch, setListSearch] = useState([]);
  const [listSearchEvent, setListSearchEvent] = useState([]);
  const getListHistory = async (id) => {
    try {
      const res = await historyApi.getListAllHistoryByGenealogyId(id);
      if (res.data.StatusCode === 200) {
        setListHistory(res.data.Data.Data || []);
      }
    } catch (error) {
      handleError(error);
    }
  };
  useEffect(() => {
    getListHistory(currentIdGenealogy);
  }, [currentIdGenealogy]);

  const onSearch = async () => {
    try {
      const res =
        modeSearch === MODE_SEARCH.MEMBER
          ? await genealogyApi.getListUserByEmailAndName(
              currentIdGenealogy,
              txtSearch
            )
          : await eventApi.getListEventByName(currentIdGenealogy, txtSearch);
      if (res.data.StatusCode !== 200) {
        throw new Error("error");
      }
      if (modeSearch === MODE_SEARCH.MEMBER) {
        setListSearch(res.data.Data.Data || []);
      } else {
        setListSearchEvent(res.data.Data.Data || []);
      }
    } catch (error) {
      handleError(error);
    }
  };
  return (
    <div>
      <Box
        width="100%"
        max-width="10w"
        sx={{
          p: "2.5rem",
        }}
      ></Box>
      <div
        style={{
          marginTop: -70,
        }}
        className="how-work"
      >
        <Box
          sx={{
            display: "flex",
            alignItems: { md: "flex-end", xs: "center" },
            flexDirection: { xs: "column", md: "row" },
            justifyContent: { md: "space-between", xs: "center" },
            p: "30px",
            background: "#f0f0f0",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <div
                style={{ height: "auto" }}
                className="content-card card-item "
              >
                <div className="flex-center">
                  <ButtonTab
                    index={0}
                    value={modeSearch}
                    text={"Thành viên gia đình"}
                    onClick={(e) => setModeSearch(0)}
                  />
                  <ButtonTab
                    index={1}
                    value={modeSearch}
                    text={"Sự kiện"}
                    onClick={(e) => setModeSearch(1)}
                  />
                </div>
                <div
                  className="flex-center"
                  style={{
                    marginTop: 30,
                  }}
                >
                  <TextField
                    fullWidth
                    label={`Tìm kiếm ${
                      modeSearch == 0 ? "Thành viên gia đình" : "Sự kiện"
                    }`}
                    value={txtSearch}
                    onChange={(e) => setTxtSearch(e.target.value)}
                  />
                  <Button
                    onClick={() => onSearch()}
                    variant="contained"
                    style={{ width: 200, marginLeft: 20 }}
                  >
                    Tìm kiếm
                  </Button>
                </div>
              </div>
              <div
                style={{ height: "auto", minHeight: 500, marginTop: 30 }}
                className="content-card card-item "
              >
                <h4 className="bold">Kết quả tìm kiếm</h4>
                {modeSearch === MODE_SEARCH.MEMBER ? (
                  <ListMember isExport={false} action={false} list={listSearch} />
                ) : (
                  <>
                    <ListEvent action={false} list={listSearchEvent} />
                  </>
                )}
                {checkEmptyData(modeSearch ===MODE_SEARCH.MEMBER?listSearch:[1] )}
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className="content-card card-item">
                <h4 className="bold">Lịch sử gia đình</h4>

             
                {listHistory?.slice(0, 3).map((item, index) => (
                  <div
                    style={{
                      padding: 10,
                      marginBottom: 20,
                    }}
                    className="item-history card-bg"
                  >
                    <div style={{
                      display:"flex",
                      justifyContent:"space-between",
                      width:"100%"
                    }} className="item-history">
                      <div
                        className="flex-center"
                        style={{
                          width: 500,
                          flexDirection: "column",
                          alignItems: "flex-start",
                          justifyContent: "center",
                        }}
                      >
                        <p className="title">{item.Title}</p>
                        <div style={{ textAlign: "start" }}>
                          Thời gian : {dateFormat3(item.Date)}
                        </div>
                      </div>
                      {item.Image && (
                    <div style={{
                      flex:1,
                      display:"flex",
                      justifyContent:"flex-end",
                    }}>
                        <Avatar
                        style={{
                          width: 70,
                          height: 70,
                        }}
                        src={item.Image}
                      />
                    </div>
                    )}
                    </div>
                  </div>
                  
                ))}
                  {
                    listHistory.length > 0 &&  <div
                    style={{
                      textAlign: "end",
                      color: "black",
                      marginTop: -10,
                      cursor: "pointer",
                    }}
                    onClick={() => navigate("/history")}
                  >
                    Xem thêm
                  </div>
                  }
                {checkEmptyData(listHistory)}
              </div>
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
};

export default HomeMemberLogin;

import React, { useState } from "react";
import { Box, Button, Card, Grid, TextField } from "@mui/material";
import { useTheme } from "@emotion/react";
import { theme } from "../../theme";
import Navbar from "../../components/layout/Navbar";
import "./../history-family/History.scss";
import PrimaryButton from "../../components/common/button/PrimaryButton";
import { useNavigate } from "react-router-dom";
import ButtonTab from "../../components/common/button/ButtonTab";
import ListMember from "../family-tree/admin-family-tree/components/manage-member/ListMember";
const HomeMemberLogin = () => {
  const { palette } = useTheme(theme);
  const navigate = useNavigate();
  const [value, setValue] = useState(1);
  const [txtSearch, setTxtSearch] = useState("");

  const [listHistory, setListHistory] = useState([
    {
      content: "A va B cưới",
      image:
        "https://tonywedding.vn/wp-content/uploads/2022/09/z3734234968634_dd7394041c1d896cef94a62260f808e0.jpg",
    },
    {
      content: "A va B cưới",
      image:
        "https://tonywedding.vn/wp-content/uploads/2022/09/z3734234968634_dd7394041c1d896cef94a62260f808e0.jpg",
    },
    {
      content: "A va B cưới",
      image:
        "https://tonywedding.vn/wp-content/uploads/2022/09/z3734234968634_dd7394041c1d896cef94a62260f808e0.jpg",
    },
    {
      content: "A va B cưới",
      image:
        "https://tonywedding.vn/wp-content/uploads/2022/09/z3734234968634_dd7394041c1d896cef94a62260f808e0.jpg",
    },
  ]);
  return (
    <div>
      <Box
        width="100%"
        max-width="10w"
        sx={{
          p: "2.5rem",
        }}
      ></Box>
      <div style={{
        marginTop:-70
      }} className="how-work">
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
                    index={1}
                    value={value}
                    text={"Thành viên gia đình"}
                    onClick={(e) => setValue(1)}
                  />
                  <ButtonTab
                    index={2}
                    value={value}
                    text={"Sự kiện"}
                    onClick={(e) => setValue(2)}
                  />
                </div>
                <div className="flex-center" style={{
                    marginTop:30
                }}>
                  <TextField
                    fullWidth
                    label={`Tìm kiếm ${
                      value == 1 ? "Thành viên gia đình" : "Sự kiện"
                    }`}
                    value={txtSearch}
                    //   onChange={handleChange}
                  />
                  <Button variant="contained" style={{width:200,marginLeft:20}}>
                  Tìm kiếm
                  </Button>
                 
                </div>
              </div>
              <div
                style={{ height: "auto",minHeight:500,marginTop:30 }}
                className="content-card card-item "
              >
                 <h4 className="bold">Kết quả tìm kiếm</h4>
                 <ListMember />
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className="content-card card-item">
                <h4 className="bold">Lịch sử gia đình</h4>
                {listHistory.map((item, index) => (
                  <Card className="item-history">
                    <p>{item.content}</p>
                    <img src={item.image} />
                  </Card>
                ))}
                <PrimaryButton
                  event={() => navigate("/history")}
                  title={"Xem thêm"}
                />
              </div>
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
};

export default HomeMemberLogin;

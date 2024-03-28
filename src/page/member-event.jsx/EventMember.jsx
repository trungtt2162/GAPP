import React, { useState } from "react";
import { Box, Card, Grid } from "@mui/material";
import { useTheme } from "@emotion/react";
import { theme } from "../../theme";
import Navbar from "../../components/layout/Navbar";
import "./../history-family/History.scss";
const fakeContent =
  "Hòa mình trong không khí ấm áp của tình gia đình, sự kiện lần này đã mang đến cho mọi người những trải nghiệm đáng nhớ và ý nghĩa. Từ những tiếng cười vang vọng trong bữa tiệc sum họp, đến những trò chơi vui nhộn dành cho cả gia đình, mỗi khoảnh khắc đều được tô điểm bởi sự gắn kết và tình thân thiết. Qua những câu chuyện, kỷ niệm, và những bức ảnh ghi lại, chúng ta cùng nhìn lại quãng thời gian đáng quý này và ghi nhận tình yêu thương và sự đoàn kết của mỗi thành viên trong gia đình. Đây thực sự là một sự kiện không chỉ để kỷ niệm mà còn để ghi nhận giá trị vô hạn của tình gia đình.";
const EventMember = () => {
  const { palette } = useTheme(theme);
  const [listEvent, setlistEvent] = useState([
    {
        id:1,
      name: "Sự kiện A",
      image:
        "https://tonywedding.vn/wp-content/uploads/2022/09/z3734234968634_dd7394041c1d896cef94a62260f808e0.jpg",
      time: "12-12-2023",
      content: fakeContent,
    },
    {
        id:2,
      name: "Sự kiện B",
      image:
        "https://tonywedding.vn/wp-content/uploads/2022/09/z3734234968634_dd7394041c1d896cef94a62260f808e0.jpg",
      time: "12-12-2023",
      content: fakeContent,
    },
    {
        id:3,
      name: "Sự kiện C",
      image:
        "https://tonywedding.vn/wp-content/uploads/2022/09/z3734234968634_dd7394041c1d896cef94a62260f808e0.jpg",
      time: "12-12-2023",
      content: fakeContent,
    },
    {
        id:4,
      name: "Sự kiện D",
      image:
        "https://tonywedding.vn/wp-content/uploads/2022/09/z3734234968634_dd7394041c1d896cef94a62260f808e0.jpg",
      time: "12-12-2023",
      content: fakeContent,
    },
  ]);
  const [currentEvent, setCurrentEvent] = useState(
    listEvent.length > 0 ? listEvent[0] : {}
  );
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
                <h4 className="bold">{currentEvent?.name}</h4>
                <div
                  style={{
                    textAlign: "start",
                    marginTop:10
                  }}
                >
                  <span className="bold">Link sự kiện : </span>
                  <a
                    style={{
                      color: "blue",
                    }}
                    href="https://tonywedding.vn/wp-content/uploads/2022/09/z3734234968634_dd7394041c1d896cef94a62260f808e0.jpg"
                  >
                    https://tonywedding.vn/wp-content/uplo8634_dd7394041c1d896cef94a62260f808e0.jpg
                  </a>
                </div>
                <div
                  style={{
                    textAlign: "start",
                    marginTop:10
                  }}
                >
                  <span className="bold">Ngày diễn ra : </span>
                  <span>{currentEvent?.time}</span>
                </div>
                <div
                  style={{
                    textAlign: "start",
                    marginTop:10
                  }}
                >
                  <span className="bold">Nội dung : </span>
                  <span>{currentEvent?.content}</span>
                </div>
                <div
                  style={{
                    textAlign: "start",
                    marginTop:10
                  }}
                >
                  <img src={currentEvent?.image} />
                </div>
              </div>
            </Grid>
            <Grid item xs={6}>
              <div style={{paddingTop:30}} className="content-card card-item">
                <h4 className="bold">Danh sách các sự kiện cũ và sắp tới</h4>
                {listEvent.map((item, index) => (
                  <Card
                    onClick={() => {
                      setCurrentEvent(item);
                    }}
                    style={{ marginTop: 10, cursor: "pointer",border:item.id === currentEvent.id ? "2px solid black":"" }}
                  >
                    <div
                      style={{
                        border: "none !important",
                      }}
                      className="item-history"
                    >
                      <p>{item.name}</p>
                      <img src={item.image} />
                    </div>
                  </Card>
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

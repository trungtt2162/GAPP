import React, { useEffect, useState } from "react";
import { Box, Card, Grid } from "@mui/material";
import { useTheme } from "@emotion/react";
import { theme } from "../../theme";
import Navbar from "../../components/layout/Navbar";
import "./../history-family/History.scss";
import { handleError } from "../../ultils/helper";
import useAuthStore from "../../zustand/authStore";
import { eventApi } from "../../api/event.api";
const fakeContent =
  "Hòa mình trong không khí ấm áp của tình gia đình, sự kiện lần này đã mang đến cho mọi người những trải nghiệm đáng nhớ và ý nghĩa. Từ những tiếng cười vang vọng trong bữa tiệc sum họp, đến những trò chơi vui nhộn dành cho cả gia đình, mỗi khoảnh khắc đều được tô điểm bởi sự gắn kết và tình thân thiết. Qua những câu chuyện, kỷ niệm, và những bức ảnh ghi lại, chúng ta cùng nhìn lại quãng thời gian đáng quý này và ghi nhận tình yêu thương và sự đoàn kết của mỗi thành viên trong gia đình. Đây thực sự là một sự kiện không chỉ để kỷ niệm mà còn để ghi nhận giá trị vô hạn của tình gia đình.";
const EventMember = () => {
  const { palette } = useTheme(theme);
  const { currentIdGenealogy } = useAuthStore();

  const [listEvent, setListEvent] = useState([]);
  const [currentEvent, setCurrentEvent] = useState(
    listEvent.length > 0 ? listEvent[0] : {}
  );
  const getListEvent = async (id) => {
    try {
      const res = await eventApi.getListEventAdmin(id);
      if (res.data.StatusCode === 200) {
        setListEvent(res.data.Data.Data);
        if(res.data.Data.Data.length > 0){
          setCurrentEvent(res.data.Data.Data[0])
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
              {currentEvent && <div className="content-card card-item">
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
              </div>}
            </Grid>
            <Grid item xs={6}>
              <div
                style={{ paddingTop: 30 }}
                className="content-card card-item"
              >
                <h4 className="bold">Danh sách các sự kiện cũ và sắp tới</h4>
                {listEvent.map((item, index) => (
                  <Card
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

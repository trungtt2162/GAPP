import React, { useState } from "react";
import { Box, Card, Grid } from "@mui/material";
import { useTheme } from "@emotion/react";
import { theme } from "../../theme";
import Navbar from "../../components/layout/Navbar";
import "./History.scss";
const HistoryFamily = () => {
  const { palette } = useTheme(theme);
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
                <p style={{textAlign:"start"}}>
                  Chào mừng bạn đến với trang web gia phả của gia đình Nguyễn,
                  nơi chúng tôi lưu giữ và chia sẻ câu chuyện của dòng họ qua
                  nhiều thế hệ. Dòng họ Nguyễn bắt nguồn từ tỉnh Nghệ An, một
                  vùng đất nổi tiếng với truyền thống văn hóa và lịch sử phong
                  phú. Từ những năm 1800, tổ tiên chúng tôi đã đặt nền móng cho
                  một gia phả đầy tự hào, mở đầu là cụ tổ Nguyễn Văn A, người
                  được biết đến với tài năng và lòng nhân ái. Qua các thế hệ,
                  mỗi thành viên trong gia đình đã góp phần viết nên những trang
                  sử mới, từ những người nông dân chăm chỉ, thợ thủ công tài
                  hoa, đến các nhà giáo dục, bác sĩ, và những nhân vật có ảnh
                  hưởng trong cộng đồng. Dù cho cuộc sống có đưa chúng ta đến
                  những miền đất mới, tinh thần và giá trị của dòng họ Nguyễn
                  vẫn luôn được gìn giữ và truyền từ thế hệ này sang thế hệ
                  khác. Website này không chỉ là nơi để tìm hiểu về lịch sử và
                  truyền thống của gia đình chúng tôi mà còn là một không gian
                  để chúng tôi kết nối, chia sẻ những câu chuyện, hình ảnh, và
                  ghi chép quan trọng. Qua đó, chúng tôi hy vọng không chỉ giữ
                  gìn kỷ niệm và di sản của tổ tiên mà còn tạo điều kiện để các
                  thế hệ tương lai có thể hiểu và trân trọng nguồn cội của mình.
                  Chúng tôi mời bạn lướt qua các trang của website, khám phá câu
                  chuyện của gia đình Nguyễn, và chia sẻ niềm tự hào của chúng
                  tôi. Hãy cùng chúng tôi duy trì và phát triển di sản này, để
                  câu chuyện của dòng họ Nguyễn có thể tiếp tục được kể lại qua
                  nhiều thế hệ tiếp theo.
                </p>
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className="content-card card-item">
                <h4 className="bold">Các mốc sự kiện lịch sử</h4>
                {listHistory.map((item, index) => (
                  <Card className="item-history">
                    <p>{item.content}</p>
                    <img src={item.image} />
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

export default HistoryFamily;

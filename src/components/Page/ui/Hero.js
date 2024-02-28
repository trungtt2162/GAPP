import {
  Box,
  Grid,
  Typography,
  useTheme,
  TextField,
  Button,
} from "@mui/material";
import { theme } from "../../../theme";

// TODO: Update background image
const Hero = () => {
  const { palette } = useTheme(theme);
  return (
    <div
      className="hero"
      sx={{
        height: "100vh",
        width: "100%",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: { md: "100vh", xs: "30rem" },
          p: { md: "25vh 9rem", xs: "25vh 1.75rem" },
        }}
      >
        <Grid container spacing={2} textAlign="left">
          <Grid item lg={8} md={12} sm={12}>
            <Typography
              variant="head"
              sx={{
                color: palette.primary.dark,
                fontWeight: "bold",
                fontSize: "4vw",
                "&:hover": {
                  color: palette.primary.dark,
                },
              }}
            >
              Nơi lưu trữ kí ức, 
            </Typography>
            <Typography
              variant="inherit"
              className="textbox-bg"
              sx={{
                p: { md: "2rem 3rem", xs: " 0 0.3rem" },
                color: palette.primary.dark,
                fontWeight: "bold",
                fontSize: "3.5vw",
                "&:hover": {
                  color: palette.primary.dark,
                },
              }}
            >
              hiện thực và tương lai
            </Typography>
          </Grid>
          <Grid
            item
            md={6}
            xs={12}
            sx={{
              mt: { md: "2.5rem" },
            }}
          >
            <Typography
              variant="text"
              sx={{
                color: palette.text.secondary,
                fontSize: { md: "2rem" },
              }}
            >
              Phần mềm gia phả ông bà ta là nơi lưu trữ thông tin của dòng họ, nhắc nhở con cháu tụ hop với gia đình ở những ngày giỗ, chạp thông qua ứng dụng nhắc nhở tự động từ tin nhắn của mỗi cá nhân.
            </Typography>
            {/* TRACKING CHECK */}
            <Box
              display="flex"
              sx={{
                mt: "25px",
                flexDirection: { md: "row", xs: "column" },
              }}
            >
              
              {/* <Button
                variant="text"
                sx={{
                  "&:hover": {
                    backgroundColor: palette.primary.main,
                    color: "#fff",
                  },
                  ml: { md: "130px" },
                  p: "0 60px",
                  backgroundColor: palette.primary.main,
                  color: "#ffffff",
                  borderRadius: 10,
                  boxShadow: ` 0px 7px 5px 0px ${palette.primary.light}}`,
                }}
              >
                Tham gia
              </Button> */}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Hero;

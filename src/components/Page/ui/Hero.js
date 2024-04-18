import { Box, Grid, Typography, useTheme } from "@mui/material";
import { theme } from "../../../theme";
import useAuthStore from "../../../zustand/authStore";

// TODO: Update background image
const Hero = () => {
  const { palette } = useTheme(theme);
  const { geneName } = useAuthStore();
  return (
    <div
      style={{
        height: "500px",
        width: "100%",
        background: "rgb(70 21 17)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "center",
      }}
    >
      <div
        style={
          {
            // marginTop: 200,
          }
        }
      >
        <div
          className="gradient-text"
          style={{
            color: "#fff",
            fontSize: 30,
            fontWeight: "bold",
          }}
        >
          Phả tộc
        </div>
        <div
          className="gradient-text"
          style={{
            color: "#fff",
            fontSize: 60,
            fontFamily: "Lobster, cursive",
            fontWeight: "bold",
          }}
        >
          {geneName}
        </div>{" "}
        <img
          style={{
            width: 500,
            transform: "translateY(60px)",
          }}
          src="/nhatho.png"
        />
      </div>
    </div>
  );
};

export default Hero;

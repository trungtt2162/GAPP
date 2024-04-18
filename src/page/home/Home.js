import {
  Button,
  Box,
  Typography,
  useTheme,
  Grid,
  useMediaQuery,
} from "@mui/material";
import Hero from "../../components/Page/ui/Hero";
import { theme } from "../../theme";
// import { default as star } from "../../assets/star.svg";
// import { default as truck } from "../../assets/truck.svg";
// import { default as price } from "../../assets/price.svg";
// import { default as gps } from "../../assets/gps.svg";
// import Step from "../../components/step";
// import Card from "./ui/Card";
import PriceForm from "../../components/Page/ui/PriceForm";
// import Reviews from "./ui/Reviews";
import PrimaryButton from "../../components/common/button/PrimaryButton";
import HomeMemberLogin from "./HomeMemberLogin";
import { useEffect } from "react";
import { API } from "../../api";

//import MobileReviews from "./Navbar/MobileReviews";

const Home = () => {
  const { palette } = useTheme(theme);
  const isMobile = useMediaQuery("(max-width:900px)");
  const test = async () => {
    const res = await API.post("/api/Account/login",{
        UserName:"string",
        Password:"string"
    })
    console.log(res.data)
  };
  useEffect(() => {
    test();
  }, []);

  return (
    <div className="home">
      {/* <Hero /> */}
      {/* TOOLS */}
      <div style={{}}>
        <Box
          width="100%"
          max-width="10w"
          sx={{
            background: "#f0f0f0",
            p: "1rem",
          }}
        >
          <HomeMemberLogin />
        </Box>
      </div>
    </div>
  );
};

export default Home;

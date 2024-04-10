import { useTheme } from "@emotion/react";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import React, { useState } from "react";
import TabPenal from "../../../components/common/tabs/TabPenal";
import TabSidebar from "../../../components/common/tabs/TabSidebar";
import { theme } from "../../../theme";
const TabContainer = ({ listSideBar }) => {
  const { palette } = useTheme(theme);
  const [value, setValue] = useState(
    Math.min(...listSideBar.map((i) => i.key))
  );
  return (
    <div>
      <Box
        width="100%"
        sx={{
          backgroundColor: "white",
          p: "2.5rem",
          color: "black",
        }}
      ></Box>
      <div className="how-work">
        <Box
          sx={{
            display: "flex",
            alignItems: { md: "flex-end", xs: "center" },
            flexDirection: { xs: "column", md: "row" },
            justifyContent: { md: "space-between", xs: "center" },
            // p: "15px 40px",
          }}
        >
          <Grid container>
            <Grid item xs={12} md={2}>
              <TabSidebar
                value={value}
                event={setValue}
                listSideBar={listSideBar}
              />
            </Grid>
            <Grid item xs={12} md={10}>
              <div
                className="shadown bg-default"
                style={{
                  height: "calc(100vh - 80px)",

                  overflow: "auto",
                  padding: 40,
                  paddingBottom: 30,
                  // background:"#f2f7fb"
                }}
              >
                {listSideBar.map((i) => (
                  <TabPenal value={value} index={i.key}>
                    <div className="card-item">
                      <i.component />
                    </div>
                  </TabPenal>
                ))}
              </div>
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
};

export default TabContainer;

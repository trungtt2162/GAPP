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
} from "@mui/material";
import { genealogyApi } from "../../api/genealogy.api";
import { historyApi } from "../../api/history.api";
import CustomModal from "../../components/common/modal/CustomModal";
import Tree1 from "../family-tree/admin-family-tree/components/family-tree/FamilyTree";
const GeneGuest = () => {
  const [curent, setCurrent] = useState(null);

  const [id, setId] = useState("");
  const [des, setDes] = useState("");
  const [listEvent, setListEvent] = useState([]);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [listGene, setListGene] = useState([]);
  const [listHistory, setListHistory] = useState([]);
  const modifyInitialValue = (value) => {
    const modifiedValue = value?.replace(
      /<img/g,
      '<img style="width: 100%; height: auto;"'
    );
    return modifiedValue;
  };

  const getListEvent = async () => {
    try {
      const res = await eventApi.getListEventGuest(id);
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

  // get dest
  const getDes = async () => {
    try {
      const res = await historyApi.getDescriptionHistoryGuest(id);
      if (res.data.StatusCode === 200) {
        setDes(res.data.Data?.Description);
      }
    } catch (error) {
      handleError(error);
    }
  };
  const getListHistory = async () => {
    try {
      const res = await historyApi.getListHistoryGuest(id);
      if (res.data.StatusCode === 200) {
        setListHistory(res.data.Data.Data || []);
      }
    } catch (error) {
      handleError(error);
    }
  };
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
                    onChange={(e) => setId(e.target.value)}
                    label="Gia phả"
                  >
                    {listGene.map((i) => (
                      <MenuItem value={i.Id}>{i.Name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Button
                  variant="contained"
                  onClick={async () => {
                    // if(id){
                    //     await getDes()
                    //     await  getListHistory()
                    // }
                  }}
                >
                  Tìm kiếm
                </Button>
              </div>
            </Grid>
          </Grid>
        </Box>
      </div>
      <CustomModal
        minHeight={600}
        open={curent}
        onClose={() => setCurrent(null)}
      >
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <img
              src={curent?.Image}
              style={{
                width: "100%",
                height: "auto",
              }}
            />
          </Grid>
          <Grid item xs={8}>
            <p
              style={{
                textAlign: "start",
              }}
            >
              {curent?.Description}
            </p>
          </Grid>
        </Grid>
      </CustomModal>
      <div className="content-card card-item">
        <Tree1 isGuest idTree={id} />
      </div>
    </div>
  );
};

export default GeneGuest;

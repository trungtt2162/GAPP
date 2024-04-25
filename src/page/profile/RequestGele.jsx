import React, { useState, useEffect } from "react";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
import { handleError } from "../../ultils/helper";
import axios from "axios";
import { toast } from "react-toastify";
import { authApi } from "../../api/auth.api";
import useAuthStore from "../../zustand/authStore";
import { genealogyApi } from "../../api/genealogy.api";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Box,
  Grid,
  Container,
  TextField
} from "@mui/material";
import ButtonTab from "../../components/common/button/ButtonTab";
import PrimaryButton from "../../components/common/button/PrimaryButton";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "50%",
    margin: "auto",
    "& > *": {
      marginBottom: theme.spacing(2),
    },
  },
}));

function RequestGele() {
  const classes = useStyles();
  const { user } = useAuthStore();
  const [id, setId] = useState("");
  const [listGene, setListGene] = useState([]);

  //
  const [value, setValue] = useState(1);
  const [txtSearch, setTxtSearch] = useState("");
  const [page, setPage] = React.useState(0);
  const [listSearch, setListSearch] = useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleSearch = async () => {
    try {
      const res =
        value == 1
          ? await genealogyApi.getListGegePublicByName(txtSearch)
          : await genealogyApi.getListGegePublicById(txtSearch);
          if(res.data.StatusCode === 200){
            setListSearch(res.data.Data.Data || [])
          }
    } catch (error) {
      handleError(error);
    }
  };
  //
  const onReqest = async (id) => {
    try {
      if(!user.Phone){
        toast.warning("Vui lòng cập nhật số điện thoại trước khi yêu cầu");
        return;
      }
      const res = await genealogyApi.requestgele(id);
      if (res.data.StatusCode === 200) {
        toast.success("Yêu cầu thành công");
      }
    } catch (error) {
      toast.error("Bạn đã ở trong gia phả này hoặc đã yêu cầu từ trước");
      // handleError(error);
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
  useEffect(() => {
    handleSearch()
  },[])
  return (
   <div style={{marginTop:70}}>
    <h4 className="bold">Yêu cầu vào gia phả</h4>
    <div className="home">
      {/* <Hero /> */}
      {/* TOOLS */}
      <div style={{}}>
        <div
          width="100%"
          max-width="10w"
          sx={{
            background: "white",
            p: "1rem",
          }}
        >
          <div>
          
            <div
               
              className="how-work"
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: { md: "flex-end", xs: "center" },
                  flexDirection: { xs: "column", md: "row" },
                  justifyContent: { md: "space-between", xs: "center" },
                  p: "30px",
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <div
                    style={{
                      overflow:"hidden",
                      height: "auto"
                    }}
                      // style={{ }}
                      className=" "
                    >
                      <div className="flex-center">
                        <ButtonTab
                          index={1}
                          value={value}
                          text={"Tìm theo tên"}
                          onClick={(e) => setValue(1)}
                        />
                        <ButtonTab
                          index={2}
                          value={value}
                          text={"Tìm theo mã"}
                          onClick={(e) => setValue(2)}
                        />
                      </div>
                      <Container maxWidth="md">
                        <div
                          className="flex-center"
                          style={{
                            marginTop: 30,
                          }}
                        >
                          <TextField
                            fullWidth
                            label={`Tìm kiếm ${
                              value == 1 ? "Tìm theo tên" : "Tìm theo mã"
                            }`}
                            value={txtSearch}
                            onChange={(e) => setTxtSearch(e.target.value)}
                          />
                          <Button
                            onClick={() => {
                              handleSearch();
                            }}
                            variant="contained"
                            style={{ width: 200, marginLeft: 20 }}
                          >
                            Tìm kiếm
                          </Button>
                        </div>
                      </Container>
                    </div>
                    <div
                      style={{ height: "auto", minHeight: 500, marginTop: 30 }}
                      className=""
                    >
                      <p style={{
                        textAlign:"center"
                      }} className="title">Kết quả tìm kiếm gia phả</p>
                      <TableContainer component={Paper}>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell className="text-center">Mã</TableCell>
                              <TableCell className="text-center">Tên gia phả</TableCell>
                              <TableCell className="text-center">
                                 Admin
                              </TableCell>
                              <TableCell className="text-center">
                                 Hành động
                              </TableCell>
                              {/* <TableCell className="text-center">
                                Link gia phả
                              </TableCell> */}
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {listSearch
                              .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                              )
                              .map((row) => (
                                <TableRow key={row.Id}>
                                  <TableCell className="text-center">
                                    {row.Id}
                                  </TableCell>
                                  <TableCell className="text-center">
                                    {row.Name}
                                  </TableCell>
                                  <TableCell className="text-center">
                                    {row.ModifiedBy}
                                  </TableCell>
                                  <TableCell className="text-center">
                                    <PrimaryButton event={() => onReqest(row.Id)} title={"Yêu cầu vào gia phả"} />
                                  </TableCell>
                                </TableRow>
                              ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                      <TablePagination
                        component="div"
                        count={listSearch.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                      />
                    </div>
                  </Grid>
                </Grid>
              </Box>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* <form className={classes.form}>
      <h4 style={{ marginBottom: 20 }} className="bold">
        Yêu cầu vào gia phả
      </h4>
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
        disabled={!id}
        onClick={() => onReqest()}
        variant="contained"
        color="primary"
      >
       Yêu cầu
      </Button>
    </form> */}
    </div>
  );
}

export default RequestGele;

import {
  Button,
  Box,
  Typography,
  useTheme,
  Grid,
  useMediaQuery,
  TextField,
  Container,
} from "@mui/material";
import Hero from "../../components/Page/ui/Hero";
import { theme } from "../../theme";
import React from "react";
import PriceForm from "../../components/Page/ui/PriceForm";
// import Reviews from "./ui/Reviews";
import PrimaryButton from "../../components/common/button/PrimaryButton";
import HomeMemberLogin from "./HomeMemberLogin";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import ButtonTab from "../../components/common/button/ButtonTab";
import ListMember from "../family-tree/admin-family-tree/components/manage-member/ListMember";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";
import { genealogyApi } from "../../api/genealogy.api";
import { handleError } from "../../ultils/helper";
//import MobileReviews from "./Navbar/MobileReviews";

const HomeNoLogin = () => {
  const isMobile = useMediaQuery("(max-width:900px)");
  const { palette } = useTheme(theme);
  const navigate = useNavigate();
  const [value, setValue] = useState(1);
  const [txtSearch, setTxtSearch] = useState("");
  const [page, setPage] = React.useState(0);
  const [listSearch, setListSearch] = useState([]);
  // Dữ liệu mẫu
  const rows = [
    {
      id: 1,
      name: "Nguyen Van A",
      familyTreeLink: "https://example.com/family-tree-1",
    },
    {
      id: 2,
      name: "Tran Thi B",
      familyTreeLink: "https://example.com/family-tree-2",
    },
    {
      id: 3,
      name: "Le Van C",
      familyTreeLink: "https://example.com/family-tree-3",
    },
    {
      id: 4,
      name: "Pham Thi D",
      familyTreeLink: "https://example.com/family-tree-4",
    },
    {
      id: 5,
      name: "Hoang Van E",
      familyTreeLink: "https://example.com/family-tree-5",
    },
    {
      id: 6,
      name: "Vo Thi F",
      familyTreeLink: "https://example.com/family-tree-6",
    },
    {
      id: 7,
      name: "Nguyen Van G",
      familyTreeLink: "https://example.com/family-tree-7",
    },
    {
      id: 8,
      name: "Tran Thi H",
      familyTreeLink: "https://example.com/family-tree-8",
    },
    {
      id: 9,
      name: "Le Van I",
      familyTreeLink: "https://example.com/family-tree-9",
    },
    {
      id: 10,
      name: "Pham Thi K",
      familyTreeLink: "https://example.com/family-tree-10",
    },
  ];
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // Hàm xử lý thay đổi trang
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
          <div>
            <Box
              width="100%"
              max-width="10w"
              sx={{
                p: "2.5rem",
              }}
            ></Box>
            <div
              style={{
                marginTop: -70,
              }}
              className="how-work"
            >
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
                  <Grid item xs={12}>
                    <div
                      style={{ height: "auto" }}
                      className="content-card card-item "
                    >
                      <div className="flex-center">
                        <ButtonTab
                          index={1}
                          value={value}
                          text={"Tìm theo tên"}
                          onClick={(e) => setValue(1)}
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
                              "Tìm theo tên" 
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
                      className="content-card card-item "
                    >
                      <h4 className="bold">Kết quả tìm kiếm gia phả</h4>
                      <TableContainer component={Paper}>
                        <Table>
                          <TableHead>
                            <TableRow>
                        
                              <TableCell className="text-center">Tên gia phả</TableCell>
                              <TableCell className="text-center">
                                 Admin
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
                                    {row.Name}
                                  </TableCell>
                                  <TableCell className="text-center">
                                    {row.ModifiedBy}
                                  </TableCell>
                                  {/* <TableCell className="text-center">
                                    <Link
                                      to={`tree/${row.Id}`}
                                      
                                    >
                                      Xem gia phả
                                    </Link>
                                  </TableCell> */}
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
        </Box>
      </div>
    </div>
  );
};

export default HomeNoLogin;

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Button,
  IconButton,
  TextField
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { makeStyles } from "@mui/styles";
import ButtonTab from "../../../components/common/button/ButtonTab";
import { supperAdminApi } from "../../../api/supperAdmin.api";
import { handleError } from "../../../ultils/helper";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import PrimaryButton from "../../../components/common/button/PrimaryButton";

function ListAccount() {
  // State cho việc phân trang
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [ListAccount, setListAccount] = useState([]);
  const [txtSearch, setTxtSearch] = useState("");

  // Hàm xử lý thay đổi trang
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  //
  const getListAcount = async () => {
    try {
      const res = await supperAdminApi.getListAdmin(txtSearch?.trim());
      if (res.data.StatusCode === 200) {
        setListAccount(res.data.Data.Data);
      }
    } catch (error) {
      console.log(error);
      handleError(error);
    }
  };

  // LOCK ACC
  const handleLockAcc = async (row, status) => {
    try {
      const res = await supperAdminApi.updateAdmin({
        ...row,
        IsBlock: status === 0 ? true : false,
        TypeRole :"string",
        JobTitle:""
      });
      if (res.data.StatusCode === 200) {
        toast.success(
          "Đã " +
            (status === 1 ? "mở" : "") +
            " khóa account của admin " +
            row.FirstName +
            " " +
            row.LastName
        );
        getListAcount();
      }
    } catch (error) {
      handleError(error);
    }
  };

  // Delete ACC
  const handleDelete = async (row) => {
    try {
      const res = await supperAdminApi.deleteAdmin(row.Id);
      if (res.data.StatusCode === 200) {
        toast.success(
          "Đã xóa account của admin " + row.FirstName + " " + row.LastName
        );
        getListAcount();
      }
    } catch (error) {
      handleError(error);
    }
  };
  useEffect(() => {
    getListAcount();
  }, []);
  return (
    <div>
      <div
        className="flex-center"
        style={{
          marginBottom: 20,
        }}
      >
        <h4 style={{ marginBottom: 20 }} className="bold">
          Danh sách tài khoản
        </h4>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginTop: 10,
          marginBottom: 10,
        }}
      >
        <TextField
         style={{
          width: 300, marginLeft: "30%"}}
          label="Email"
          variant="outlined"
          value={txtSearch}
          onChange={(e) => setTxtSearch(e.target.value)}
        />
        <PrimaryButton title={"Tìm kiếm"} event={() => getListAcount()} />
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className={"text-center"}>Tên</TableCell>
              <TableCell className={"text-center"}>Email</TableCell>
              {/* <TableCell className={"text-center"}>Link gia phả</TableCell> */}
              <TableCell className={"text-center"}>Khóa/Mở khóa</TableCell>
              <TableCell className={"text-center"}>Xóa</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ListAccount.slice(
              page * rowsPerPage,
              page * rowsPerPage + rowsPerPage
            ).map((row) => (
              <TableRow key={row.id}>
                <TableCell className={"text-center"}>
                  {row?.FirstName + " " + row?.LastName}
                </TableCell>
                <TableCell className={"text-center"}>{row.Email}</TableCell>
                {/* <TableCell className={"text-center"}>
                  <Link to={"/family-tree-detail/" + row.Id}>
                    Link gia phả của {row?.FirstName + " " + row?.LastName}
                  </Link>
                </TableCell> */}
                <TableCell className={"text-center"}>
                  {!row.IsBlock ? (
                    <Button
                      onClick={() => {
                        handleLockAcc(row, 0);
                      }}
                      style={{
                        marginRight: 10,
                      }}
                      variant="contained"
                      color="warning"
                    >
                      Khóa
                    </Button>
                  ) : (
                    <Button
                      onClick={() => {
                        handleLockAcc(row, 1);
                      }}
                      style={{
                        marginRight: 10,
                      }}
                      variant="contained"
                      color="primary"
                    >
                      Mở Khóa
                    </Button>
                  )}
                </TableCell>
                <TableCell className={"text-center"}>
                  {" "}
                  <Button
                    onClick={() => {
                      handleDelete(row);
                    }}
                    variant="contained"
                    color="error"
                    aria-label="delete"
                  >
                    <DeleteIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={ListAccount.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
      />
    </div>
  );
}

export default ListAccount;

import React from "react";
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
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { makeStyles } from "@mui/styles";
import ButtonTab from "../../../components/common/button/ButtonTab";

const users = [
  {
    name: "Admin1",
    action: "Thêm",
    email: "Admin1@gmail.com",
  },
  {
    name: "18-3-2024",
    action: "Sửa",
    email: "Admin1@gmail.com",
  },
  {
    name: "Admin1",
    action: "Xóa",
    email: "Admin1@gmail.com",
  },
  {
    name: "Admin1",
    action: "01/01/1990",
    email: "Admin1@gmail.com",
  },
  {
    name: "Admin1",
    action: "01/01/1990",
    email: "Admin1@gmail.com",
  },
];

function ListAccount() {
  // State cho việc phân trang
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // Hàm xử lý thay đổi trang
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <div>
      <div
        className="flex-center"
        style={{
          marginBottom: 20,
        }}
      >
        <ButtonTab
          index={1}
          value={1}
          text={"Danh sách Tài khoản"}
          onClick={(e) => {}}
        />
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className={"text-center"}>Tên</TableCell>
              <TableCell className={"text-center"}>Email</TableCell>
              <TableCell className={"text-center"}>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow key={row.id}>
                  <TableCell className={"text-center"}>{row.name}</TableCell>
                  <TableCell className={"text-center"}>{row.email}</TableCell>
                  <TableCell className={"text-center"}>
                    <Button
                      style={{
                        marginRight: 10,
                      }}
                      variant="contained"
                      color="error"
                    >
                      Khóa
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
      />
    </div>
  );
}

export default ListAccount;

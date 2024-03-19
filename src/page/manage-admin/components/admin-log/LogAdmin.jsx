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
import ButtonTab from "../../../../components/common/button/ButtonTab";
import { makeStyles } from "@mui/styles";

const users = [
  {
    time: "17-3-2014",
    action: "Thêm",
    admin_name: "Admin1",
  },
  {
    time: "18-3-2024",
    action: "Sửa",
    admin_name: "Admin1",
  },
  {
    time: "19-3-2024",
    action: "Xóa",
    admin_name: "Admin1",
  },
  {
    time: "20-3-2024",
    action: "01/01/1990",
    admin_name: "Admin1",
  },
  {
    time: "21-3-2024",
    action: "01/01/1990",
    admin_name: "Admin1",
  },
];

function AdminLog() {
  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
    cellCenter: {
      textAlign: "center", // Căn giữa nội dung của ô
    },
  });
  const classes = useStyles();
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
          text={"Quản lý log Admin"}
          onClick={(e) => {}}
        />
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className={classes.cellCenter}>Thời gian</TableCell>
              <TableCell className={classes.cellCenter}>Hành động</TableCell>
              <TableCell className={classes.cellCenter}>
                Admin thực hiện
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow key={row.id}>
                  <TableCell className={classes.cellCenter}>
                    {row.admin_name}
                  </TableCell>
                  <TableCell className={classes.cellCenter}>
                    {row.action}
                  </TableCell>
                  <TableCell className={classes.cellCenter}>
                    {row.time}
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

export default AdminLog;

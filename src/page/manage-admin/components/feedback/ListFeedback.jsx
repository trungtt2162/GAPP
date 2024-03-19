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
import ButtonTab from "../../../../components/common/button/ButtonTab";

const users = [
  {
    name: "17-3-2014",
    action: "Thêm",
    content: "Admin1",
  },
  {
    name: "18-3-2024",
    action: "Sửa",
    content: "Admin1",
  },
  {
    name: "19-3-2024",
    action: "Xóa",
    content: "Admin1",
  },
  {
    name: "20-3-2024",
    action: "01/01/1990",
    content: "Admin1",
  },
  {
    name: "21-3-2024",
    action: "01/01/1990",
    content: "Admin1",
  },
];

function ListFeedBack() {
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
          text={"Danh sách chờ phản hồi"}
          onClick={(e) => {}}
        />
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className={classes.cellCenter}>Tên</TableCell>
              <TableCell className={classes.cellCenter}>Nội dung</TableCell>
              <TableCell className={classes.cellCenter}>
                Hành động
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow key={row.id}>
                  <TableCell className={classes.cellCenter}>
                    {row.name}
                  </TableCell>
                  <TableCell className={classes.cellCenter}>
                    {row.content}
                  </TableCell>
                  <TableCell className={classes.cellCenter}>
                  <Button
                  style={{
                    marginRight: 10,
                  }}
                  variant="contained"
                  color="success"
                >
                  <CheckIcon fontSize="small" />
                </Button>
                <Button variant="contained" color="error">
                  <CloseIcon fontSize="small" />
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

export default ListFeedBack;

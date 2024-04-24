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
} from "@mui/material";
import ButtonTab from "../../../../components/common/button/ButtonTab";
import { makeStyles } from "@mui/styles";
import { logApi } from "../../../../api/log.api";
import { handleError } from "../../../../ultils/helper";
import useAuthStore from "../../../../zustand/authStore";
import moment from "moment";

function AdminLog() {
  const [listLog, setListLog] = useState([]);
  const {currentIdGenealogy} = useAuthStore()
  
  const getListLog = async () => {
    try {
      const res = await logApi.getListAllLog(currentIdGenealogy);
      if(res.data.StatusCode === 200){
        setListLog(res.data.Data.Data || [])
      }
    } catch (error) {
      handleError(error);
    }
  };
  useEffect(() => {
    if(currentIdGenealogy){
      getListLog();
    }
  }, [currentIdGenealogy]);
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
          {listLog?.reverse()?.map((user, index) => (
              <TableRow key={index}>
                <TableCell className={classes.cellCenter}>{user.Date && moment(user.Date).format("DD-MM-YYYY hh:mm:ss")}</TableCell>
                <TableCell className={classes.cellCenter}>{user.Description}</TableCell>
                <TableCell className={classes.cellCenter}>{user.CreatedBy}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={listLog.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
      />
    </div>
  );
}

export default AdminLog;

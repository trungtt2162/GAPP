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
  TextField
} from "@mui/material";
import TabSidebar from "../../../../../components/common/tabs/TabSidebar";
import ButtonTab from "../../../../../components/common/button/ButtonTab";
import { handleError } from "../../../../../ultils/helper";
import { logApi } from "../../../../../api/log.api";
import useAuthStore from "../../../../../zustand/authStore";
import moment from "moment/moment";
import PrimaryButton from "../../../../../components/common/button/PrimaryButton";

function LogManage() {
  const [listLog, setListLog] = useState([]);
  const {currentIdGenealogy} = useAuthStore()
  const [page, setPage] = React.useState(0);
 const [rowsPerPage, setRowsPerPage] = React.useState(10);
 const [txtSearch, setTxtSearch] = useState("");

 const handleChangePage = (event, newPage) => {
  setPage(newPage);
};
  const getListLog = async () => {
    try {
      const res = await logApi.getListLogBygenealogy(currentIdGenealogy,txtSearch?.trim());
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
          text={"Quản lý log"}
          onClick={(e) => {}}
        />
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
          width: 300}}
          label="Tên người thực hiện"
          variant="outlined"
          value={txtSearch}
          onChange={(e) => setTxtSearch(e.target.value)}
        />
        <PrimaryButton title={"Tìm kiếm"} event={() => getListLog()} />
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="text-center">Thời gian</TableCell>
              <TableCell className="text-center">Hành động</TableCell>
              <TableCell className="text-center">Người thực hiện</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listLog?.slice(
              page * rowsPerPage,
              page * rowsPerPage + rowsPerPage
            )?.reverse()?.map((user, index) => (
              <TableRow key={index}>
                <TableCell className="text-center">{user.Date && moment(user.Date).format("DD-MM-YYYY hh:mm:ss")}</TableCell>
                <TableCell className="text-center">{user.Description}</TableCell>
                <TableCell className="text-center">{user.CreatedBy}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={listLog?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
      />
    </div>
  );
}

export default LogManage;

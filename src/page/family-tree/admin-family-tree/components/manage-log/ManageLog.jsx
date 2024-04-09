import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import TabSidebar from "../../../../../components/common/tabs/TabSidebar";
import ButtonTab from "../../../../../components/common/button/ButtonTab";
import { handleError } from "../../../../../ultils/helper";
import { logApi } from "../../../../../api/log.api";
import useAuthStore from "../../../../../zustand/authStore";
import moment from "moment/moment";

function LogManage() {
  const [listLog, setListLog] = useState([]);
  const {currentIdGenealogy} = useAuthStore()
  const getListLog = async () => {
    try {
      const res = await logApi.getListLogBygenealogy(currentIdGenealogy);
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
            {listLog.map((user, index) => (
              <TableRow key={index}>
                <TableCell className="text-center">{user.Date && moment(user.Date).format("DD-MM-YYYY hh:mm:ss")}</TableCell>
                <TableCell className="text-center">{user.Description}</TableCell>
                <TableCell className="text-center">{user.CreatedBy}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default LogManage;

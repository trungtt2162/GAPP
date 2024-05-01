import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TablePagination,
  TextField
} from "@mui/material";
import { checkEmptyData, dateFormat3, handleError } from "../../../../../ultils/helper";
import { eventApi } from "../../../../../api/event.api";
import useAuthStore from "../../../../../zustand/authStore";
import { TYPE_EVENT } from "../../../../../constant/common";
import { toast } from "react-toastify";
import CustomModal from "../../../../../components/common/modal/CustomModal";
import AddEventForm from "./AddEvent";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import PrimaryButton from "../../../../../components/common/button/PrimaryButton";
function ListEventPending({ list, action = true }) {
  const [txtSearch, setTxtSearch] = useState("");
  const [listEvent, setListEvent] = useState();
  const { userGenealogy,currentIdGenealogy } = useAuthStore();
  const geId = currentIdGenealogy;
  const [currentEvent, setCurrentEvent] = useState(null);
  const currentList = list || listEvent;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event, newPage) => {
   setPage(newPage);
 };
  const getListEvent = async (id) => {
    let query = "";
    
    if(txtSearch){
      query += ` and Name like '%${txtSearch}%' `
    }
    try {
      const res = await eventApi.getListEventPening(id,query);
      if (res.data.StatusCode === 200) {
        setListEvent(res.data.Data.Data);
      }
    } catch (error) {
      handleError(error);
    }
  };
  useEffect(() => {
    if (geId && !list) {
      getListEvent(geId);
    }
  }, [geId]);

  const onApprove = async(row) => {
    try {
         const res = await eventApi.updateEvent({...row,Inactive:false})
         if(res.data.StatusCode === 200){
            setListEvent(listEvent.filter((i) => i.Id !== row.Id));
            toast.success("Đã duyệt")
            
            await eventApi.sendEmailEvent(row.IdGenealogy,row.Id)
            
         }
    } catch (error) {
        handleError(error)
    }
  }
  // Delete
  const deleteEvent = async (row) => {
    try {
      const res = await eventApi.deleteEvent(row.Id, geId);
      if (res.data.StatusCode === 200) {
        toast.success("Đã từ chối");
        setListEvent(listEvent.filter((i) => i.Id !== row.Id));
      }
    } catch (error) {
      handleError(error);
    }
  };
  const onClose = () => {
    setCurrentEvent(null);
  };
  const updateItem = (item) => {
    const index = listEvent.findIndex((i) => i.Id == item.Id);
    if (index >= 0) {
      const list = [...listEvent];
      list[index] = item;
      console.log(list);
      setListEvent(list);
      onClose();
    }
  };
  return (
    <>
     {!list &&   <div
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
          label="Tên sự kiện"
          variant="outlined"
          value={txtSearch}
          onChange={(e) => setTxtSearch(e.target.value)}
        />
        <PrimaryButton title={"Tìm kiếm"} event={() => getListEvent(geId)} />
      </div>}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tên sự kiện</TableCell>
              <TableCell>Thời gian tổ chức</TableCell>
              <TableCell>Chế độ</TableCell>
              {action && (
                <TableCell className="text-center">Hành động</TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {currentList?.slice(
              page * rowsPerPage,
              page * rowsPerPage + rowsPerPage
            )?.map((user, index) => (
              <TableRow key={index}>
                <TableCell>{user.Name}</TableCell>
                <TableCell>{dateFormat3(user.OrganizationDate)}</TableCell>
                <TableCell>{TYPE_EVENT[user.Type]}</TableCell>
                <TableCell className="text-center">
                  <Button
                      onClick={() => onApprove(user)}
                    style={{
                      marginRight: 10,
                    }}
                    variant="contained"
                    color="success"
                  >
                    <CheckIcon fontSize="small" />
                  </Button>
                  <Button
                    onClick={() => deleteEvent(user)}
                    variant="contained"
                    color="error"
                  >
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
        count={currentList?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
      />
      {checkEmptyData(currentList || [])}

      <CustomModal width={1000} open={currentEvent} onClose={onClose}>
        <AddEventForm updateItem={updateItem} item={currentEvent} />
      </CustomModal>
    </>
  );
}

export default ListEventPending;

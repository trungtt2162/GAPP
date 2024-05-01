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
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { checkEmptyData, handleError } from "../../../../../ultils/helper";
import { addressApi } from "../../../../../api/address.api";
import useAuthStore from "../../../../../zustand/authStore";
import { getLocationName } from "../../../../../constant/common";
import { toast } from "react-toastify";
import CustomModal from "../../../../../components/common/modal/CustomModal";
import AddLocationForm from "./AddLocation";
import PrimaryButton from "../../../../../components/common/button/PrimaryButton";

function OtherLocation() {
 
 const [listAddress,setListAddress] = useState([]);
 const {userGenealogy,currentIdGenealogy } = useAuthStore();
 const [currentId,setCurrentId] = useState(null)
 const [page, setPage] = React.useState(0);
 const [rowsPerPage, setRowsPerPage] = React.useState(10);
 const [txtSearch, setTxtSearch] = useState("");
 const handleChangePage = (event, newPage) => {
  setPage(newPage);
};
 const getListAddress = async(id) => {
  try {
    const res = await addressApi.getListAddress(id,txtSearch?.trim())
    if(res.data.StatusCode===200){
      setListAddress(res.data.Data.Data)
    }
  } catch (error) {
    handleError(error)
  }
 }
 const handleDelete = async (id) => {
  try {
    const res = await addressApi.deleteAddress(id,currentIdGenealogy)
    if(res.data.StatusCode===200){
      toast.success("Xóa thành công")
     setListAddress(listAddress.filter(i => i.Id !== id))
    }
  } catch (error) {
    handleError(error)
  }
 }
 
 useEffect(() => {
  if(currentIdGenealogy){
    getListAddress(currentIdGenealogy)
  }
 },[currentIdGenealogy])

 //update
 const updateNewItem = (item) => {
  const index = listAddress.findIndex(i => i.Id === item.Id);
  if(index >=0){
    const newLisaddress= [...listAddress];
    newLisaddress[index] = item;
    setListAddress(newLisaddress)
  }
 }
  return (
   <>
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
          label="Tên địa điểm"
          variant="outlined"
          value={txtSearch}
          onChange={(e) => setTxtSearch(e.target.value)}
        />
        <PrimaryButton title={"Tìm kiếm"} event={() => getListAddress(currentIdGenealogy)} />
      </div>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Tên</TableCell>
            <TableCell>Vị trí</TableCell>
            <TableCell>Loại địa điểm</TableCell>
           
            <TableCell className='text-center'>Hành động</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listAddress.slice(
              page * rowsPerPage,
              page * rowsPerPage + rowsPerPage
            ).map((user, index) => (
            <TableRow key={index}>
              <TableCell>{user.Name}</TableCell>
              <TableCell>{user.Location}</TableCell>
              <TableCell>{getLocationName(user.Type)}</TableCell>
             
              <TableCell className='text-center'>
                <Button
                onClick={() => {
                  setCurrentId(user)
                }}
                  style={{
                    marginRight: 10,
                  }}
                  variant="contained"
                  color="success"
                >
                 Sửa
                </Button>
                <Button onClick={() => handleDelete(user.Id)} variant="contained" color="error">
                 Xóa
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <TablePagination
        component="div"
        count={listAddress.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
      />
    {checkEmptyData(listAddress)}
    <CustomModal onClose={() => setCurrentId(null)} open={currentId}>
      <AddLocationForm updateNewItem={updateNewItem} item={currentId}  onClose={() => setCurrentId(null)} />
    </CustomModal>
    </>
  );
}

export default OtherLocation;

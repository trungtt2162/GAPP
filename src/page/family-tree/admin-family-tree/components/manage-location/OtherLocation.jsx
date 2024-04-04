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
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { handleError } from "../../../../../ultils/helper";
import { addressApi } from "../../../../../api/address.api";
import useAuthStore from "../../../../../zustand/authStore";
import { getLocationName } from "../../../../../constant/common";
import { toast } from "react-toastify";

function OtherLocation() {
 const [listAddress,setListAddress] = useState([]);
 const {userGenealogy } = useAuthStore();
 console.log(userGenealogy);
 const getListAddress = async(id) => {
  try {
    const res = await addressApi.getListAddress(id)
    if(res.data.StatusCode===200){
      setListAddress(res.data.Data.Data)
    }
  } catch (error) {
    handleError(error)
  }
 }
 const handleDelete = async (id) => {
  try {
    const res = await addressApi.deleteAddress(id,userGenealogy[0]?.IdGenealogy)
    if(res.data.StatusCode===200){
      toast.success("Xóa thành công")
     setListAddress(listAddress.filter(i => i.Id !== id))
    }
  } catch (error) {
    handleError(error)
  }
 }
 
 useEffect(() => {
  if(userGenealogy?.length > 0){
    getListAddress(userGenealogy[0].IdGenealogy)
  }
 },[userGenealogy])
  return (
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
          {listAddress.map((user, index) => (
            <TableRow key={index}>
              <TableCell>{user.Name}</TableCell>
              <TableCell>{user.Location}</TableCell>
              <TableCell>{getLocationName(user.Type)}</TableCell>
             
              <TableCell className='text-center'>
                <Button
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
  );
}

export default OtherLocation;

import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { checkEmptyData, dateFormat3, handleError } from '../../../../../ultils/helper';
import { eventApi } from '../../../../../api/event.api';
import useAuthStore from '../../../../../zustand/authStore';
import { TYPE_EVENT } from '../../../../../constant/common';
import { toast } from 'react-toastify';
import CustomModal from '../../../../../components/common/modal/CustomModal';
import AddEventForm from './AddEvent';

function ListEvent({list,action = true}) {
   const [listEvent,setListEvent] = useState();
   const {userGenealogy } = useAuthStore();
   const geId = userGenealogy[0]?.IdGenealogy
   const [currentEvent,setCurrentEvent] = useState(null);
   const currentList = list || listEvent
   const [startDate,setStartDate] = useState("");
   const [endDate,setEndDate]  = useState("")
   const getListEvent = async(id) => {
    let query = "";
    if(startDate ){
      query += ` and Date>=${startDate} `
    }
    if(endDate){
      query += ` and Date<=${endDate} `
    }
    try {
           const res = await eventApi.getListEventAdmin(id);
           if(res.data.StatusCode === 200){
            setListEvent(res.data.Data.Data)
           }
        } catch (error) {
          handleError(error)
        }
   }
   useEffect(() => {
   if(geId && !list){
    getListEvent(geId)
   }
   },[geId])

   // Delete
   const handleDelete =async(row) => {
    try {
           const res = await eventApi.deleteEvent(row.Id,geId);
           if(res.data.StatusCode === 200){
            toast.success("Xóa thành công");
           setListEvent(listEvent.filter(i => i.Id !== row.Id))
           }
        } catch (error) {
          handleError(error)
        }
   }
   const onClose = () => {
    setCurrentEvent(null);
   }
   const updateItem = (item) => {
    const index = listEvent.findIndex(i => i.Id == item.Id);
    if(index>=0){
        const list = [...listEvent];
        list[index] = item;
        console.log(list)
        setListEvent(list);
        onClose();
    }
   }
  return (
    <>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Tên sự kiện</TableCell>
            <TableCell>Thời gian tổ chức</TableCell>
            <TableCell>Chế độ</TableCell>
            {action && <TableCell className='text-center'>Hành động</TableCell>}

            
          </TableRow>
        </TableHead>
        <TableBody>
          {currentList?.map((user, index) => (
            <TableRow key={index}>
              <TableCell>{user.Name}</TableCell>
              <TableCell>{(dateFormat3(user.OrganizationDate))}</TableCell>
              <TableCell>{TYPE_EVENT[user.Type]}</TableCell>
             {action &&  <TableCell className='text-center'>
                <Button
                onClick={() => setCurrentEvent(user)}
                  style={{
                    marginRight: 10,
                  }}
                  variant="contained"
                  color="success"
                >
                 Sửa
                </Button>
                <Button onClick={() =>handleDelete(user)} variant="contained" color="error">
                 Xóa
                </Button>
              </TableCell>}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    {checkEmptyData(currentList || [])}
    <CustomModal width={1000} open={currentEvent} onClose={onClose}>

      <AddEventForm updateItem={updateItem} item={currentEvent} />
    </CustomModal>
    </>
  );
}

export default ListEvent;


import React, { useEffect, useState } from "react";
import HistoryEventItem from "./HistoryEventItem";
import useAuthStore from "../../../../../zustand/authStore";
import { checkEmptyData, dateFormat3, handleError } from "../../../../../ultils/helper";
import { historyApi } from "../../../../../api/history.api";
import CustomModal from "../../../../../components/common/modal/CustomModal";
import AddHistory from "./AddHostory";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button,TablePagination } from '@mui/material';

const HisoryEvent = () => {
  const { userGenealogy } = useAuthStore();

  const [currentItem, setCurrentItem] = useState(null);
  const [listHistory, setListHistory] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event, newPage) => {
   setPage(newPage);
 };
  const getListHistory = async (id) => {
    try {
      const res = await historyApi.getListAllHistoryByGenealogyId(id);
      if (res.data.StatusCode === 200) {
        setListHistory(res.data.Data.Data);
      }
    } catch (error) {
      handleError(error);
    }
  };
  useEffect(() => {
    getListHistory(userGenealogy[0]?.IdGenealogy);
  }, [userGenealogy]);
  const handleSetHistory = (id, newData) => {
    // const newHistoryList = [...listHistory];
    // const index = listHistory.findIndex((i) => i.id === id);
    // if (index >= 0) {
    //   newHistoryList[index] = newData;
    //   setListHistory(newHistoryList);
    // }
  };
  //
  const onClose = () => {
    setCurrentItem(null);
  }
  const updateItem = (item) => {
    const index = listHistory.findIndex(i => i.Id == item.Id);
    if(index>=0){
        const list = [...listHistory];
        list[index] = item;
        console.log(list)
        setListHistory(list);
        onClose();
    }
  }
  return (
    <div>
       <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className='text-center'>Tên sự kiện lịch sử</TableCell>
            <TableCell className='text-center'>Thời gian diễn ra</TableCell>
            <TableCell className='text-center'>Hành động</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listHistory?.slice(
              page * rowsPerPage,
              page * rowsPerPage + rowsPerPage
            )?.map((item, index) => (
              <HistoryEventItem
              setListHistory={setListHistory}
              listHistory={listHistory}
              setHistory={handleSetHistory}
              {...item}
              curr={item}
              setCurrentItem={setCurrentItem}
            />
          
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <TablePagination
        component="div"
        count={listHistory?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
      />
      
      <CustomModal onClose={onClose} open={currentItem}>{<AddHistory updateItem={updateItem} item={currentItem} />}</CustomModal>
      {checkEmptyData(listHistory)}
    </div>
  );
};
export default HisoryEvent;

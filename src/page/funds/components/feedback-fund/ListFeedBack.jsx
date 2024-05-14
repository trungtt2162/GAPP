import React, { useEffect, useState } from "react";
import {
  Card,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
  Grid
} from "@mui/material";
import { toast } from "react-toastify";
import moment from "moment";
import { USER_ROLE } from "../../../../constant/common";
import useAuthStore from "../../../../zustand/authStore";
import { fundApi } from "../../../../api/fund.api";
import { checkEmptyData, handleError } from "../../../../ultils/helper";
import CustomModal from "../../../../components/common/modal/CustomModal";
import AddSpend from "../list-fund-admin/AddSpend";
import { feedbackApi } from "../../../../api/feedback.api";
import FeedBackItem from "./FeedBackItem";
import FeedBackFund from "./FeedBackFund";
const ListFeedback = () => {
  const [fundId, setFundId] = useState("");
  const [page, setPage] = React.useState(0);
  const [ListSend, setListSend] = useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { currentIdGenealogy } = useAuthStore();
  const [listFund, setListFund] = useState([]);
  const [currentItem, setCurrentItem] = useState(null);
  const { isLogin, roleCode } = useAuthStore();

  const isSiteAdmin = isLogin && roleCode === USER_ROLE.SiteAdmin;
  const isSupperAdmin = isLogin && roleCode === USER_ROLE.SupperAdmin;
  const isPeopleAdmin = isLogin && roleCode === USER_ROLE.PeopleAdmin;

  const isUser = isLogin && roleCode === USER_ROLE.User;
  const isMember = isUser || isSiteAdmin || isPeopleAdmin;
  const [ListFeed,setListFeed] = useState([])
  // Hàm xử lý thay đổi trang
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const getListFeedBack = async () => {
    try {
      const res = await feedbackApi.getListFeedBackByGeneAndFund(currentIdGenealogy, fundId);
      setListFeed(res.data.Data.Data || []);
    } catch (error) {
      handleError(error);
    }
  };

  const getListFund = async () => {
    try {
      const res = await fundApi.getlistFund(currentIdGenealogy);
      if (res.data.StatusCode === 200) {
        setListFund(res.data.Data.Data || []);
      }
    } catch (error) {
      handleError(error);
    }
  };
  useEffect(() => {
    if (currentIdGenealogy) {
      getListFund();
    }
  }, [currentIdGenealogy]);

  // delete
  const handleDelete = async (row) => {
    try {
      const res = await fundApi.deleteFundSend(row.Id, currentIdGenealogy);
      if (res.data.StatusCode === 200) {
        setListSend(ListSend.filter((i) => i.Id !== row.Id));
        toast.success("Xóa thành công");
      }
    } catch (error) {
      handleError(error);
    }
  };

  //
  const onClose = () => {
    setCurrentItem(null);
  };

  const setNewList = async (item) => {
    await getListFeedBack();
    onClose();
  };

  //
  const refreshList = async() => {
    await getListFeedBack()
  }

  return (
    <div>
      <h4>Danh sách người góp ý</h4>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 20,
          marginBottom: 20,
        }}
        className="funddetail-wrap "
      >
        <FormControl>
          <InputLabel id="select-label">Quỹ</InputLabel>
          <Select
            style={{
              width: 500,
              marginRight: 20,
            }}
            labelId="select-label"
            id="select"
            value={fundId}
            onChange={(e) => setFundId(e.target.value)}
            label="Quỹ"
          >
            {listFund.map((i) => (
              <MenuItem value={i.Id}>{i.Name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          variant="contained"
          onClick={async () => {
            if (fundId) {
              getListFeedBack();
            }
          }}
        >
          Tìm kiếm
        </Button>
      </div>

   {ListFeed.length > 0? <div>
    <p style={{ color: "black" }} className="bold">
        Danh sách
      </p>

      <Grid  container spacing={2}>
         {ListFeed.map(item => <Grid item xs={6}>
           <FeedBackItem item={item} setCurr = {() => setCurrentItem(item)} refreshList={refreshList} {...item} />
         </Grid>)}
      </Grid>
    </div>:<p>{checkEmptyData([])}</p>}
      
      <CustomModal open={currentItem} onClose={onClose}>
        <FeedBackFund setNewList={async() =>{
         await refreshList()
          onClose()
        }} item={currentItem} />
      </CustomModal>
    </div>
  );
};

export default ListFeedback;

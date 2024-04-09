import React, { useEffect, useState } from "react";
import { handleError } from "../../../../ultils/helper";
import { fundApi } from "../../../../api/fund.api";
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
} from "@mui/material";
import { toast } from "react-toastify";
import moment from "moment";
import useAuthStore from "../../../../zustand/authStore";
import CustomModal from "../../../../components/common/modal/CustomModal";
import AddDonateMember from "./AddDonatemember";
import AddSpend from "./AddSpend";
import { USER_ROLE } from "../../../../constant/common";
const ListSend = () => {
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
  // Hàm xử lý thay đổi trang
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const getListSends = async () => {
    try {
      const res = await fundApi.getListSendFund(currentIdGenealogy, fundId);
      setListSend(res.data.Data.Data || []);
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
    await getListSends();
    onClose();
  };
  return (
    <div>
      <h4>Danh sách người đóng góp</h4>
      <Card
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
              getListSends();
            }
          }}
        >
          Tìm kiếm
        </Button>
      </Card>

      <p style={{ color: "black" }} className="bold">
        Danh sách
      </p>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="text-center">Tên công việc</TableCell>
              <TableCell className="text-center">Số tiền đã chi</TableCell>
              <TableCell className="text-center">Thời gian</TableCell>
              {isSiteAdmin && (
                <TableCell className="text-center">Hành động</TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {ListSend.slice(
              page * rowsPerPage,
              page * rowsPerPage + rowsPerPage
            ).map((row) => (
              <TableRow key={row.id}>
                <TableCell className="text-center">{row.Description}</TableCell>
                <TableCell className="text-center">{row.Money}</TableCell>

                <TableCell className="text-center">
                  {row.CreatedDate &&
                    moment(row.CreatedDate).format("DD-MM-YYYY")}
                </TableCell>
                {isSiteAdmin && (
                  <TableCell className="text-center">
                    <Button
                      onClick={() => {
                        setCurrentItem(row);
                      }}
                      style={{
                        marginRight: 10,
                      }}
                      variant="contained"
                      color="success"
                    >
                      Sửa
                    </Button>
                    <Button
                      onClick={() => handleDelete(row)}
                      variant="contained"
                      color="error"
                    >
                      Xóa
                    </Button>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={ListSend.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
      />

      <CustomModal open={currentItem} onClose={onClose}>
        <AddSpend setNewList={setNewList} item={currentItem} />
      </CustomModal>
    </div>
  );
};

export default ListSend;

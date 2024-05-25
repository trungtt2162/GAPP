import React, { useEffect, useState } from "react";
import { checkEmptyData, handleError,formatMoney } from "../../../../ultils/helper";
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
import { USER_ROLE } from "../../../../constant/common";
const ListContributor = () => {
  const { isLogin, roleCode } = useAuthStore();
  const [currentImage,setCurrentImage] = useState(null);

  const isSiteAdmin = isLogin && roleCode === USER_ROLE.SiteAdmin;
  const isSupperAdmin = isLogin && roleCode === USER_ROLE.SupperAdmin;
  const isPeopleAdmin = isLogin && roleCode === USER_ROLE.PeopleAdmin;
  const isUser = isLogin && roleCode === USER_ROLE.User;
  const isMember = isUser || isSiteAdmin || isPeopleAdmin;
  const [fundId, setFundId] = useState("");
  const [page, setPage] = React.useState(0);
  const [listContributor, setListContributor] = useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { currentIdGenealogy } = useAuthStore();
  const [listFund, setListFund] = useState([]);
  const [currentItem, setCurrentItem] = useState(null);
  // Hàm xử lý thay đổi trang
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const getListContributors = async () => {
    try {
      const res = await fundApi.getListContributors(currentIdGenealogy, fundId);
      setListContributor(res.data.Data.Data || []);
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
      const res = await fundApi.deleteContributor(row.Id, currentIdGenealogy);
      if (res.data.StatusCode === 200) {
        setListContributor(listContributor.filter((i) => i.Id !== row.Id));
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

  const setNewList = async(item) => {
   await getListContributors();
    onClose();
  };
  return (
    <div>
      <h4>Danh sách người đóng góp</h4>
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
              getListContributors();
            }
          }}
        >
          Tìm kiếm
        </Button>
      </div>
     
        <p style={{color:"black"}} className="bold">Danh sách</p>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className="text-center">Tên</TableCell>
                <TableCell className="text-center">Email</TableCell>
                <TableCell className="text-center">Số tiền đóng góp</TableCell>
                <TableCell className="text-center">Ngày đóng góp</TableCell>
                <TableCell className="text-center">Hóa đơn</TableCell>
               {isSiteAdmin &&  <TableCell className="text-center">Hành động</TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {listContributor
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow key={row.id}>
                    <TableCell className="text-center">
                      {row.FirstName + " " + row.LastName}
                    </TableCell>
                    <TableCell className="text-center">{row.Email}</TableCell>

                    <TableCell className="text-center">{formatMoney(row.Money)}</TableCell>
                    <TableCell className="text-center">
                      {row.CreatedDate &&
                        moment(row.CreatedDate).format("DD-MM-YYYY")}
                    </TableCell>

                    <TableCell className="text-center">
                    {row.BillImage &&   <div onClick={() => setCurrentImage(row.BillImage)} style={{
                        cursor:"pointer",
                        color:"rgb(242, 184, 79)"
                       }}>Xem hóa đơn</div>}
                    </TableCell>
                  {isSiteAdmin &&   <TableCell className="text-center">
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
                    </TableCell>}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={listContributor.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
        />
      {checkEmptyData(listContributor)}
      <CustomModal  open={currentItem} onClose={onClose}>
        <AddDonateMember setNewList={setNewList} item={currentItem} />
      </CustomModal>
      <CustomModal open={currentImage} onClose={() => setCurrentImage(null)}>
       <div style={{
        display:"flex",
        justifyContent:'center'
       }}>
       <img src={currentImage} style={{
          width:500,
          height:"auto"
        }}  />
       </div>
      </CustomModal>
    </div>
  );
};

export default ListContributor;

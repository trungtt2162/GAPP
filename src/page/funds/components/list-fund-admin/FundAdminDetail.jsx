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
} from "@mui/material";

import React, { useEffect, useState } from "react";
import "./../list-fund-member/ListFund.scss";
import PrimaryButton from "../../../../components/common/button/PrimaryButton";
import { getQuery, handleError,formatMoney } from "../../../../ultils/helper";
import { fundApi } from "../../../../api/fund.api";
import { useLocation } from "react-router-dom";
import useAuthStore from "../../../../zustand/authStore";
import moment from "moment/moment";
import CustomModal from "../../../../components/common/modal/CustomModal";
const FundAdminDetail = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const location = useLocation();
  const { id } = getQuery();
  const { currentIdGenealogy } = useAuthStore();
const [currentImage,setCurrentImage] = useState(null);
  // Hàm xử lý thay đổi trang
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const [detailFund, setDetailFund] = useState({});
  const [listSpend, setListSpend] = useState([]);
  const [listContributor, setListContributor] = useState([]);

  // getFundDetail
  const getFundDetail = async () => {
    try {
      const [detailRes, fundContriRes, sendRes] = await Promise.all([
        fundApi.getFundDetail(id),
        fundApi.getListContributors(currentIdGenealogy, id),
        fundApi.getListSendFund(currentIdGenealogy, id),
      ]);
      setDetailFund(detailRes.data.Data);
      setListContributor(fundContriRes.data.Data.Data || []);
      setListSpend(sendRes.data.Data.Data);
    } catch (error) {
      handleError(error);
    }
  };
  useEffect(() => {
    if (id) {
      getFundDetail();
    }
  }, [id, location]);

  // total Contributor
  const totalContributor = listContributor.reduce((total, item) => {
    return total + (item.Money || 0);
  }, 0);
  const totalSend = listSpend.reduce((total, item) => {
    return total + (item.Money || 0);
  }, 0);
  return (
    <div>
      <h4 className="bold" style={{ marginBottom: 20 }}>
        {detailFund.Name}
      </h4>

      <Card className="funddetail-wrap">
        <p className="title bold">Số tiền dự tính</p>
        <p className="content">{formatMoney(detailFund.EstimatedMoney)} VND</p>
      </Card>

      <Card className="funddetail-wrap">
        <p className="title bold">Số tiền đã thu</p>
        <p className="content">{formatMoney(totalContributor)} VND</p>
      </Card>

      <Card className="funddetail-wrap">
        <p className="title bold">Số tiền đã chi</p>
        <p className="content">{formatMoney(totalSend)} VND</p>
      </Card>
      <Card className="funddetail-wrap">
        <p className="title bold">Số tiền hiện có</p>
        <p className="content">{formatMoney(totalContributor-totalSend)} VND</p>
      </Card>
      <Card className="funddetail-wrap">
        <p className="title bold">Nội dung</p>
        <p className="content">{detailFund.SpendPurpose}</p>
      </Card>
      <div className="funddetail-wrap vertical">
        <p className="bold">Danh sách đã chi</p>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className="text-center">Nội Dung</TableCell>
                <TableCell className="text-center">Số tiền đã chi</TableCell>
                <TableCell className="text-center">Thời gian</TableCell>
                <TableCell className="text-center">Hóa đơn</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listSpend
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow key={row.id}>
                    <TableCell className="text-center">
                      {row.Description}
                    </TableCell>
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
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={listSpend.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
        />
      </div>
      <div className="funddetail-wrap vertical">
        <p className="bold">Danh sách người góp quỹ</p>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className="text-center">Tên</TableCell>
                <TableCell className="text-center">Email</TableCell>
                <TableCell className="text-center">Số tiền đóng góp</TableCell>
                <TableCell className="text-center">Ngày đóng góp</TableCell>
                <TableCell className="text-center">Hóa đơn</TableCell>
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
                      {row.PaymentDate &&
                        moment(row.PaymentDate).format("DD-MM-YYYY")}
                    </TableCell>
                    <TableCell className="text-center">
                     {row.BillImage &&   <div onClick={() => setCurrentImage(row.BillImage)} style={{
                        cursor:"pointer",
                        color:"rgb(242, 184, 79)"
                       }}>Xem hóa đơn</div>}
                    </TableCell>
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
      </div>
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

export default FundAdminDetail;

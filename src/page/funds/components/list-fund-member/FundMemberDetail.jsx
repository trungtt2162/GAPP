import { Card } from "@mui/material";
import React, { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TablePagination,
    Button,
  } from "@mui/material";import "./ListFund.scss";
import { formatMoney } from "../../../../ultils/helper";
const FundDetail = () => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
  
    // Hàm xử lý thay đổi trang
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
  const [fundDetail, setFundDetail] = useState({
    title: "Quỹ A",
    description: "Chi tiết quỹ A",
    tottal: 30000,
    listMember: [
      {
        name: "Nguyễn Văn A",
        birthdate: "01/01/1990",
        email: "nguyenvana@example.com",
        address: "Hà Nội",
        gender: "Nam",
        fund: "100000",
      },
      {
        name: "Nguyễn Văn A",
        birthdate: "01/01/1990",
        email: "nguyenvana@example.com",
        address: "Hà Nội",
        gender: "Nam",
        fund: "100000",
      },
      {
        name: "Nguyễn Văn A",
        birthdate: "01/01/1990",
        email: "nguyenvana@example.com",
        address: "Hà Nội",
        gender: "Nam",
        fund: "100000",
      },
    ],
  });

  return (
    <div>
      <h4 className="bold" style={{ marginBottom: 20 }}>
        {fundDetail.title}
      </h4>

      <Card className="funddetail-wrap">
        <p className="title bold">Số tiền</p>
        <p className="content">{fundDetail.tottal} VND</p>
      </Card>
      <Card className="funddetail-wrap">
        <p className="title bold">Nội dung</p>
        <p className="content">{fundDetail.description} VND</p>
      </Card>
      <Card className="funddetail-wrap vertical">
        <p className="bold">Danh sách người góp quỹ</p>
        <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className='text-center'>Tên</TableCell>
              <TableCell className='text-center'>Email</TableCell>
              <TableCell className='text-center'>Ngày sinh</TableCell>
              <TableCell className='text-center'>Giới tính</TableCell>
              <TableCell className='text-center'>Số tiền đóng góp</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {fundDetail.listMember.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow key={row.id}>
                <TableCell className='text-center'>{row.name}</TableCell>
                <TableCell className='text-center'>
                {row.email}
                </TableCell>
                <TableCell className='text-center'>
                {row.birthdate}
                </TableCell>
                <TableCell className='text-center'>
                {row.gender}
                </TableCell>
                <TableCell className='text-center'>
                {formatMoney(row.fund)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={fundDetail.listMember.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
      />
      </Card>
    </div>
  );
};

export default FundDetail;

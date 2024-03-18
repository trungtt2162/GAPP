import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import PrimaryButton from '../../../../../components/common/button/PrimaryButton';

function ListMember({setValue=() => {}}) {
     const users = [
        {
          name: 'Nguyễn Văn A',
          birthdate: '01/01/1990',
          email: 'nguyenvana@example.com',
          address: 'Hà Nội',
          gender: 'Nam',
        },
        {
          name: 'Trần Thị B',
          birthdate: '05/05/1985',
          email: 'tranthib@example.com',
          address: 'Hồ Chí Minh',
          gender: 'Nữ',
        },
        {
          name: 'Phạm Văn C',
          birthdate: '10/10/1995',
          email: 'phamvanc@example.com',
          address: 'Đà Nẵng',
          gender: 'Nam',
        },
      ];
  return (
   <div>
   <div className='flex-start' style={{
    marginBottom:10
   }}>
   </div>
     <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Tên</TableCell>
            <TableCell>Ngày Sinh</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Địa Chỉ</TableCell>
            <TableCell>Giới Tính</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user, index) => (
            <TableRow key={index}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.birthdate}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.address}</TableCell>
              <TableCell>{user.gender}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
   </div>
  );
}

export default ListMember;


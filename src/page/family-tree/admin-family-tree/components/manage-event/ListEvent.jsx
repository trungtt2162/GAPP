import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

function ListEvent() {
     const users = [
        {
            eventName: 'Even1',
            eventDate: '12-12-2022',
            eventMode: 'Public-online',
        },
        {
            eventName: 'Even1',
            eventDate: '12-12-2022',
            eventMode: 'Public-online',
        },
        {
            eventName: 'Even1',
            eventDate: '12-12-2022',
            eventMode: 'Public-online',
        },
        
      ];
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Tên sự kiện</TableCell>
            <TableCell>Ngày tổ chức</TableCell>
            <TableCell>Chế độ</TableCell>
            <TableCell className='text-center'>Hành động</TableCell>

            
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user, index) => (
            <TableRow key={index}>
              <TableCell>{user.eventName}</TableCell>
              <TableCell>{user.eventDate}</TableCell>
              <TableCell>{user.eventMode}</TableCell>
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
                <Button variant="contained" color="error">
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

export default ListEvent;


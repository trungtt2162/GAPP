import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import TabSidebar from '../../../../../components/common/tabs/TabSidebar';
import ButtonTab from '../../../../../components/common/button/ButtonTab';

function LogManage() {
     const users = [
        {
          time: '17-3-2014',
          action: 'Thêm',
          admin_name: 'Admin1',
         
        },
        {
            time: '18-3-2024',
            action: 'Sửa',
            admin_name: 'Admin1',
           
          },
          {
            time: '19-3-2024',
            action: 'Xóa',
            admin_name: 'Admin1',
           
          },
          {
            time: '20-3-2024',
            action: '01/01/1990',
            admin_name: 'Admin1',
           
          },
          {
            time: '21-3-2024',
            action: '01/01/1990',
            admin_name: 'Admin1',
           
          },
        
      ];
  return (
    <div>
       <div className='flex-center' style={{
        marginBottom:20
       }}>
       <ButtonTab
          index={1}
          value={1}
          text={"Quản lý log"}
          onClick={(e) => {}}
        />
       </div>
        <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Thời gian</TableCell>
            <TableCell>Hành động</TableCell>
            <TableCell>Admin thực hiện</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user, index) => (
            <TableRow key={index}>
              <TableCell>{user.time}</TableCell>
              <TableCell>{user.action}</TableCell>
              <TableCell>{user.admin_name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}

export default LogManage;


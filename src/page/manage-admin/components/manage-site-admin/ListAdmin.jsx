import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';

// Dữ liệu mẫu
const rows = [
  { id: 1, name: 'Nguyen Van A', familyTreeLink: 'https://example.com/family-tree-1' },
  { id: 2, name: 'Tran Thi B', familyTreeLink: 'https://example.com/family-tree-2' },
  { id: 3, name: 'Le Van C', familyTreeLink: 'https://example.com/family-tree-3' },
  { id: 4, name: 'Pham Thi D', familyTreeLink: 'https://example.com/family-tree-4' },
  { id: 5, name: 'Hoang Van E', familyTreeLink: 'https://example.com/family-tree-5' },
  { id: 6, name: 'Vo Thi F', familyTreeLink: 'https://example.com/family-tree-6' },
  { id: 7, name: 'Nguyen Van G', familyTreeLink: 'https://example.com/family-tree-7' },
  { id: 8, name: 'Tran Thi H', familyTreeLink: 'https://example.com/family-tree-8' },
  { id: 9, name: 'Le Van I', familyTreeLink: 'https://example.com/family-tree-9' },
  { id: 10, name: 'Pham Thi K', familyTreeLink: 'https://example.com/family-tree-10' },
];

function ListAdmin() {
  // State cho việc phân trang
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // Hàm xử lý thay đổi trang
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className='text-center'>Tên</TableCell>
              <TableCell className='text-center'>Link gia phả</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow key={row.id}>
                <TableCell className='text-center'>{row.name}</TableCell>
                <TableCell className='text-center'>
                  <a href={row.familyTreeLink} target="_blank" rel="noopener noreferrer">Xem gia phả</a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
      />
    </div>
  );
}

export default ListAdmin;
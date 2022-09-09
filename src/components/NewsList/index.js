import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import News from '../News';

const NewsList = () => {
  return (
    <>
      <TableContainer>
        <Table style={{ margin: 'auto', width: '80%', marginTop: '20px' }}>
          <TableHead>
            <TableRow>
              <TableCell align="left">Article Name</TableCell>
              <TableCell align="left">Author Name</TableCell>
              <TableCell align="left">Author Email</TableCell>
              <TableCell align="left">Author Phone</TableCell>
              <TableCell align="left">Publication Category</TableCell>
              <TableCell align="left">Publication Date</TableCell>
              <TableCell align="left"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <News />
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default NewsList;

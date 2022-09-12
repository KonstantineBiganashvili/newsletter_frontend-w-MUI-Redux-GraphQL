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

import AppPagination from '../AppPagiantion';
import useStyles from '../../styles/tableStyles';

const NewsList = () => {
  const classes = useStyles();

  return (
    <>
      <TableContainer>
        <Table className={classes.tableContainer}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }} align="left">
                Article Name
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} align="left">
                Author Name
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} align="left">
                Author Email
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} align="left">
                Author Phone
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} align="left">
                Publication Category
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} align="left">
                Publication Date
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} align="left"></TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} align="left"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <News />
          </TableBody>
        </Table>
      </TableContainer>
      <AppPagination />
    </>
  );
};

export default NewsList;

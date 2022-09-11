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
      <AppPagination />
    </>
  );
};

export default NewsList;

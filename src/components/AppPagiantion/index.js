import { Pagination } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { paginationActions } from '../../store/pagiantion-slice';
import useStyles from '../../styles/paginationStyle';

const AppPagination = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handlePagination = (e, page) => {
    dispatch(paginationActions.changePage(page));
  };

  return (
    <Pagination
      className={classes.pagination}
      count={10}
      variant="outlined"
      onChange={handlePagination}
    />
  );
};

export default AppPagination;

import { useQuery } from '@apollo/client';
import { Pagination } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GET_ARTICLE_COUNT } from '../../services/queries/articleQueries';
import { paginationActions } from '../../store/pagiantion-slice';
import useStyles from '../../styles/paginationStyle';

const AppPagination = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { pageCount } = useSelector((state) => state.pagination);
  const { filterDate } = useSelector((state) => state.filter);

  const handlePagination = (e, page) => {
    dispatch(paginationActions.changePage(page));
  };

  const { loading, error, data } = useQuery(GET_ARTICLE_COUNT, {
    variables: { startDate: filterDate.from, endDate: filterDate.to },
  });

  useEffect(() => {
    !loading &&
      !error &&
      dispatch(
        paginationActions.changePageCount(Math.ceil(data.articlesCount / 10))
      );
  }, [data, dispatch, error, loading]);

  return (
    <Pagination
      className={classes.pagination}
      count={pageCount}
      variant="outlined"
      onChange={handlePagination}
    />
  );
};

export default AppPagination;

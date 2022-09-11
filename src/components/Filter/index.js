import React from 'react';
import { useQuery } from '@apollo/client';
import { Button, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { GET_FILTERED_ARTICLES } from '../../services/queries/articleQueries';
import { articlesActions } from '../../store/articles-slice';
import { filterActions } from '../../store/filter-slice';

const Filter = () => {
  const dispatch = useDispatch();

  const filterDate = useSelector((state) => state.filter.filterDate);
  const openFilter = useSelector((state) => state.filter.openFilter);

  const { loading, error, data } = useQuery(GET_FILTERED_ARTICLES, {
    variables: { startDate: filterDate.from, endDate: filterDate.to },
  });

  const handleSetFilter = (name, data) => {
    dispatch(filterActions.setFilterDate({ name, data }));
  };

  const handleOpenFilter = (data) => {
    dispatch(filterActions.setOpenFilter(data));
  };

  const handleFilter = () => {
    !loading &&
      !error &&
      dispatch(articlesActions.setArticles(data.articlesFilterdByDate));
  };

  return (
    <>
      {openFilter ? (
        <>
          <TextField
            label="FROM"
            InputLabelProps={{ shrink: true }}
            type="date"
            value={filterDate.from}
            onChange={({ target }) => handleSetFilter('from', target.value)}
          />

          <TextField
            label="TO"
            InputLabelProps={{ shrink: true }}
            type="date"
            value={filterDate.to}
            onChange={({ target }) => handleSetFilter('to', target.value)}
          />

          <Button variant="outlined" onClick={() => handleFilter()}>
            Filter
          </Button>

          <Button variant="outlined" onClick={() => handleOpenFilter(false)}>
            Clear
          </Button>
        </>
      ) : (
        <Button variant="outlined" onClick={() => handleOpenFilter(true)}>
          Filter
        </Button>
      )}
    </>
  );
};

export default Filter;

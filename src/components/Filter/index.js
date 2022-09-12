import React from 'react';
import { useQuery } from '@apollo/client';
import { Button, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { GET_ARTICLES } from '../../services/queries/articleQueries';
import { articlesActions } from '../../store/articles-slice';
import { filterActions } from '../../store/filter-slice';

const Filter = () => {
  const page = useSelector((state) => state.pagination.page) || 1;
  const dispatch = useDispatch();

  const filterDate = useSelector((state) => state.filter.filterDate);
  const openFilter = useSelector((state) => state.filter.openFilter);

  const { loading, error, data } = useQuery(GET_ARTICLES, {
    variables: { limit: '10', offset: String((page - 1) * 10) },
  });

  const handleSetFilter = (name, data) => {
    dispatch(filterActions.setFilterDate({ name, data }));
  };

  const handleOpenFilter = (state) => {
    !openFilter
      ? dispatch(filterActions.setOpenFilter(state))
      : !loading &&
        !error &&
        dispatch(filterActions.setOpenFilter(state)) &&
        dispatch(filterActions.setFilterDate({ from: '', to: '' })) &&
        dispatch(articlesActions.setArticles(data.articlesWithLimit));
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

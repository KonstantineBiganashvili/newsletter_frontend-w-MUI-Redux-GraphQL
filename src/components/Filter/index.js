import { useQuery } from '@apollo/client';
import { Button, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { GET_FILTERED_ARTICLES } from '../../services/queries/articleQueries';
import { articlesActions } from '../../store/articles-slice';

const Filter = () => {
  const [openFilter, setOpenFilter] = useState(false);
  const [filterDate, setFilterDate] = useState({ from: '', to: '' });

  const dispatch = useDispatch;

  const { loading, error, data } = useQuery(GET_FILTERED_ARTICLES, {
    variables: { startDate: filterDate.from, endDate: filterDate.to },
  });

  useEffect(() => {
    !loading &&
      !error &&
      dispatch(articlesActions.setArticles(data.articlesFilterdByDate)) &&
      setFilterDate({ from: '', to: '' });
  }, [filterDate]);

  return (
    <>
      {openFilter ? (
        <>
          <TextField
            label="FROM"
            InputLabelProps={{ shrink: true }}
            type="date"
            value={filterDate.from}
            onChange={({ target }) =>
              setFilterDate((oldFilterDate) => ({
                ...oldFilterDate,
                from: target.value,
              }))
            }
          />

          <TextField
            label="TO"
            InputLabelProps={{ shrink: true }}
            type="date"
            value={filterDate.to}
            onChange={({ target }) =>
              setFilterDate((oldFilterDate) => ({
                ...oldFilterDate,
                to: target.value,
              }))
            }
          />

          <Button
            variant="outlined"
            onClick={() => setOpenFilter((oldOpenFilter) => !oldOpenFilter)}
          >
            Clear
          </Button>
        </>
      ) : (
        <Button
          variant="outlined"
          onClick={() => setOpenFilter((oldOpenFilter) => !oldOpenFilter)}
        >
          Filter
        </Button>
      )}
    </>
  );
};

export default Filter;

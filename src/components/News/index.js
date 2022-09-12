import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { TableCell, TableRow } from '@mui/material';
import useStyles from '../../styles/tableStyles';
import { GET_ARTICLES } from '../../services/queries/articleQueries';
import { useDispatch, useSelector } from 'react-redux';
import { articlesActions } from '../../store/articles-slice';
import ReadMore from '../ReadMoreModal';
import { Box } from '@mui/system';
import DeleteModal from '../DeleteModal';
import EditModal from '../EditModal';

const News = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const page = useSelector((state) => state.pagination.page) || 1;
  const filterDate = useSelector((state) => state.filter.filterDate);

  const { loading, error, data } = useQuery(GET_ARTICLES, {
    variables: {
      limit: '10',
      offset: String((page - 1) * 10),
      startDate: filterDate.from,
      endDate: filterDate.to,
    },
  });

  const { articles } = useSelector((state) => state.articles);

  useEffect(() => {
    !loading &&
      !error &&
      dispatch(articlesActions.setArticles(data.articlesWithLimit));
  }, [data, dispatch, error, loading]);

  return (
    <>
      {!loading &&
        !error &&
        articles.map((article) => (
          <TableRow key={article.id}>
            <TableCell>
              <div className={classes.tableCell}>{article.title}</div>
            </TableCell>

            <TableCell>
              <div className={classes.tableCell}>
                {article.name}&nbsp;{article.surname}
              </div>
            </TableCell>
            <TableCell>
              <div className={classes.tableCell}>{article.email}</div>
            </TableCell>
            <TableCell>
              <div className={classes.tableCell}>{article.phone}</div>
            </TableCell>
            <TableCell>
              <div className={classes.tableCell}>{article.category.name}</div>
            </TableCell>
            <TableCell>
              <div className={classes.tableCell}>{article.date}</div>
            </TableCell>
            <TableCell>
              <ReadMore id={article.id} article={article} />
            </TableCell>
            <TableCell>
              <Box display="flex" gap="10px">
                <EditModal id={article.id} article={article} />
                <DeleteModal id={article.id} />
              </Box>
            </TableCell>
          </TableRow>
        ))}
    </>
  );
};

export default News;

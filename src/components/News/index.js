import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { Button, TableCell, TableRow } from '@mui/material';
import useStyles from '../../styles/tableStyles';
import { GET_ARTICLES } from '../../services/queries/articleQueries';
import { useDispatch, useSelector } from 'react-redux';
import { articlesActions } from '../../store/articles-slice';

const News = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { loading, error, data } = useQuery(GET_ARTICLES, {
    variables: { limit: '10', offset: '0' },
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
              <Button>Read More</Button>
            </TableCell>
          </TableRow>
        ))}
    </>
  );
};

export default News;

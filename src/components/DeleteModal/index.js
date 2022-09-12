import { useMutation } from '@apollo/client';
import { Button, Modal, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DELETE_ARTICLE } from '../../services/mutations/deleteArticle';
import { articlesActions } from '../../store/articles-slice';
import { modalsActions } from '../../store/modals-slice';
import useStyles from '../../styles/modalStyles';

const DeleteModal = (props) => {
  const { id } = props;
  const { deleteModal } = useSelector((state) => state.modals);
  const { filterDate } = useSelector((state) => state.filter);
  const page = useSelector((state) => state.pagination.page) || 1;
  const dispatch = useDispatch();

  const classes = useStyles();

  const handleDeleteModal = (id, open) => {
    dispatch(modalsActions.setDeleteModal({ id: id, open: open }));
  };

  const [confirmDelete, { loading, error, data }] = useMutation(
    DELETE_ARTICLE,
    {
      variables: {
        id: Number(id),
        limit: '10',
        offset: String((page - 1) * 10),
        startDate: filterDate.from,
        endDate: filterDate.to,
      },
    }
  );

  const handleConfirmDelete = () => {
    confirmDelete();
  };

  useEffect(() => {
    !loading &&
      !error &&
      typeof data === 'object' &&
      dispatch(articlesActions.setArticles(data.removeArticle)) &&
      dispatch(modalsActions.setDeleteModal({ id: ' ', open: false }));
  }, [data, dispatch, error, loading]);

  return deleteModal.id !== id ? (
    <Button
      variant="contained"
      color="error"
      onClick={() => handleDeleteModal(id, true)}
    >
      Delete
    </Button>
  ) : (
    <>
      <Button variant="contained" color="error">
        Delete
      </Button>
      <Modal open={deleteModal.id === id}>
        <Box className={classes.modalBoxContainer}>
          <Typography>Are you sure you want to delete this article?</Typography>
          <Box display="flex" gap="40px">
            <Button
              variant="contained"
              color="success"
              onClick={() => handleDeleteModal(' ', false)}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleConfirmDelete}
            >
              Confirm
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default DeleteModal;

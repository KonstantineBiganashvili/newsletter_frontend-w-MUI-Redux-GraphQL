import { useMutation } from '@apollo/client';
import { Button, MenuItem, Modal, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EDIT_ARTICLE } from '../../services/mutations/editArticle';
import useValidation from '../../helpers/useValidation';
import { modalsActions } from '../../store/modals-slice';
import useStyles from '../../styles/modalStyles';
import { articlesActions } from '../../store/articles-slice';

const EditModal = (props) => {
  const { id, article } = props;
  const [openEditModal, setOpenEditModal] = useState(false);
  const classes = useStyles();
  const { editInputs } = useSelector((state) => state.modals);
  const { categories } = useSelector((state) => state.articles);
  const dispatch = useDispatch();
  const validation = useValidation(editInputs);
  const { filterDate } = useSelector((state) => state.filter);
  const page = useSelector((state) => state.pagination.page) || 1;

  const handleChange = (name, value) => {
    dispatch(modalsActions.setEditInputs({ name, value }));
  };

  const [editArticle, { loading, error, data }] = useMutation(EDIT_ARTICLE, {
    variables: {
      id: Number(id),
      title: editInputs.title,
      name: editInputs.name,
      surname: editInputs.surname,
      phone: editInputs.phone,
      email: editInputs.email,
      date: editInputs.date,
      categoryId: Number(editInputs.categoryId),
      content: editInputs.content,
      startDate: filterDate.from,
      endDate: filterDate.to,
      limit: '10',
      offset: String((page - 1) * 10),
    },
  });

  const confirmEdit = () => {
    if (!(Object.keys(validation).length > 0)) {
      editArticle();

      dispatch(
        modalsActions.clearInput({
          title: '',
          categoryId: '',
          name: '',
          surname: '',
          email: '',
          phone: '',
          date: '',
          content: '',
        })
      );

      setOpenEditModal(false);
    }
  };

  useEffect(() => {
    openEditModal &&
      dispatch(
        modalsActions.setInitialEditValues({
          title: article.title,
          categoryId: article.category.id,
          name: article.name,
          surname: article.surname,
          email: article.email,
          phone: article.phone,
          content: article.content,
          date: article.date,
        })
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openEditModal]);

  useEffect(() => {
    !error &&
      !loading &&
      typeof data === 'object' &&
      dispatch(articlesActions.setArticles(data.editArticle));
  }, [data, dispatch, error, loading]);

  return (
    <Box>
      <Button
        variant="contained"
        color="info"
        onClick={() => setOpenEditModal(true)}
      >
        Edit
      </Button>

      <Modal open={openEditModal} onClose={() => setOpenEditModal(false)}>
        <Box className={classes.modalBoxContainer}>
          <Typography variant="h3" color="#1976d2">
            Add New Article
          </Typography>
          <TextField
            required
            label="Name of the article"
            variant="outlined"
            className={classes.inputFields}
            type="text"
            value={editInputs.title}
            onChange={({ target }) => handleChange('title', target.value)}
            helperText={validation.title || ''}
          />

          <TextField
            required
            label="Category"
            variant="outlined"
            className={classes.inputFields}
            select
            value={editInputs.categoryId}
            onChange={({ target }) => handleChange('categoryId', target.value)}
            helperText={validation.category || ''}
          >
            {categories.map((category) => {
              return (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              );
            })}
          </TextField>

          <Box className={classes.inputFieldsContainer}>
            <TextField
              required
              label="Name of the author"
              variant="outlined"
              type="text"
              className={classes.containedInputFields}
              value={editInputs.name}
              onChange={({ target }) => handleChange('name', target.value)}
              helperText={validation.name || ''}
            />
            <TextField
              required
              label="Surname of the author"
              variant="outlined"
              type="text"
              className={classes.containedInputFields}
              value={editInputs.surname}
              onChange={({ target }) => handleChange('surname', target.value)}
              helperText={validation.surname || ''}
            />
          </Box>

          <Box
            style={{ display: 'flex', justifyContent: 'space-between' }}
            className={classes.inputFields}
          >
            <TextField
              required
              label="Email"
              variant="outlined"
              type="mail"
              className={classes.containedInputFields}
              value={editInputs.email}
              onChange={({ target }) => handleChange('email', target.value)}
              helperText={validation.email || ''}
            />

            <TextField
              required
              label="Phone number"
              variant="outlined"
              type="number"
              className={classes.containedInputFields}
              value={editInputs.phone}
              onChange={({ target }) => handleChange('phone', target.value)}
              helperText={validation.phone || ''}
            />
          </Box>

          <TextField
            required
            label="Date of publication"
            className={classes.inputFields}
            InputLabelProps={{ shrink: true }}
            type="date"
            value={editInputs.date}
            onChange={({ target }) => handleChange('date', target.value)}
            helperText={validation.date || ''}
          />

          <TextField
            required
            label="Content of the article"
            variant="outlined"
            className={classes.inputFields}
            multiline
            rows={5}
            value={editInputs.content}
            onChange={({ target }) => handleChange('content', target.value)}
            helperText={validation.content || ''}
          />
          <Box className={classes.buttonsContainer}>
            <Button
              variant="contained"
              color="error"
              onClick={() => setOpenEditModal(false)}
            >
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={confirmEdit}>
              Edit
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default EditModal;

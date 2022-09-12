import React, { useEffect, useState } from 'react';
import useStyles from '../../styles/modalStyles';
import {
  Box,
  Button,
  MenuItem,
  Modal,
  TextField,
  Typography,
} from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import { modalsActions } from '../../store/modals-slice';
import { useMutation, useQuery } from '@apollo/client';
import { GET_CATEGORIES } from '../../services/queries/categoriesQueries';
import { ADD_ARTICLE } from '../../services/mutations/addArticle';
import useValidation from '../../helpers/useValidation';
import { articlesActions } from '../../store/articles-slice';

const AddModal = () => {
  const [open, setOpen] = useState(false);
  const { inputs } = useSelector((state) => state.modals);
  const { filterDate } = useSelector((state) => state.filter);
  const { categories } = useSelector((state) => state.articles);
  const page = useSelector((state) => state.pagination.page) || 1;

  const dispatch = useDispatch();
  const validation = useValidation(inputs);

  const handleChange = (name, value) => {
    dispatch(modalsActions.setInput({ name, value }));
  };

  const { loading, error, data } = useQuery(GET_CATEGORIES);

  const classes = useStyles();

  const handleOpen = () => {
    setOpen((oldOpen) => !oldOpen);
  };

  const [addArticle, { loading: addLoading, error: addError, data: addData }] =
    useMutation(ADD_ARTICLE, {
      variables: {
        title: inputs.title,
        name: inputs.name,
        surname: inputs.surname,
        phone: inputs.phone,
        email: inputs.email,
        date: inputs.date,
        categoryId: inputs.categoryId,
        content: inputs.content,
        startDate: filterDate.from,
        endDate: filterDate.to,
        limit: '10',
        offset: String((page - 1) * 10),
      },
    });

  useEffect(() => {
    !addLoading &&
      !addError &&
      typeof addData === 'object' &&
      dispatch(articlesActions.addArticle(addData.addArticle));
  }, [addData, addError, addLoading, dispatch]);

  useEffect(() => {
    !loading &&
      !error &&
      dispatch(articlesActions.setCategories(data.categories));
  });

  const submitArticle = () => {
    if (!(Object.keys(validation).length > 0)) {
      addArticle();

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

      setOpen((oldOpen) => !oldOpen);
    }
  };

  return (
    <Box>
      <Button onClick={handleOpen} variant="contained">
        Add Article
      </Button>

      <Modal open={open} onClose={handleOpen}>
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
            value={inputs.title}
            onChange={({ target }) => {
              handleChange('title', target.value);
            }}
            helperText={validation.title || ''}
          />

          <TextField
            required
            label="Category"
            variant="outlined"
            className={classes.inputFields}
            select
            value={inputs.categoryId}
            onChange={({ target }) => {
              handleChange('categoryId', Number(target.value));
            }}
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
              value={inputs.name}
              onChange={({ target }) => {
                handleChange('name', target.value);
              }}
              helperText={validation.name || ''}
              className={classes.containedInputFields}
            />
            <TextField
              required
              label="Surname of the author"
              variant="outlined"
              type="text"
              value={inputs.surname}
              onChange={({ target }) => {
                handleChange('surname', target.value);
              }}
              helperText={validation.surname || ''}
              className={classes.containedInputFields}
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
              value={inputs.email}
              onChange={({ target }) => {
                handleChange('email', target.value);
              }}
              helperText={validation.email || ''}
              className={classes.containedInputFields}
            />

            <TextField
              required
              label="Phone number"
              variant="outlined"
              type="number"
              value={inputs.phone}
              onChange={({ target }) => {
                handleChange('phone', target.value);
              }}
              helperText={validation.phone || ''}
              className={classes.containedInputFields}
            />
          </Box>

          <TextField
            required
            label="Date of publication"
            className={classes.inputFields}
            InputLabelProps={{ shrink: true }}
            type="date"
            value={inputs.date}
            onChange={({ target }) => {
              handleChange('date', target.value);
            }}
            helperText={validation.date || ''}
          />

          <TextField
            required
            label="Content of the article"
            variant="outlined"
            className={classes.inputFields}
            multiline
            rows={5}
            value={inputs.content}
            onChange={({ target }) => {
              handleChange('content', target.value);
            }}
            helperText={validation.content || ''}
          />
          <Box className={classes.buttonsContainer}>
            <Button variant="contained" color="error" onClick={handleOpen}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={submitArticle}>
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default AddModal;

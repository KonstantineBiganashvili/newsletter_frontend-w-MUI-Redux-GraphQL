import React, { useState } from 'react';
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
import { GET_ARTICLES } from '../../services/queries/articleQueries';

const AddModal = () => {
  const [open, setOpen] = useState(false);
  const { inputs } = useSelector((state) => state.modals);
  const dispatch = useDispatch();

  const handleChange = (name, value) => {
    dispatch(modalsActions.setInput({ name, value }));
  };

  const { loading, error, data } = useQuery(GET_CATEGORIES);

  const classes = useStyles();

  const handleOpen = () => {
    setOpen((oldOpen) => !oldOpen);
  };

  const [addArticle] = useMutation(ADD_ARTICLE, {
    variables: {
      title: inputs.title,
      name: inputs.name,
      surname: inputs.surname,
      phone: inputs.phone,
      email: inputs.email,
      date: inputs.date,
      categoryId: inputs.categoryId,
      content: inputs.content,
    },

    update(cache, { data: { addArticle } }) {
      const { articles } = cache.readQuery({ query: GET_ARTICLES });

      cache.writeQuery({
        query: GET_ARTICLES,
        data: { articles: [...articles, addArticle] },
      });
    },
  });

  const submitArticle = () => {
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
          >
            {!loading &&
              !error &&
              data.categories.map((category) => {
                return (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                );
              })}
          </TextField>

          <TextField
            required
            label="Name of the author"
            variant="outlined"
            className={classes.inputFields}
            type="text"
            value={inputs.name}
            onChange={({ target }) => {
              handleChange('name', target.value);
            }}
          />

          <TextField
            required
            label="Surname of the author"
            variant="outlined"
            className={classes.inputFields}
            type="text"
            value={inputs.surname}
            onChange={({ target }) => {
              handleChange('surname', target.value);
            }}
          />

          <TextField
            required
            label="Email"
            variant="outlined"
            className={classes.inputFields}
            type="mail"
            value={inputs.email}
            onChange={({ target }) => {
              handleChange('email', target.value);
            }}
          />

          <TextField
            required
            label="Phone number"
            variant="outlined"
            className={classes.numberInputs}
            type="number"
            value={inputs.phone}
            onChange={({ target }) => {
              handleChange('phone', target.value);
            }}
          />

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

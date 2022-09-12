import {
  Button,
  Modal,
  Typography,
  Box,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { modalsActions } from '../../store/modals-slice';
import useStyles from '../../styles/modalStyles';

const ReadMore = (props) => {
  const { id, article } = props;
  const { readMoreModal } = useSelector((state) => state.modals);
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleOpenModal = (id, open) => {
    dispatch(modalsActions.setOpenMoreModal({ id: id, open: open }));
  };

  return readMoreModal.id !== id ? (
    <Button variant="outlined" onClick={() => handleOpenModal(id, true)}>
      Read More
    </Button>
  ) : (
    <>
      <Button variant="outlined">Read More</Button>

      <Modal
        open={readMoreModal.open}
        onClose={() => handleOpenModal(' ', false)}
      >
        <Box className={classes.modalBoxContainer}>
          <Typography variant="h4" color="#1976d2">
            {article.title}
          </Typography>
          <Box className={classes.readMore}>
            <Table style={{ width: '40%' }}>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Typography>Name:</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>
                      {article.name} {article.surname}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography>Author Email:</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{article.email}</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography>Author Number:</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{article.phone}</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography>Category:</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{article.category.name}</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography>Publication Date:</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{article.date}</Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <Typography mt={2}>{article.content}</Typography>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default ReadMore;

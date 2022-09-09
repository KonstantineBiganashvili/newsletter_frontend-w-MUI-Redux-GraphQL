import React from 'react';
import { makeStyles } from '@mui/styles';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: 'none',
    margin: 'auto',
  },

  title: {
    cursor: 'pointer',
    color: '#fff',
    textAlign: 'center',
    fontSize: '50px !important',
  },
}));

const Header = () => {
  const classes = useStyles();

  return (
    <AppBar position="fixed" variant="h1">
      <Toolbar>
        <Link to="/" className={classes.link}>
          <Typography className={classes.title}>Newsletter</Typography>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

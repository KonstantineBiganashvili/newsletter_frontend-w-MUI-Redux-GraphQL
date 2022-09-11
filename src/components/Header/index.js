import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import useStyles from '../../styles/headerStyles';

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

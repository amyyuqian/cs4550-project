import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';

class Navbar extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar>
          <Toolbar>
            <Typography className={classes.flex} variant="title" color="inherit">
              Shiba Town
            </Typography>
            <div className="">
              <Button color="inherit">Login</Button>
              <Button color="inherit">Register</Button>
              <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                <AccountCircle />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navbar);
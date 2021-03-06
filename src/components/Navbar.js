import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { Link } from "react-router-dom";

class Navbar extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar>
          <Toolbar>
            <Typography
              className={classes.flex}
              variant="title"
              color="inherit"
            >
              Shiba Town
            </Typography>
            <div className="">
              {!this.props.isUserLoggedIn &&
              <div>
                <Link to="/" style={{textDecoration: 'none'}}>
                  <Button className={classes.textPrimary}>Home</Button>
                </Link>
                <Link to="/login" style={{textDecoration: 'none'}}>
                  <Button className={classes.textPrimary}>Login</Button>
                </Link>
                <Link to="/register" style={{textDecoration: 'none'}}>
                  <Button className={classes.textPrimary}>Register</Button>
                </Link>
              </div>
              }
              {this.props.isUserLoggedIn &&
              <div>
                <Link to="/" style={{textDecoration: 'none'}}>
                  <Button className={classes.textPrimary}>Home</Button>
                </Link>
                <Link to="/" style={{textDecoration: 'none'}}>
                  <Button onClick={this.props.logout} className={classes.textPrimary}>Logout</Button>
                </Link>
                <Link to="/profile" style={{textDecoration: 'none'}}>
                  <IconButton
                    className={classes.menuButton, classes.textPrimary}
                    aria-label="Menu"
                  >
                    <AccountCircle />
                  </IconButton>
                </Link>
              </div>
              }
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginBottom: theme.spacing.unit * 10,
  },
  flex: {
    flex: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
    color: 'white',
    textDecorationLine: 'none'
  },
  textPrimary: {
    color: 'white',
    textDecorationLine: 'none'
  },
});

Navbar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Navbar);

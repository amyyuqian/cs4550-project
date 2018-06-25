import React from "react";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import UserService from "../services/UserService";

class CreateUser extends React.Component {
  constructor(props) {
    super(props);
    this.userService = UserService.instance;
    this.state = {
      username: "",
      password: "",
      email: "",
      firstName: "",
      lastName: "",
    };
  }

  createUser = () => {

  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.root} elevation={4}>
        <form className={classes.container} autoComplete="off">
          <Typography variant="headline" component="h3">
            Register
          </Typography>
          <TextField
            required
            id="username"
            label="Username"
            value={this.state.username}
            onChange={this.handleChange("username")}
            className={classes.textField}
            InputLabelProps={{
              shrink: true
            }}
            margin="normal"
          />
          {this.state.emptyUsername && <Typography className={classes.error}>Please enter a username.</Typography>}
          {this.state.usernameTaken && <Typography className={classes.error}>Username is already taken.</Typography>}
          <TextField
            required
            id="password"
            label="Password"
            value={this.state.password}
            onChange={this.handleChange("password")}
            className={classes.textField}
            InputLabelProps={{
              shrink: true
            }}
            type="password"
            margin="normal"
          />
          {this.state.emptyPass && <Typography className={classes.error}>Please enter a password.</Typography>}
          {this.state.passwordsNotMatching && <Typography className={classes.error}>Passwords do not match.</Typography>}
          <TextField
            required
            id="verifyPass"
            label="Verify Password"
            value={this.state.verifyPass}
            onChange={this.handleChange("verifyPass")}
            className={classes.textField}
            InputLabelProps={{
              shrink: true
            }}
            type="password"
            margin="normal"
          />
          {this.state.emptyVerifyPass && <Typography className={classes.error}>Please enter a password.</Typography>}
          <TextField
            required
            id="email"
            label="Email"
            value={this.state.email}
            onChange={this.handleChange("email")}
            className={classes.textField}
            InputLabelProps={{
              shrink: true
            }}
            margin="normal"
          />
          {this.state.emptyEmail && <Typography className={classes.error}>Please enter an email.</Typography>}
          <Button
            onClick={this.createUser}
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Create User
          </Button>
        </form>
      </Paper>
    );
  }
}

const styles = theme => ({
  container: {
    display: 'grid',
    flexWrap: 'wrap',
    padding: 20,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 400,
  },
  button: {
    margin: theme.spacing.unit,
    width: 200
  },
});

CreateUser.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CreateUser);
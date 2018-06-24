import React from "react";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import UserService from "../services/UserService";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.userService = UserService.instance;
    this.state = {
      username: "",
      password: "",
      emptyUsername: false,
      emptyPass: false,
      invalidCredentials: false
    };
  }

  login = () => {
    this.setState({
      emptyUsername: false,
      emptyPass: false,
      invalidCredentials: false
    })

    var username = this.state.username;
    var password = this.state.password;

    if (!username) {
      this.setState({emptyUsername: true})
    }
    if (!password) {
      this.setState({emptyPass: true})
    }

    var user = {
      username: username,
      password: password
    }

    if (!this.isError()) {
      this.userService.login(user).then((user) => {
        if (user) {
          this.props.login();
          this.props.history.push("/");
        } else {
          this.setState({invalidCredentials: true})
        }
      })
    }
  }

  isError = () => {
    return this.state.emptyUsername || this.state.emptyPass;
  }

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
            Login
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
          {this.state.invalidCredentials && <Typography className={classes.error}>Invalid credentials.</Typography>}
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
          <Button
            onClick={this.login}
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Login
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
  error: {
    fontSize: 12,
    color: 'red'
  }
});

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);
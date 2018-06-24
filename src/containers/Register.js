import React from "react";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import UserService from "../services/UserService";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.userService = UserService.instance;
    this.state = {
      username: "",
      password: "",
      verifyPass: "",
      email: "",
      usernameTaken: false,
      emptyUsername: false,
      emptyPass: false,
      emptyVerifyPass: false,
      emptyEmail: false,
      passwordsNotMatching: false,
    };
  }

  register = () => {
    this.setState({
      usernameTaken: false,
      emptyUsername: false,
      emptyPass: false,
      emptyVerifyPass: false,
      emptyEmail: false,
      passwordsNotMatching: false,
    })

    var username = this.state.username;
    var password = this.state.password;
    var verifyPass = this.state.verifyPass;
    var email = this.state.email;


    if (password && verifyPass && (password != verifyPass)) {
      this.setState({passwordsNotMatching: true})
    }
    if (!username) {
      this.setState({emptyUsername: true})
    }
    if (!password) {
      this.setState({emptyPass: true})
    }
    if (!verifyPass) {
      this.setState({emptyVerifyPass: true})
    }
    if (!email) {
      this.setState({emptyEmail: true})
    }

    var user = {
      username: username,
      password: password,
      email: email
    };

    if (!this.isError()) {
      this.userService.register(user).then((res) => {
        if (res.error) {
          this.setState({usernameTaken: true})
        } else {
          this.props.login();
          this.props.history.push("/");
        }
      });
    }
  };

  isError = () => {
    return this.state.usernameTaken || this.state.emptyUsername ||
      this.state.emptyPass || this.state.emptyVerifyPass || this.state.emptyEmail ||
      this.state.passwordsNotMatching;
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
            onClick={this.register}
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Register
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

Register.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Register);

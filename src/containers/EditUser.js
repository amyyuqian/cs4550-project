import React from "react";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import UserService from "../services/UserService";
import { Link } from "react-router-dom";
import Followees from "../components/Followees";
import ImageGallery from "../components/ImageGallery";
import Grid from '@material-ui/core/Grid';
import SimpleSnackbar from "../components/SimpleSnackbar";

class EditUser extends React.Component {
  constructor(props) {
    super(props);
    this.userService = UserService.instance;
    this.state = {
      id: this.props.match.params.userId,
      username: "",
      password: "",
      firstName: "",
      lastName: "",
      email: "",
      emptyUsername: false,
      emptyPass: false,
      emptyEmail: false,
      snackbarOpen: false,
      snackbarText: '',
    };
  }

  componentDidMount() {
    this.userService.getUser(this.state.id).then((user) => {
      this.setState({
        username: user.username,
        password: user.password,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      })
    })
  }

  updateUser = () => {
    var username = this.state.username;
    var password = this.state.password;
    var firstName = this.state.firstName;
    var lastName = this.state.lastName;
    var email = this.state.email;

    var user = {
      username: username,
      password: password,
      firstName: firstName,
      lastName: lastName,
      email: email
    }

    this.userService.updateUser(user, this.state.id).then((user) => {
      this.setState({
        snackbarOpen: true,
        snackbarText: 'User succesfully updated'
      })
    })
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  renderButton = (classes) => {
    if (this.state.username && this.state.password && this.state.email) {
      return (
        <Button variant="contained" color="primary"
          className={classes.button} 
          onClick={() => this.updateUser()}>
          Save User
        </Button>
      )
    } else {
      return (
        <Button variant="contained" color="primary" disabled
          className={classes.button} 
          onClick={() => this.updateUser()}>
          Save User
        </Button>
      )
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.root} elevation={4}>
        <form className={classes.container} autoComplete="off">
          <Typography variant="headline" component="h3">
            Edit User
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
          <TextField
            id="firstName"
            label="First Name"
            value={this.state.firstName}
            onChange={this.handleChange("firstName")}
            className={classes.textField}
            InputLabelProps={{
              shrink: true
            }}
            margin="normal"
          />
          <TextField
            id="lastName"
            label="Last Name"
            value={this.state.lastName}
            onChange={this.handleChange("lastName")}
            className={classes.textField}
            InputLabelProps={{
              shrink: true
            }}
            margin="normal"
          />
          {this.renderButton(classes)}
        </form>
        <SimpleSnackbar open={this.state.snackbarOpen} text={this.state.snackbarText} />
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

EditUser.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EditUser);
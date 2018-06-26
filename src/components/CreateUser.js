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
          onClick={() => this.props.createUser(this.state.username, this.state.password,
            this.state.email, this.state.firstName, this.state.lastName)}>
          Create User
        </Button>
      )
    } else {
      return (
        <Button variant="contained" color="primary" disabled
          className={classes.button} 
          onClick={() => this.props.createUser(this.state.username, this.state.password,
            this.state.email, this.state.firstName, this.state.lastName)}>
          Create User
        </Button>
      )
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <form className={classes.container} autoComplete="off">
          <Typography variant="headline" component="h3">
            Create User
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
      </div>
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
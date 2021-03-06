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

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.userService = UserService.instance;
    this.state = {
      id: this.props.user.id,
      username: this.props.user.username,
      password: this.props.user.password,
      firstName: "",
      lastName: "",
      email: this.props.user.email,
      emptyUsername: false,
      emptyPass: false,
      emptyEmail: false,
      favorites: []
    };
  }

  componentDidMount() {
    if (this.props.user.firstName) {
      this.setState({firstName: this.props.user.firstName})
    }
    if (this.props.user.lastName) {
      this.setState({lastName: this.props.user.lastName})
    }
    this.getFavorites();
  }
  
  getFavorites = () => {
    this.userService.getFavorites(this.state.id).then((favs) => {
      this.setState({favorites: favs})
    })
  }

  updateProfile = () => {
    this.setState({
      emptyUsername: false,
      emptyPass: false,
      emptyEmail: false,
    })

    var username = this.state.username;
    var password = this.state.password;
    var firstName = this.state.firstName;
    var lastName = this.state.lastName;
    var email = this.state.email;

    if (!username) {
      this.setState({emptyUsername: true})
    }
    if (!password) {
      this.setState({emptyPass: true})
    }
    if (!email) {
      this.setState({emptyEmail: true})
    }

    var user = {
      username: username,
      password: password,
      firstName: firstName,
      lastName: lastName,
      email: email
    }

    if (!this.isError()) {
      this.userService.updateUser(user, this.state.id).then((user) => {
        this.props.setUser(user);
        this.props.history.push("/");
      })
    }
  }

  isError = () => {
    return this.state.emptyUsername || this.state.emptyPass || this.state.emptyEmail;
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
            Profile
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
            onClick={this.updateProfile}
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Save Profile
          </Button>
          {this.props.user.admin &&
          <Link to="/admin" style={{textDecoration: 'none'}}>
            <Button variant="contained" className={classes.button}>
              Admin Controls
            </Button>
          </Link>
        }
        </form>
        <Followees userId={this.state.id}/>
        <Grid item className={classes.container}>
          <Typography variant="title">
            Favorites
          </Typography>
          <ImageGallery images={this.state.favorites} user={this.props.user} isUserLoggedIn={true}/>
        </Grid>
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

Profile.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Profile);
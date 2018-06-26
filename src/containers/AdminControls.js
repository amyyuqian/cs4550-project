import React from "react";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import UserService from "../services/UserService";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import DeleteIcon from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton';
import CreateUser from "../components/CreateUser";
import SimpleSnackbar from "../components/SimpleSnackbar";
import { Link } from "react-router-dom";

class AdminControls extends React.Component {
  constructor(props) {
    super(props);
    this.userService = UserService.instance;
    this.state = {
      users: [],
      snackbarOpen: false,
      snackbarText: '',
    }
  }

  componentDidMount() {
    this.getAllUsers();
  }

  getAllUsers = () => {
    this.userService.getAllUsers().then((users) => {
      this.setState({users: users})
    })
  }

  createUser = (username, password, email, firstName, lastName) => {
    var user = {
      username: username,
      password: password,
      email: email,
      firstName: firstName,
      lastName: lastName
    }
    this.userService.createUser(user).then(() => {
      this.setState({
        snackbarOpen: true,
        snackbarText: 'User created successfully'
      });
      this.getAllUsers();
    })
  };

  deleteUser(userId) {
    this.userService.deleteUser(userId).then(() => {
      this.getAllUsers();
    })
  }

  renderUsers = () => {
    let users = this.state.users.map((user, index) => {
      return (
        <Link to={`/user/edit/${user.id}`} key={index} style={{textDecoration: 'none'}}>
          <ListItem>
            <ListItemText
              primary={user.username}
              secondary={"ID: " + user.id}
            />
            <ListItemSecondaryAction>
              <IconButton aria-label="Delete"
                onClick={() => this.deleteUser(user.id)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </Link>
      )
    })
    return (users);
  }

  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.container}>
        <CreateUser createUser={this.createUser}/>
        <Grid item xs={12} md={6}>
          <Typography variant="headline" component="h3">
            Users
          </Typography>
          <div className={classes.demo}>
            <List dense={false}>
              {this.renderUsers()}
            </List>
          </div>
        </Grid>
        <SimpleSnackbar open={this.state.snackbarOpen} text={this.state.snackbarText} />
      </Paper>
    )
  }
}

const styles = theme => ({
  container: {
    display: 'grid',
    flexWrap: 'wrap',
    padding: 20,
  },
  button: {
    margin: theme.spacing.unit,
    width: 200
  },
});

AdminControls.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AdminControls);
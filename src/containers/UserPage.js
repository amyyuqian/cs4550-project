import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import UserService from "../services/UserService";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Followees from "../components/Followees";

class UserPage extends React.Component {
  constructor(props) {
    super(props);
    this.userService = UserService.instance;
    this.state = {
      user: '',
      followers: [],
      following: [],
      favorites: [],
    }
  }

  componentDidMount() {
    this.getUser();
  }

  getUser = () => {
    var id = this.props.match.params.userId;
    this.userService.getUser(id).then((user) => {
      this.setState({user: user})
    })
  }

  follow = () => {
    var id = this.props.match.params.userId;
    this.userService.follow(id).then(() => {
      this.getFollowers();
    })
  }

  unfollow = () => {
    var id = this.props.match.params.userId;
    this.userService.unfollow(id).then(() => {
      this.getFollowers();
    })
  }

  renderFollowButton() {
    const { classes } = this.props;
    if (this.props.loggedInUser && !this.isFollowing()) {
      return (
        <Button
          onClick={this.follow}
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Follow
        </Button>
      )
    } else {
      return (
        <Button
          onClick={this.unfollow}
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Unfollow
        </Button>
      )
    }
  }

  isFollowing = () => {
    var id = this.props.match.params.userId;
    this.userService.isFollowing(id).then((isFollowing) => {
      return isFollowing;
    })
  }

  render() {
    const { classes } = this.props;
    const user = this.state.user;
    return (
      <Paper className={classes.container} elevation={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="title" className={classes.title}>
              {this.state.user.username}
            </Typography>
            <div className={classes.demo}>
              <List dense={false}>
                <ListItem>
                  <ListItemText
                    primary={'First Name: ' + user.firstName}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={'Last Name: ' + user.lastName}
                  />
                </ListItem>
              </List>
            </div>
            {this.renderFollowButton()}
          </Grid>
          <Followees userId={this.props.match.params.userId}/>
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
  white: {
    color: 'white'
  }
});

UserPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserPage);
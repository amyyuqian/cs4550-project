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

class UserPage extends React.Component {
  constructor(props) {
    super(props);
    this.userService = UserService.instance;
    this.state = {
      user: ''
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

  renderFollowButton() {
    const { classes } = this.props;
    return (
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
      >
        Follow
      </Button>
    )
  }

  renderUnfollowButton() {
    const { classes } = this.props;
    return (
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
      >
        Unfollow
      </Button>
    )
  }

  isFollowing = () => {

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
            {this.props.loggedInUser && !this.isFollowing() && this.renderFollowButton()}
            {this.props.loggedInUser && this.isFollowing() && this.renderUnfollowButton()}
          </Grid>
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
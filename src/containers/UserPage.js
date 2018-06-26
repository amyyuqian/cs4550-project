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
import ImageGallery from "../components/ImageGallery";
import SimpleSnackbar from "../components/SimpleSnackbar";

class UserPage extends React.Component {
  constructor(props) {
    super(props);
    this.userService = UserService.instance;
    this.state = {
      user: '',
      favorites: [],
      isFollowing: false,
      snackbarOpen: false,
      snackbarText: '',
      isUserLoggedIn: this.props.isUserLoggedIn,
      id: this.props.match.params.userId,
    }
  }

  componentDidMount() {
    var id = this.props.match.params.userId;
    this.getUser(id);
    this.getFavorites(id);
  }

  componentWillReceiveProps (nextProps) {
    if(nextProps.match.params.userId != this.props.match.params.userId) {
      var id = nextProps.match.params.userId ;
      this.getUser(id);
      this.getFavorites(id);
    }
  }

  getUser = (id) => {
    this.userService.getUser(id).then((user) => {
      this.setState({user: user});
      this.isFollowing(id);
    })
  }

  getFavorites = (id) => {
    this.userService.getFavorites(id).then((favs) => {
      this.setState({favorites: favs})
    })
  }

  follow = () => {
    this.userService.follow(this.state.id).then((user) => {
      this.setState({
        snackbarOpen: true,
        snackbarText: 'Followed',
        isFollowing: !this.state.isFollowing
      })
    })
  }

  unfollow = () => {
    this.userService.unfollow(this.state.id).then((user) => {
      this.setState({
        snackbarOpen: true,
        snackbarText: 'Unfollowed',
        isFollowing: !this.state.isFollowing
      })
    })
  }

  renderFollowButton() {
    const { classes } = this.props;
    if (this.state.isUserLoggedIn && !this.state.isFollowing) {
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
    } else if (this.state.isUserLoggedIn && this.state.isFollowing) {
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
    if (this.state.user) {
      this.userService.isFollowing(id).then((isFollowing) => {
        this.setState({isFollowing: isFollowing})
      })
    }
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
          <Grid item className={classes.container}>
            <Typography variant="title">
              Favorites
            </Typography>
            <ImageGallery images={this.state.favorites} user={this.props.user} isUserLoggedIn={true}/>
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
  white: {
    color: 'white'
  }
});

UserPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserPage);
import React from "react";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import UserService from "../services/UserService";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';


class Followees extends React.Component {
  constructor(props) {
    super(props);
    this.userService = UserService.instance;
    this.state = {
      followers: [],
      following: [],
    }
  }

  componentDidMount() {
    this.getFollowers();
    this.getFollowing();
  }


  getFollowers = () => {
    var id = this.props.userId;
    this.userService.getFollowers(id).then((followers) => {
      this.setState({followers: followers})
    })
  }

  getFollowing = () => {
    var id = this.props.userId;
    this.userService.getFollowing(id).then((following) => {
      this.setState({following: following})
    })
  }

  renderUsers = (items) => {
    let users = items.map((user, index) => {
      return (
        <Link to={`/user/${user.id}`} key={index} style={{textDecoration: 'none'}}>
          <ListItem>
            <ListItemText
              primary={user.username}
              secondary={user.firstName + ' ' + user.lastName}
            />
          </ListItem>
          <Divider />
        </Link>
      )
    })
    return (users);
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
          <Grid item xs={12} md={6}>
            <Typography variant="title" className={classes.title}>
              Followers
            </Typography>
            <div className={classes.demo}>
              <List dense={true}>
                {this.renderUsers(this.state.followers)}
              </List>
            </div>
            <Typography variant="title" className={classes.title}>
              Following
            </Typography>
            <div className={classes.demo}>
              <List dense={true}>
                {this.renderUsers(this.state.following)}
              </List>
            </div>
          </Grid>
      </div>
    )
  }
}

const styles = theme => ({
  container: {
    display: 'grid',
    flexWrap: 'wrap',
    padding: 20,
  },
});

Followees.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Followees);
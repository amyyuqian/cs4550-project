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


class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.userService = UserService.instance;
    this.state = {
      users: this.props.users || [],
    }
  }

  componentDidMount() {
    this.search();
  }

  search = () => {
    var input = this.props.match.params.input;
    this.userService.searchUsers(input).then((users) => {
      this.setState({users: users})
    })
  }

  renderUsers = () => {
    let users = this.state.users.map((user, index) => {
      return (
        <Link to={`/user/${user.id}`} style={{textDecoration: 'none'}}>
          <ListItem>
            <ListItemText
              primary={user.username}
              secondary={"ID: " + user.id}
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
              Users
            </Typography>
            <div className={classes.demo}>
              <List dense={false}>
                {this.renderUsers()}
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

SearchResults.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SearchResults);
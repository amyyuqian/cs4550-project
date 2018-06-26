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
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CommentService from "../services/CommentService";
import { withRouter } from 'react-router';
import DeleteIcon from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Moment from 'react-moment';

class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.userService = UserService.instance;
    this.commentService = CommentService.instance;
    this.state = {
      id: this.props.match.params.imageId,
      comments: [],
      comment: '',
      user: '',
    }
  }

  componentDidMount() {
    this.userService.profile().then((user) => {
      if (user) {
        this.setState({user: user});
      }
      this.getComments();
    })
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  getComments = () => {
    if (this.state.id) {
      this.commentService.getCommentsForImage(this.state.id).then((comments) => {
        this.setState({comments: comments})
      })
    }
  }

  createComment = () => {
    var body = {
      text: this.state.comment
    }
    this.commentService.createComment(this.state.id, body).then(() => {
      this.getComments();
    })
  }

  deleteComment = (id) => {
    this.commentService.deleteComment(id).then(() => {
      this.getComments();
    });
  }

  userLink = (user) => {
    return (
      <Link to={`/user/${user.id}`} style={{textDecoration: 'none'}}>
        {user.username}
      </Link>
    )
  }

  renderDeleteButton = (comment) => {
    if (this.state.user.id == comment.user.id) {
      return (
        <IconButton aria-label="Delete"
          onClick={() => this.deleteComment(comment.id)}>
          <DeleteIcon />
        </IconButton>
      )
    }
  }

  renderComments = (items) => {
    let comments = items.map((comment, index) => {
      return (
        <div key={index}>
          <ListItem>
            <ListItemText
              primary={this.userLink(comment.user)}
              secondary={comment.text}
            />
            <ListItemSecondaryAction>
              <Typography>
                <Moment format="MMMM Do YYYY">
                  {comment.dateCreated}
                </Moment>
                {this.renderDeleteButton(comment)}
              </Typography>
            </ListItemSecondaryAction>
          </ListItem>
          <Divider />
        </div>
      )
    })
    return (comments);
  }

  renderButton = (classes) => {
    if (!this.state.comment && this.props.isUserLoggedIn) {
      return (
        <Button variant="contained" color="primary" disabled
          className={classes.button} onClick={this.createComment}>
          Submit
        </Button>
      )
    } else if (this.props.isUserLoggedIn) {
      return (
        <Button variant="contained" color="primary"
          className={classes.button} onClick={this.createComment}>
          Submit
        </Button>
      )
    }
  }

  renderCommentField = (classes) => {
    if (this.props.isUserLoggedIn) {
      return (
        <TextField
          id="comment"
          label="Type comment here..."
          value={this.state.comment}
          onChange={this.handleChange("comment")}
          className={classes.textField}
          InputLabelProps={{
            shrink: true
          }}
          multiline={true}
          rows={4}
          margin="normal"
          fullWidth={true}
        />
      )
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
          <Grid item xs={12} md={6}>
            <Typography variant="title" className={classes.title}>
              Comments
            </Typography>
            {this.renderCommentField(classes)}
            {this.renderButton(classes)}
            <div className={classes.demo}>
              <List dense={false}>
                {this.renderComments(this.state.comments)}
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
  button: {
    margin: theme.spacing.unit,
    width: 200
  },
});

Comments.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(Comments));
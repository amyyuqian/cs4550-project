import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import UserService from "../services/UserService";
import ImageService from "../services/ImageService";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from "@material-ui/core/Typography";
import SimpleSnackbar from "../components/SimpleSnackbar";

class ImagePage extends React.Component {
  constructor(props) {
    super(props);
    this.userService = UserService.instance;
    this.imageService = ImageService.instance;
    this.state = {
      image: '',
      id: this.props.match.params.imageId,
      snackbarOpen: false,
      isFavorite: false,
      snackbarText: '',
    }
  }

  componentDidMount() {
    this.getImage();
  }

  handleClick = () => {
    this.setState({ snackbarOpen: true });
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ snackbarOpen: false });
  };

  getImage = () => {
    this.imageService.getImage(this.state.id).then((img) => {
      this.setState({image: img});
      this.isFavorite();
    })
  }

  favorite = () => {
    this.imageService.favorite(this.state.id).then(() => {
      this.setState({
        snackbarOpen: true,
        snackbarText: 'Favorited',
        isFavorite: !this.state.isFavorite
      })
    })
  }

  unfavorite = () => {
    this.imageService.unfavorite(this.state.id).then(() => {
      this.setState({
        snackbarOpen: true,
        snackbarText: 'Unfavorited',
        isFavorite: !this.state.isFavorite
      })
    })
  }

  renderFavorite = () => {
    if (this.props.isUserLoggedIn && this.state.isFavorite) {
      return (
        <Button onClick={this.unfavorite} size="small" color="primary">
          Unfavorite
        </Button>
      )
    } else if (this.props.isUserLoggedIn && !this.state.isFavorite) {
      return (
        <Button onClick={this.favorite} size="small" color="primary">
          Favorite
        </Button>
      )
    }
  }

  isFavorite = () => {
    if (this.state.image.id) {
      this.imageService.isFavorite(this.state.image.id)
        .then((isFavorite) => {
          this.setState({isFavorite: isFavorite})
        })
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <Card className={classes.card}>
          <CardMedia
            className={classes.media}
            image={this.state.image.url || ""}
          />
          <CardActions>
            {this.renderFavorite()}
          </CardActions>
        </Card>
        <SimpleSnackbar open={this.state.snackbarOpen} text={this.state.snackbarText} />
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
  white: {
    color: 'white'
  },
  card: {
    maxWidth: 500,
  },
  media: {
    height: 0,
    paddingTop: '100%', // 16:9
  },
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4,
  },
});

ImagePage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImagePage);
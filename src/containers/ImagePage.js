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

class ImagePage extends React.Component {
  constructor(props) {
    super(props);
    this.userService = UserService.instance;
    this.imageService = ImageService.instance;
    this.state = {
      image: '',
      id: this.props.match.params.imageId,
    }
  }
  

  componentDidMount() {
    this.getImage();
  }

  getImage = () => {
    this.imageService.getImage(this.state.id).then((img) => {
      this.setState({image: img});
    })
  }

  favorite = () => {

  }

  renderFavorite = () => {
    if (this.props.isUserLoggedIn && this.isFavorite()) {
      return (
        <Button size="small" color="primary">
          Unfavorite
        </Button>
      )
    } else if (this.props.isUserLoggedIn && !this.isFavorite()) {
      return (
        <Button size="small" color="primary">
          Favorite
        </Button>
      )
    }
  }

  isFavorite = () => {
    this.imageService.isFavorite(this.props.userId, this.state.image.id)
      .then((isFavorite) => {
        return isFavorite;
      })
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
});

ImagePage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImagePage);
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Typography from '@material-ui/core/Typography';

class ImageGallery extends React.Component {
  constructor(props) {
    super(props);
  }

  renderCards = () => {
    const { classes } = this.props;
    let cards = this.props.images.map((image, index) => {
      return (
        <GridListTile key={index}>
          <img src={image} />
          <GridListTileBar
            actionIcon={
              <IconButton className={classes.icon}>
                <StarBorderIcon />
              </IconButton>
            }
            actionPosition="left"
            className={classes.titleBar}
          />
        </GridListTile>
      )
    })
    return (cards);
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <GridList cellHeight={450} className={classes.gridList}>
          {this.renderCards()}
        </GridList>
      </div>
    )
  }
}

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
  gridList: {
    width: '90%',
    transform: 'translateZ(0)',
  },
  icon: {
    color: 'white',
  },
  titleBar: {
    background:
      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
      'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
};

ImageGallery.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImageGallery);
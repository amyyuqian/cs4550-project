import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Gallery from 'react-photo-gallery';

class ImageGallery extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Gallery photos={this.props.images} />
    )
  }
}

const styles = {
};

ImageGallery.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImageGallery);
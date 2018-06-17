import React from 'react';
import Navbar from '../components/Navbar'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ImageSearcher from '../components/ImageSearcher';
import ImageService from '../services/ImageService';
import ImageGallery from '../components/ImageGallery';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.imageService = ImageService.instance;
    this.state = {
      num: '',
      type: 'shiba',
      images: []
    }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  getShibas = () => {
    this.imageService.getShibas(this.state.num)
      .then((shibas) => this.setImages(shibas));
  }

  setImages = (images) => {
    this.setState({
      images: images,
    })
  }

  getImages = () => {
    if (this.state.type == 'shiba') {
      this.getShibas();
    }
  }

  render() {
    const { classes } = this.props; 
    return (
      <div>
        <Navbar />
        <ImageSearcher num={this.state.num} handleChange={this.handleChange}
          getImages={this.getImages}/>
        <ImageGallery images={this.state.images} />
      </div>
      
    )
  }
}

const styles = theme => ({

});

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);
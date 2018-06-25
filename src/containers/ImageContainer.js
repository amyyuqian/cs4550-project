import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ImageSearcher from "../components/ImageSearcher";
import ImageService from "../services/ImageService";
import ImageGallery from "../components/ImageGallery";
import SearchInput from "../components/SearchInput";

class ImageContainer extends React.Component {
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
      .then((shibas) => {
        this.setImages(shibas, "shiba");
      });
  }

  setImages = (images, type) => {
    images.map((url) => {
      var img = {
        url: url,
        type: type
      }
      this.imageService.createImage(img).then((image) => {
        this.setState({images: this.state.images.concat(image)});
      });
    })
  }

  getImages = () => {
    if (this.state.type == 'shiba') {
      this.getShibas();
    }
  }

  render() {
    return (
      <div>
        <SearchInput search={this.props.search}/>
        <ImageSearcher
          num={this.state.num}
          handleChange={this.handleChange}
          getImages={this.getImages}
        />
        <ImageGallery images={this.state.images} user={this.props.user} isUserLoggedIn={this.props.isUserLoggedIn}/>
      </div>
    );
  }
}

const styles = theme => ({

});

ImageContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImageContainer);

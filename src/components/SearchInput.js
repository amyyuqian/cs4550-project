import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import UserService from "../services/UserService";
import SearchBar from 'material-ui-search-bar';
import { withRouter } from 'react-router';

class SearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.userService = UserService.instance;
    this.state = {
      input: "",
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <SearchBar
        value={this.state.input}
        onChange={(val) => this.setState({input: val})}
        onRequestSearch={() => {
          this.props.history.push(`/searchResults/${this.state.input}`);
        }} 
      />
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

SearchInput.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(SearchInput));
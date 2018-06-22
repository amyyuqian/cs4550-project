import React from "react";
import Navbar from "../components/Navbar";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ImageContainer from "./ImageContainer";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Register from "./Register";
import Login from "./Login";


class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  setUser = (user) => {
    this.setState({user: user});
  }

  render() {
    const { classes } = this.props;
    return (
      <Router>
        <div>
          <Navbar />
          <Route exact path="/" component={ImageContainer}></Route>
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
        </div>
      </Router>
    );
  }
}

const styles = theme => ({});

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Home);

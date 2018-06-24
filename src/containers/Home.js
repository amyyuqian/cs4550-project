import React from "react";
import Navbar from "../components/Navbar";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ImageContainer from "./ImageContainer";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Register from "./Register";
import Login from "./Login";
import UserService from "../services/UserService";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.userService = UserService.instance;
    this.state = {
      isUserLoggedIn: false,
      user: '',
    }
  }

  componentDidMount() {
    this.userService.profile().then((user) => {
      if (user) {
        this.login(user);
      } else {
        this.logout();
      }
    })
  }

  login = (user) => {
    this.setState({
      isUserLoggedIn: true,
      user: user
    });
  }

  logout = () => {
    this.setState({isUserLoggedIn: false})
  }

  render() {
    const { classes } = this.props;
    return (
      <Router>
        <div>
          <Navbar isUserLoggedIn={this.state.isUserLoggedIn} logout={this.logout}/>
          <Route exact path="/" component={ImageContainer}></Route>
          <PropsRoute path="/register" component={Register} login={this.login}/>
          <PropsRoute path="/login" component={Login} login={this.login}/>
        </div>
      </Router>
    );
  }
}

const renderMergedProps = (component, ...rest) => {
  const finalProps = Object.assign({}, ...rest);
  return (
    React.createElement(component, finalProps)
  );
}

const PropsRoute = ({ component, ...rest }) => {
  return (
    <Route {...rest} render={routeProps => {
      return renderMergedProps(component, routeProps, rest);
    }}/>
  );
}

const styles = theme => ({});

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Home);

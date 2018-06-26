import React from "react";
import Navbar from "../components/Navbar";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ImageContainer from "./ImageContainer";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Register from "./Register";
import Login from "./Login";
import UserService from "../services/UserService";
import Profile from "./Profile";
import AdminControls from "./AdminControls";
import SearchResults from "./SearchResults";
import UserPage from "./UserPage";
import ImagePage from "./ImagePage";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.userService = UserService.instance;
    this.state = {
      isUserLoggedIn: false,
      user: '',
      searchResults: []
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

  setUser = (user) => {
    this.setState({user: user})
  }

  logout = () => {
    this.userService.logout();
    this.setState({isUserLoggedIn: false})
  }

  render() {
    const { classes } = this.props;
    return (
      <Router>
        <div>
          <Navbar isUserLoggedIn={this.state.isUserLoggedIn} logout={this.logout}/>
          <PropsRoute exact path="/" component={ImageContainer} search={this.search} />
          <PropsRoute path="/register" component={Register} login={this.login}/>
          <PropsRoute path="/login" component={Login} login={this.login}/>
          <PropsRoute path="/profile" component={Profile} user={this.state.user} setUser={this.setUser}/>
          <PropsRoute path="/admin" component={AdminControls} />
          <PropsRoute path="/searchResults/:input" component={SearchResults}/>
          <PropsRoute path="/user/:userId" component={UserPage} isUserLoggedIn={this.state.isUserLoggedIn}/>
          <PropsRoute path="/image/:imageId" component={ImagePage} isUserLoggedIn={this.state.isUserLoggedIn} userId={this.state.user.id}/>
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

const styles = theme => ({
});

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Home);

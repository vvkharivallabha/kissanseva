import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./core/Home";
import Users from "./user/Users";
import Signup from "./user/Signup";
import Signin from "./auth/Signin";
import EditProfile from "./user/EditProfile";
import Profile from "./user/Profile";
import Admin from "./user/Admin";
import PrivateRoute from "./auth/PrivateRoute";
import Menu from "./core/Menu";
import Buy from "./core/Buy";
import Sell from "./core/Sell";
import Handler from "./auth/Handler";

class MainRouter extends Component {
  // Removes the server-side injected CSS when React component mounts
  componentDidMount() {
    const jssStyles = document.getElementById("jss-server-side");
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    return (
      <div>
        <Menu />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/users" component={Users} />
          <Route path="/signup" component={Signup} />
          <Route path="/signin" component={Signin} />
          <Route path="/Handler" component={Handler} />
          <Route path="/sell" component={Sell} />
          <Route path="/buy" component={Buy} />
          <PrivateRoute path="/user/edit/:userId" component={EditProfile} />
          <Route path="/user/:userId" component={Profile} />
          <Route path="/admin" component={Admin} />
        </Switch>
      </div>
    );
  }
}

export default MainRouter;

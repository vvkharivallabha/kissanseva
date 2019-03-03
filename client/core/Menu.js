import React from "react";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import IconButton from "material-ui/IconButton";
import HomeIcon from "material-ui-icons/Home";
import Button from "material-ui/Button";
import auth from "./../auth/auth-helper";
import { Link, withRouter } from "react-router-dom";
import { withStyles } from "material-ui/styles";

const isActive = (history, path) => {
  if (history.location.pathname == path) return { color: "#ffa726" };
  else return { color: "#ffffff" };
};


const Menu = withRouter(({ history }) => (
  <AppBar position="static">
    <Toolbar>
      <Typography type="title" color="inherit">
        KISSAN SEVA
      </Typography>
      <Link to="/">
        <IconButton aria-label="Home" style={isActive(history, "/")}>
          <HomeIcon />
        </IconButton>
      </Link>
      <div style={{ position: "absolute", right: "10px" }}>
        <span style={{ float: "right" }}>
          {!auth.isAuthenticated() && (
            <span>
              <Link to="/signup">
                <Button style={isActive(history, "/signup")}>Sign up</Button>
              </Link>
              <Link to="/signin">
                <Button
                  className="float-right"
                  style={isActive(history, "/signin")}
                >
                  Sign In
                </Button>
              </Link>
            </span>
          )}
          {auth.isAuthenticated() && (
            <span>
              {(auth.isAuthenticated().user.role === "Farmer" ||
                auth.isAuthenticated().user.role === "Retailer") && (
                <Link to="/buy">
                  <Button
                    style={isActive(
                      history,
                      "/user/" + auth.isAuthenticated().user._buy
                    )}
                  >
                    BUY
                  </Button>
                </Link>
              )}
              {(auth.isAuthenticated().user.role === "Farmer" ||
                auth.isAuthenticated().user.role === "Supplier") && (
                <Link to="/sell">
                  <Button
                    style={isActive(
                      history,
                      "/user/" + auth.isAuthenticated().user._sell
                    )}
                  >
                    SELL
                  </Button>
                </Link>
              )}

              <Link to={"/user/" + auth.isAuthenticated().user._id}>
                <Button
                  style={isActive(
                    history,
                    "/user/" + auth.isAuthenticated().user._id
                  )}
                >
                  My Profile
                </Button>
              </Link>
              <Button
                color="inherit"
                onClick={() => {
                  auth.signout(() => history.push("/"));
                }}
              >
                Sign out
              </Button>
            </span>
          )}
        </span>
      </div>
    </Toolbar>
  </AppBar>
));

export default Menu;

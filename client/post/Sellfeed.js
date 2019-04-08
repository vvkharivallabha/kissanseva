import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Card from "material-ui/Card";
import Typography from "material-ui/Typography";
import Divider from "material-ui/Divider";
import auth from "./../auth/auth-helper";
import SellPostList from "./SellPostList";
import { listSellFeed } from "./api-sellpost.js";
import NewSellPost from "./NewSellPost";
import Grid from "material-ui/Grid";

const styles = theme => ({
  card: {
    // maxWidth : 400,
    //margin: "left",
    paddingTop: 0,
    paddingBottom: theme.spacing.unit * 3,
    height : 600
  },
  title: {
    padding: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 2.5}px ${theme
      .spacing.unit * 2}px`,
    color: theme.palette.openTitle,
    fontSize: "1em"
  },
  media: {
    minHeight: 330
  },
  items: {
    width: 350,
    height: 500,
    overflow: "auto"
  }
});

const decide_path = () => {
  if (window.location.pathname == "/buy") {
    return "Product Cataloge";
  }
  if (window.location.pathname == "/sell") {
    return "Upload products";
  } else {
    return "News Feed";
  }
};

class Sellfeed extends Component {
  state = {
    sellposts: []
  };
  loadPosts = () => {
    const jwt = auth.isAuthenticated();
    listSellFeed(
      {
        userId: jwt.user._id
      },
      {
        t: jwt.token
      }
    ).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({ sellposts: data });
      }
    });
  };
  componentDidMount = () => {
    this.loadPosts();
  };
  addPost = post => {
    const updatedPosts = this.state.sellposts;
    updatedPosts.unshift(post);
    this.setState({ sellposts: updatedPosts });
  };
  removePost = post => {
    const updatedPosts = this.state.sellposts;
    const index = updatedPosts.indexOf(post);
    updatedPosts.splice(index, 1);
    this.setState({ sellposts: updatedPosts });
  };
  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
        <Typography type="title" className={classes.title}>
          {decide_path()}
        </Typography>
        <Divider />
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="flex-start"
        >
          <Grid item>
            <NewSellPost sellposts={this.state.sellposts} addUpdate={this.addPost} />
          </Grid>
          <Card className={classes.items}>
            <div style={{ marginLeft: "24px" }}>
              <Grid item>
                <SellPostList
                  removeUpdate={this.removePost}
                  sellposts={this.state.sellposts}
                />
              </Grid>
            </div>
          </Card>
        </Grid>
      </Card>
    );
  }
}
Sellfeed.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Sellfeed);

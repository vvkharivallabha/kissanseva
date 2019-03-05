import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Card from "material-ui/Card";
import Typography from "material-ui/Typography";
import Divider from "material-ui/Divider";
import auth from "./../auth/auth-helper";
import PostList from "./PostList";
import { listNewsFeed } from "./api-post.js";
import { sellPostByID } from "./api-sellpost.js";
import NewSellPost from "./NewSellPost";
import BuyPostList from "./BuyPostList";
import NewPost from "./NewPost";

const styles = theme => ({
  card: {
    margin: "auto",
    paddingTop: 0,
    paddingBottom: theme.spacing.unit * 3
  },
  title: {
    padding: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 2.5}px ${theme
      .spacing.unit * 2}px`,
    color: theme.palette.openTitle,
    fontSize: "1em"
  },
  media: {
    minHeight: 330
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

class Newsfeed extends Component {
  state = {
    posts: [],
    sellposts: [],
    buyposts: []
  };
  loadPosts = () => {
    const jwt = auth.isAuthenticated();
    listNewsFeed(
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
        this.setState({ posts: data });
      }
    });
    sellPostByID(
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
    const updatedPosts = this.state.posts;
    updatedPosts.unshift(post);
    this.setState({ posts: updatedPosts });
  };
  addSellPost = sellpost => {
    const updatedSellPosts = this.state.sellposts;
    updatedSellPosts.unshift(sellpost);
    this.setState({ sellposts: updatedSellPosts });
  };
  removePost = post => {
    const updatedPosts = this.state.posts;
    const index = updatedPosts.indexOf(post);
    updatedPosts.splice(index, 1);
    this.setState({ posts: updatedPosts });
  };
  removeSellPost = sellpost => {
    const updatedSellPosts = this.state.sellposts;
    const index = updatedSellPosts.indexOf(sellpost);
    updatedSellPosts.splice(index, 1);
    this.setState({ sellposts: updatedSellPosts });
  };
  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
        <Typography type="title" className={classes.title}>
          {decide_path()}
        </Typography>
        <Divider />
        {window.location.pathname == "/sell" && (
          <NewSellPost addUpdate={this.addSellPost} />
        )}
        {window.location.pathname == "/" && (
          <NewPost addUpdate={this.addPost} />
        )}
        <Divider />
        {/* {window.location.pathname == "/buy" && (
          <BuyPostList
            removeUpdate={this.removeSellPost}
            posts={this.state.sellposts}
          />
        )} */}
        {window.location.pathname == "/" && (
          <PostList removeUpdate={this.removePost} posts={this.state.posts} />
        )}
      </Card>
    );
  }
}
Newsfeed.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Newsfeed);

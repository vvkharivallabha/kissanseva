import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Card, { CardHeader, CardContent, CardActions } from 'material-ui/Card'
import Typography from "material-ui/Typography";
import Divider from "material-ui/Divider";
import auth from "./../auth/auth-helper";
import BuyPostList from "./BuyPostList"
import { listSellFeed } from "./api-sellpost.js";
import Grid from "material-ui/Grid"

const styles = theme => ({
  card: {
    width : 500,
    height : 500,
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
  },
  items: {
    width: 350,
    height: 500,
  }
});

const decide_path = () => {
  if (window.location.pathname == "/buy") {
    return "Product Cataloge";
  }
};

class Buyfeed extends Component {
  state = {
    buyposts: []
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
        this.setState({ buyposts: data });
      }
    });
  };
  removePost = post => {
    const updatedPosts = this.state.sellposts;
    const index = updatedPosts.indexOf(post);
    updatedPosts.splice(index, 1);
    this.setState({ sellposts: updatedPosts });
  };
  componentDidMount = () => {
    this.loadPosts()
  }
  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.card} style={{overflow: "auto"}}>
        <Typography type="title" className={classes.title}>
          {decide_path()}
        </Typography>
        <Divider />
        <Grid container direction="row" justify ="space-around" alignItems = "flex-start">
              <Grid item>
                <BuyPostList removeUpdate={this.removePost} buyposts={this.state.buyposts} />
              </Grid>
        </Grid>
      </Card>
    );
  }
}
Buyfeed.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Buyfeed);

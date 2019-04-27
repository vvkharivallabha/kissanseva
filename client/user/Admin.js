import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Paper from "material-ui/Paper";
import Typography from "material-ui/Typography";
import auth from "../auth/auth-helper";
import { Redirect, Link } from "react-router-dom";
import { listByUser } from "../post/api-post.js";
import { listAllSellFeed, listItems } from "../post/api-sellpost.js";
import { listBuyFeed } from "../post/api-buypost.js";
import { Chart } from "react-google-charts";
import Divider from "material-ui/Divider";

const styles = theme => ({
  root: theme.mixins.gutters({
    maxWidth: 600,
    margin: "auto",
    padding: theme.spacing.unit * 3,
    marginTop: theme.spacing.unit * 5
  }),
  title: {
    margin: `${theme.spacing.unit * 2}px ${theme.spacing.unit}px 0`,
    color: theme.palette.protectedTitle,
    fontSize: "1em"
  },
  bigAvatar: {
    width: 60,
    height: 60,
    margin: 10
  }
});

class Admin extends Component {
  constructor({ match }) {
    super();
    this.state = {
      user: { following: [], followers: [] },
      redirectToSignin: false,
      following: false,
      posts: [],
      count_0: [],
      count_1: [],
      cartposts: [],
      items: [],
      s_name: [],
      s_cost: []
    };
    this.match = match;
  }
  componentWillReceiveProps = props => {
    this.init(props.match.params.userId);
  };
  componentDidMount = () => {
    this.loadPosts();
  };
  checkFollow = user => {
    const jwt = auth.isAuthenticated();
    const match = user.followers.find(follower => {
      return follower._id == jwt.user._id;
    });
    return match;
  };
  clickFollowButton = callApi => {
    const jwt = auth.isAuthenticated();
    callApi(
      {
        userId: jwt.user._id
      },
      {
        t: jwt.token
      },
      this.state.user._id
    ).then(data => {
      if (data.error) {
        this.setState({ error: data.error });
      } else {
        this.setState({ user: data, following: !this.state.following });
      }
    });
  };
  loadPosts = () => {
    const jwt = auth.isAuthenticated();
    listBuyFeed(
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
        this.setState({ cartposts: data });
      }
    });
    listItems().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({ items: data });
        this.state.items.sort(function(a, b) {
          return b.cost - a.cost;
        });
        for (var i = 0; i < 5; i++) {
          this.state.s_name.push(this.state.items[i].product_name);
        }
        for (var i = 0; i < 5; i++) {
          this.state.s_cost.push(this.state.items[i].cost);
        }
      }
    });
    listAllSellFeed().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        var count1 = 0;
        var count2 = 0;
        var count3 = 0;
        var count4 = 0;
        var count5 = 0;
        var count6 = 0;
        for (let i = 0; i < data.length; i++) {
          var date = new Date(data[i].created);
          if (date.getFullYear() == "2019") {
            if (data[i].postedRole == "Farmer") {
              count1 = count1 + 1;
            } else if (data[i].postedRole == "Supplier") {
              count2 = count2 + 1;
            } else if (data[i].postedRole == "Retailer") {
              count3 = count3 + 1;
            }
          } else {
            if (data[i].postedRole == "Farmer") {
              count4 = count4 + 1;
            } else if (data[i].postedRole == "Supplier") {
              count5 = count5 + 1;
            } else if (data[i].postedRole == "Retailer") {
              count6 = count6 + 1;
            }
          }
        }
        this.state.count_0.push(count1);
        this.state.count_0.push(count2);
        this.state.count_0.push(count3);
        this.state.count_1.push(count4);
        this.state.count_1.push(count5);
        this.state.count_1.push(count6);
      }
    });
  };
  removePost = post => {
    const updatedPosts = this.state.posts;
    const index = updatedPosts.indexOf(post);
    updatedPosts.splice(index, 1);
    this.setState({ posts: updatedPosts });
  };
  render() {
    const { classes } = this.props;
    const photoUrl = this.state.user._id
      ? `/api/users/photo/${this.state.user._id}?${new Date().getTime()}`
      : "/api/users/defaultphoto";
    const redirectToSignin = this.state.redirectToSignin;
    if (redirectToSignin) {
      return <Redirect to="/signin" />;
    }
    return (
      <Paper className={classes.root} elevation={4}>
        <Typography type="title" className={classes.title}>
          Dashboard
        </Typography>
        <Divider style={{ marginBottom: 10 }} />
        <Chart
          width={"600px"}
          height={"300px"}
          chartType="Bar"
          loader={<div>Loading Chart</div>}
          data={[
            ["Year", "Suppliers", "Farmers", "Retailers"],
            [
              "2019",
              this.state.count_0[0],
              this.state.count_0[1],
              this.state.count_0[2]
            ],
            [
              "2018",
              this.state.count_1[0],
              this.state.count_1[1],
              this.state.count_1[2]
            ]
          ]}
          options={{
            // Material design options
            chart: {
              title: "Purchases"
              // subtitle: "Sales, Expenses, and Profit: 2014-2017"
            }
          }}
        />
        <Chart
          width={"600px"}
          height={"300px"}
          chartType="PieChart"
          loader={<div>Loading Chart</div>}
          data={[
            ["Pizza", "Popularity"],
            [this.state.s_name[0], parseInt(this.state.s_cost[0])],
            [this.state.s_name[1], parseInt(this.state.s_cost[1])],
            [this.state.s_name[2], parseInt(this.state.s_cost[2])],
            [this.state.s_name[3], parseInt(this.state.s_cost[3])], // Below limit.
            [this.state.s_name[4], parseInt(this.state.s_cost[4])] // Below limit.
          ]}
          options={{
            title: "Cost Analysis of Products",
            sliceVisibilityThreshold: 0.2 // 20%
          }}
        />
      </Paper>
    );
  }
}
Admin.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Admin);

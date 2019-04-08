import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Card, { CardHeader, CardContent, CardActions } from "material-ui/Card";
import Typography from "material-ui/Typography";
import Divider from "material-ui/Divider";
import auth from "./../auth/auth-helper";
import BuyPostList from "./BuyPostList";
import { listAllSellFeed } from "./api-sellpost.js";
import { listBuyFeed } from "./api-buypost.js";
import Grid from "material-ui/Grid";
import CartList from "./CartList";
import Button from "material-ui/Button";
var Insta = require("instamojo-nodejs");
Insta.setKeys(
  "test_f20f9dc80528b489a831c6a36ec",
  "test_100010d904439711ab2e5f9e910"
);
Insta.isSandboxMode(true);
var data = new Insta.PaymentData();
data.purpose = "Test"; // REQUIRED
data.amount = 9; // REQUIRED
data.setRedirectUrl("https://google.co.in");

const styles = theme => ({
  card: {
    width: 500,
    height: 500,
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
    width: 500,
    height: 500,
    marginLeft: 250,
    paddingTop: 0,
    paddingBottom: theme.spacing.unit * 3
  },
  cart: {
    width: 400,
    height: "auto"
  }
});

const decide_path = () => {
  if (window.location.pathname == "/buy") {
    return "Product Cataloge";
  }
};

class Buyfeed extends Component {
  state = {
    buyposts: [],
    cartposts: [],
    finalcost: 0
  };
  addPost = post => {
    const updatedPosts = this.state.cartposts;
    updatedPosts.unshift(post);
    this.setState({ cartposts: updatedPosts });
    this.computecost();
    console.log(this.state.finalcost);
    console.log(this.state.cartposts.length);
  };
  removePost = post => {
    const updatedPosts = this.state.cartposts;
    const index = updatedPosts.indexOf(post);
    updatedPosts.splice(index, 1);
    this.setState({ cartposts: updatedPosts });
    this.computecost();
    console.log(this.state.finalcost);
    console.log(this.state.cartposts.length);
  };
  loadPosts = () => {
    listAllSellFeed().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({ buyposts: data });
      }
    });
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
  };
  purchase = () => {
    Insta.createPayment(data, function(error, response) {
      if (error) {
        // some error
        console.log(error);
      } else {
        // Payment redirection link at response.payment_request.longurl
        console.log(response);
      }
    });
  };

  computecost = () => {
    this.state.finalcost = 0;
    for (let i = 0; i < this.state.cartposts.length; i++) {
      this.state.finalcost =
        this.state.finalcost +
        this.state.cartposts[i].totalcost *
          this.state.cartposts[i].product_quantity;
    }
    if (this.state.cartposts.length == 0) this.setState({ finalcost: 0 });
    else this.setState({ finalcost: this.state.finalcost });
  };

  componentDidMount = () => {
    this.loadPosts();
  };

  render() {
    const { classes } = this.props;
    return (
      <Grid container direction="row">
        <Card className={classes.card} style={{ overflow: "auto" }}>
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
            <BuyPostList
              buyposts={this.state.buyposts}
              addUpdate={this.addPost}
            />
          </Grid>
        </Card>
        <Grid
          container
          direction="column"
          alignItems="flex-end"
          style={{ width: "300px" }}
        >
          <Card className={classes.items} style={{ overflow: "auto" }}>
            <Typography type="title" className={classes.title}>
              Cart Items
            </Typography>
            <Divider />
            <div style={{ marginLeft: "24px" }} className={classes.cart}>
              <CartList
                cartposts={this.state.cartposts}
                removeUpdate={this.removePost}
              />
            </div>
          </Card>
          <div>
            <Typography component="p">
              Total Cost: {this.state.finalcost}
            </Typography>
            <Button
              color="primary"
              variant="raised"
              disabled={this.state.finalcost === 0}
              onClick={this.purchase}
            >
              PURCHASE
            </Button>
          </div>
        </Grid>
      </Grid>
    );
  }
}
Buyfeed.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Buyfeed);

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
import { create, remove } from "./api-buypost.js";
import { create_sell, remove_sell } from "./api-sellpost.js";
import { Link, withRouter } from "react-router-dom";
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "material-ui/Dialog";

var Insta = require("instamojo-nodejs");

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
    buyposts_un: [],
    cartposts: [],
    finalcost: 0,
    open: false
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
        for (let i = 0; i < data.length; i++) {
          if (auth.isAuthenticated().user.role === "Retailer") {
            if (data[i].postedRole === "Supplier") {
              data[i] = 0;
            }
          }
          if (auth.isAuthenticated().user.role === "Farmer") {
            if (data[i].postedRole === "Farmer") {
              console.log(data[i].postedRole);
              data[i] = 0;
            }
          }
        }
        let array1 = [];
        for (let i = 0; i < data.length; i++) {
          if (data[i] != 0) {
            var temp = JSON.parse(JSON.stringify(data[i]));
            array1.push(temp);
          }
        }
        this.setState({ buyposts_un: array1 });
        let array = [];
        for (let i = 0; i < data.length; i++) {
          if (data[i] != 0) {
            var temp = JSON.parse(JSON.stringify(data[i]));
            array.push(temp);
          }
        }

        for (let i = 0; i < array.length; i++) {
          for (let j = i + 1; j < array.length; j++) {
            if (array[i].product === array[j].product) {
              array[i].product_quantity =
                parseInt(array[i].product_quantity) +
                parseInt(array[j].product_quantity);
              let users = [];
              let user_quantity = [];
              users.push(array[i].postedBy);
              users.push(array[j].postedBy);
              user_quantity.push(parseInt(array[i].product_quantity));
              user_quantity.push(parseInt(array[j].product_quantity));
              array[i].postedBy = users;
              array[i].posted_quantity = user_quantity;
              console.log(array[i]);
              array.splice(j, 1);
            }
          }
        }
        this.setState({ buyposts: array });
        console.log(this.state.buyposts_un);
        console.log(this.state.buyposts);
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
        let array = [];
        for (let x = 0; x < data.length; x++) {
          if (data[x].purchased === "false") {
            var temp = JSON.parse(JSON.stringify(data[i]));
            array.push(temp);
          }
        }
        this.setState({ cartposts: array });
      }
    });
  };
  purchase = () => {
    const jwt = auth.isAuthenticated();
    console.log(this.state.cartposts);
    for (let x = 0; x < this.state.cartposts.length; x++) {
      this.state.cartposts[x].purchased = "true";
      let postData = new FormData();
      let quantity = 0;
      for (let y = 0; y < this.state.buyposts_un.length; y++) {
        if (
          this.state.cartposts[x].product == this.state.buyposts_un[y].product
        ) {
          console.log(this.state.buyposts_un[y]);
          if (
            this.state.buyposts_un[y].product_quantity >=
            this.state.cartposts[x].product_quantity
          ) {
            postData.set(
              "product_quantity",
              this.state.buyposts_un[y].product_quantity -
                this.state.cartposts[x].product_quantity
            );
            console.log("changed quantity");
            console.log(this.state.buyposts_un[y].product_quantity);
            postData.set("postedBy", this.state.buyposts_un[y].postedBy);
            postData.set("created", this.state.buyposts_un[y].created);
            postData.set("product", this.state.buyposts_un[y].product);
            postData.set("photo", this.state.buyposts_un[y].photo);
            postData.set("postedRole", this.state.buyposts_un[y].postedRole);
            postData.set("totalcost", this.state.buyposts_un[y].totalcost);
            remove_sell(
              {
                postId: this.state.buyposts_un[y]._id
              },
              {
                t: jwt.token
              }
            ).then(data => {
              if (data.error) {
                console.log(data.error);
              }
            });
            create_sell(
              {
                userId: jwt.user._id
              },
              {
                t: jwt.token
              },
              postData
            ).then(data => {
              if (data.error) {
                console.log(data.error);
                this.setState({ error: data.error });
              }
            });
            break;
          } else {
            this.state.cartposts[x].product_quantity =
              this.state.cartposts[x].product_quantity -
              this.state.buyposts_un[y].product_quantity;
            remove_sell(
              {
                postId: this.state.buyposts_un[y]._id
              },
              {
                t: jwt.token
              }
            ).then(data => {
              if (data.error) {
                console.log(data.error);
              }
            });
          }
        }
      }

      postData.set("postedBy", this.state.cartposts[x].postedBy);
      postData.set("created", this.state.cartposts[x].created);
      postData.set("product", this.state.cartposts[x].product);
      postData.set(
        "product_quantity",
        this.state.cartposts[x].product_quantity
      );
      postData.set("trans_id", Math.round(Math.random() * 100000));
      postData.set("totalcost", this.state.cartposts[x].totalcost);
      postData.set("verified", "false");
      console.log(postData);
      remove(
        {
          postId: this.state.cartposts[x]._id
        },
        {
          t: jwt.token
        }
      ).then(data => {
        if (data.error) {
          console.log(data.error);
        }
      });
      create(
        {
          userId: jwt.user._id
        },
        {
          t: jwt.token
        },
        postData
      ).then(data => {
        if (data.error) {
          console.log(data.error);
          this.setState({ error: data.error });
        } else {
          this.removePost(this.state.cartposts[x]);
          this.setState({ open: true });
        }
      });
    }
  };

  computecost = () => {
    this.state.finalcost = 0;
    for (let i = 0; i < this.state.cartposts.length; i++) {
      console.log(this.state.cartposts[i].totalcost);
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
      <div>
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
        <Dialog open={this.state.open} disableBackdropClick={false}>
          <DialogTitle>New Order</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Order successful.Please check My Profile page for order status.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Link to={"/user/" + auth.isAuthenticated().user._id}>
              <Button color="primary" autoFocus="autoFocus" variant="raised">
                MY PROFILE
              </Button>
            </Link>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
Buyfeed.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Buyfeed);

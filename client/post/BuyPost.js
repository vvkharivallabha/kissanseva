import React, { Component } from "react";
import Card, { CardHeader, CardContent, CardActions } from "material-ui/Card";
import Button from "material-ui/Button";
import TextField from "material-ui/TextField";
import Typography from "material-ui/Typography";
import Avatar from "material-ui/Avatar";
import Icon from "material-ui/Icon";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import auth from "../auth/auth-helper";
import { create } from "./api-buypost.js";

const styles = theme => ({
  root: {
    backgroundColor: "#05c46b",
    padding: `${theme.spacing.unit * 3}px 0px 1px`
  },
  card: {
    width: 290,
    padding: 10,
    margin: "auto",
    marginBottom: theme.spacing.unit * 3,
    backgroundColor: "#d2dae2",
    boxShadow: "none"
  },
  cardContent: {
    backgroundColor: "#d2dae2",
    paddingTop: 0
  },
  cardHeader: {
    //marginLeft: "20%"
  },
  text: {
    textAlign: "center",
    margin: theme.spacing.unit * 2
  },
  photo: {
    textAlign: "center",
    backgroundColor: "#f2f5f4",
    padding: theme.spacing.unit,
    width: 200
  },
  media: {
    height: 200
  },
  button: {
    margin: theme.spacing.unit
  },
  submit: {
    marginLeft: "25%"
  }
});

class BuyPost extends Component {
  state = {
    product: "",
    product_quantity: 0,
    photo: "",
    error: "",
    user: {},
    open: false
  };

  clickPost = () => {
    this.postData.set("product_quantity", this.state.product_quantity);
    this.postData.set("purchased", "false");
    console.log(this.postData.product);
    this.props.post.product_quantity =
      this.props.post.product_quantity - this.state.product_quantity;
    this.state.product_quantity = 0;
    const jwt = auth.isAuthenticated();
    console.log(this.postData);
    create(
      {
        userId: jwt.user._id
      },
      {
        t: jwt.token
      },
      this.postData
    ).then(data => {
      if (data.error) {
        this.setState({ error: data.error });
      } else {
        this.props.addUpdate(data);
      }
    });
  };

  componentDidMount = () => {
    this.setState({ user: auth.isAuthenticated().user });
    this.setState({ user: auth.isAuthenticated().user });
    this.postData = new FormData();
    console.log(this.props.post);
  };
  handleChange = name => event => {
    let value = name === "photo" ? event.target.files[0] : event.target.value;
    if (name === "product_quantity_1") {
      if (
        this.state.product_quantity >= 0 &&
        this.state.product_quantity < this.props.post.product_quantity
      )
        this.setState({
          ["product_quantity"]: parseInt(this.state.product_quantity) + 1
        });

      this.postData.set("product", this.props.post.product);
      this.postData.set("product_quantity", this.state.product_quantity);
      this.postData.set(
        "totalcost",
        this.props.post.totalcost * this.state.product_quantity
      );
      this.postData.set("photo", this.props.post.photo);
    } else if (name === "product_quantity_2") {
      if (
        this.state.product_quantity > 0 &&
        this.state.product_quantity <= this.props.post.product_quantity
      )
        this.setState({
          ["product_quantity"]: parseInt(this.state.product_quantity) - 1
        });

      this.postData.set("product", this.props.post.product);
      this.postData.set("product_quantity", this.state.product_quantity);
      this.postData.set(
        "totalcost",
        this.props.post.totalcost * this.state.product_quantity
      );
      this.postData.set("photo", this.props.post.photo);
    }
  };
  render() {
    const { classes } = this.props;
    return (
      <div className={[classes.root]}>
        <Card className={classes.card}>
          <CardHeader
            title={this.props.post.product}
            subheader={new Date(this.props.post.created).toDateString()}
            className={classes.cardHeader}
          />
          <CardContent className={classes.cardContent}>
            {this.props.post.photo && (
              <div className={classes.photo}>
                <img
                  className={classes.media}
                  src={"/api/sellposts/photo/" + this.props.post._id}
                />
              </div>
            )}
            <Typography component="p" className={classes.text}>
              {this.props.post.product_description}
            </Typography>
            <Typography component="p" className={classes.text}>
              Quantity: {this.props.post.product_quantity}
            </Typography>
            <Typography component="p" className={classes.text}>
              Cost (Per Item): {this.props.post.totalcost}
            </Typography>
            <Typography className={classes.submit}>
              Select Req Quantity
            </Typography>
            <Button
              className={classes.submit}
              variant="contained"
              size="small"
              onClick={this.handleChange("product_quantity_1")}
            >
              +
            </Button>
            <label onChange={this.handleChange("product_quantity")}>
              {this.state.product_quantity}
            </label>
            <Button
              variant="contained"
              size="small"
              onClick={this.handleChange("product_quantity_2")}
            >
              -
            </Button>
          </CardContent>
          <CardActions>
            <Button
              color="primary"
              variant="raised"
              disabled={this.state.product_quantity === 0}
              onClick={this.clickPost}
              className={classes.submit}
            >
              SAVE TO CART
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

BuyPost.propTypes = {
  classes: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  addUpdate: PropTypes.func.isRequired
};

export default withStyles(styles)(BuyPost);

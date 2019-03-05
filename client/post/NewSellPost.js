import React, { Component } from "react";
import Card, { CardHeader, CardContent, CardActions } from "material-ui/Card";
import Button from "material-ui/Button";
import TextField from "material-ui/TextField";
import Typography from "material-ui/Typography";
import Avatar from "material-ui/Avatar";
import Icon from "material-ui/Icon";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import { create } from "./api-sellpost.js";
import auth from "../auth/auth-helper";
import IconButton from "material-ui/IconButton";
import PhotoCamera from "material-ui-icons/PhotoCamera";

const styles = theme => ({
  root: {
    backgroundColor: "#efefef",
    padding: `${theme.spacing.unit * 3}px 0px 1px`
  },
  card: {
    maxWidth: 600,
    margin: "auto",
    marginBottom: theme.spacing.unit * 3,
    backgroundColor: "rgba(65, 150, 136, 0.09)",
    boxShadow: "none"
  },
  cardContent: {
    backgroundColor: "white",
    paddingTop: 0,
    paddingBottom: 0
  },
  cardHeader: {
    paddingTop: 8,
    paddingBottom: 8
  },
  photoButton: {
    height: 30,
    marginBottom: 5
  },
  input: {
    display: "none"
  },
  textField: {
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    width: "90%"
  },
  submit: {
    margin: theme.spacing.unit * 2
  },
  filename: {
    verticalAlign: "super"
  }
});

class NewSellPost extends Component {
  state = {
    product: "",
    product_description: "",
    product_quantity: "",
    error: "",
    open: false,
    user: {}
  };

  componentDidMount = () => {
    this.setState({ user: auth.isAuthenticated().user });
  };
  clickPost = () => {
    const jwt = auth.isAuthenticated();
    this.postData = {
      product: this.state.product || undefined,
      product_description: this.state.product_description || undefined,
      product_quantity: this.state.product_quantity || undefined
    };
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
        this.setState({
          product: "",
          product_description: "",
          product_quantity: "",
          error: "",
          open: true
        });
        this.props.addUpdate(data);
      }
    });
  };
  handleChange = name => event => {
    const value = event.target.value;
    this.setState({ [name]: value });
    console.log({ [name]: value });
  };
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Card className={classes.card}>
          <CardHeader title={"Add"} className={classes.cardHeader} />
          <CardContent className={classes.cardContent}>
            <TextField
              placeholder="Product Name"
              value={this.state.product}
              onChange={this.handleChange("product")}
              className={classes.textField}
              margin="normal"
            />
            <TextField
              placeholder="Product Description"
              value={this.state.product_description}
              onChange={this.handleChange("product_description")}
              className={classes.textField}
              margin="normal"
            />
            <TextField
              placeholder="Product Quantity"
              value={this.state.product_quantity}
              onChange={this.handleChange("product_quantity")}
              className={classes.textField}
              margin="normal"
            />
            <Typography>Product picture</Typography>
            <input
              accept="image/*"
              onChange={this.handleChange("photo")}
              className={classes.input}
              id="icon-button-file"
              type="file"
            />
            {/* <label htmlFor="icon-button-file">
              <IconButton
                color="secondary"
                className={classes.photoButton}
                component="span"
              >
                <PhotoCamera />
              </IconButton>
            </label>{" "}
            <span className={classes.filename}>
              {this.state.photo ? this.state.photo.name : ""}
            </span> */}
            {this.state.error && (
              <Typography component="p" color="error">
                <Icon color="error" className={classes.error}>
                  error
                </Icon>
                {this.state.error}
              </Typography>
            )}
          </CardContent>
          <CardActions>
            <Button
              color="primary"
              variant="raised"
              disabled={this.state.text === ""}
              onClick={this.clickPost}
              className={classes.submit}
            >
              POST
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

NewSellPost.propTypes = {
  classes: PropTypes.object.isRequired,
  addUpdate: PropTypes.func.isRequired
};

export default withStyles(styles)(NewSellPost);

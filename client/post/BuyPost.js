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
import { sellPostByID } from "./api-sellpost";

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

class BuyPost extends Component {
  state = {
    sellposts: []
  };

  componentDidMount = () => {
    this.setState({ user: auth.isAuthenticated().user });
    this.loadSellPosts();
  };

  loadSellPosts = () => {
    console.log("entered loadSellPosts");
    const jwt = auth.isAuthenticated();
    sellPostByID(
      {
        userId: user
      },
      {
        t: jwt.token
      }
    ).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({ sellposts: data });
        console.log(sellposts);
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
          <CardHeader title={"Items"} className={classes.cardHeader} />
          <CardContent className={classes.cardContent}>
            <Typography component="p" className={classes.text}>
              {this.props.post.product}
            </Typography>
            {/* {this.props.post.photo &&
            (<div className={classes.photo}>
              <img
                className={classes.media}
                src={'/api/posts/photo/'+this.props.post._id}
                />
            </div>)} */}
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
              BUY
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
  onRemove: PropTypes.func.isRequired
};

export default withStyles(styles)(BuyPost);

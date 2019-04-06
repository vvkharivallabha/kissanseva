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
  }
});

class BuyPost extends Component {
  // state = {
  //   sellposts: []
  // };

  componentDidMount = () => {
    this.setState({ user: auth.isAuthenticated().user });
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
          </CardContent>
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

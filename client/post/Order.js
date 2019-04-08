import React, { Component } from "react";
import auth from "./../auth/auth-helper";
import Card, { CardHeader, CardContent, CardActions } from "material-ui/Card";
import Typography from "material-ui/Typography";
import Avatar from "material-ui/Avatar";
import IconButton from "material-ui/IconButton";
import DeleteIcon from "material-ui-icons/Delete";
import FavoriteIcon from "material-ui-icons/Favorite";
import FavoriteBorderIcon from "material-ui-icons/FavoriteBorder";
import CommentIcon from "material-ui-icons/Comment";
import Divider from "material-ui/Divider";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import { Link } from "react-router-dom";
import Comments from "./Comments";

const styles = theme => ({
  card: {
    maxWidth: 600,
    margin: "auto",
    marginBottom: theme.spacing.unit * 3,
    backgroundColor: "rgba(0, 0, 0, 0.06)"
  },
  cardContent: {
    backgroundColor: "white",
    padding: `${theme.spacing.unit * 2}px 0px`
  },
  cardHeader: {
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit
  },
  text: {
    margin: theme.spacing.unit * 2
  },
  photo: {
    textAlign: "center",
    backgroundColor: "#f2f5f4",
    padding: theme.spacing.unit
  },
  media: {
    height: 200
  },
  button: {
    margin: theme.spacing.unit
  }
});

class Order extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
        <Typography component="p" className={classes.text}>
            Transaction ID : {this.props.post.trans_id}
          </Typography>
          <Typography component="p" className={classes.text}>
            Product: {this.props.post.product}
          </Typography>
          <Typography component="p" className={classes.text}>
            Quantity: {this.props.post.product_quantity}
          </Typography>
          <Typography component="p" className={classes.text}>
            List Cost:{" "}
            {this.props.post.totalcost * this.props.post.product_quantity}
          </Typography>
          <Typography component="p" className={classes.text}>
            Verification Status: {this.props.post.verified}
          </Typography>
        </CardContent>
      </Card>
    );
  }
}

Order.propTypes = {
  classes: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired
};

export default withStyles(styles)(Order);

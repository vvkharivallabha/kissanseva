import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Card, { CardContent, CardMedia } from "material-ui/Card";
import Typography from "material-ui/Typography";
import seashellImg from "./../assets/images/seashell.jpg";
import { Link } from "react-router-dom";
import Grid from "material-ui/Grid";
import auth from "./../auth/auth-helper";
import FindPeople from "./../user/FindPeople";
import Newsfeed from "./../post/Newsfeed";

const styles = theme => ({
  root: {
    flexGrow: 1,
    margin: 30
  },
  card: {
    maxWidth: 600,
    margin: "auto",
    marginTop: theme.spacing.unit * 5
  },
  title: {
    padding: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 2.5}px ${theme
      .spacing.unit * 2}px`,
    color: theme.palette.text.secondary
  },
  media: {
    minHeight: 330
  }
});

class Sell extends Component {
  
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={8} sm={7}>
            <Newsfeed />
          </Grid>
          {/* <Grid item xs={6} sm={5}>
            <FindPeople />
          </Grid> */}
        </Grid>
      </div>
    );
  }
}

Sell.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Sell);

import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Card, { CardContent, CardMedia } from "material-ui/Card";
import Typography from "material-ui/Typography";
import seashellImg from "./../assets/images/seashell.jpg";
import { Link } from "react-router-dom";
import Grid from "material-ui/Grid";
import auth from "./../auth/auth-helper";
import Buyfeed from "./../post/Buyfeed";

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

class Buy extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={8} sm={7}>
            <Buyfeed />
          </Grid>
        </Grid>
      </div>
    );
  }
}

Buy.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Buy);

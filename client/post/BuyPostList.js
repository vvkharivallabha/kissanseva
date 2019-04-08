import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import BuyPost from "./BuyPost";
import CartList from "./CartList";
import Grid from "material-ui/Grid";
import auth from "../auth/auth-helper";
import Card from "material-ui/Card";

const styles = theme => ({
  card: {
    // maxWidth : 400,
    //margin: "left",
    paddingTop: 0,
    paddingBottom: theme.spacing.unit * 3,
    height : 600
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
    width: 350,
    height: 500,
    overflow: "auto"
  }
});

class BuyPostList extends Component {
  state = {
    cartposts: []
  };
  addPost = post => {
    const updatedPosts = this.state.cartposts;
    updatedPosts.unshift(post);
    this.setState({ cartposts: updatedPosts });
    console.log(this.state.cartposts);
    this.props.addUpdate(post);
  };
  render() {
    //console.log(this.props.buyposts);
    for(let i=0;i<this.props.buyposts.length;i++)
    {
      if(auth.isAuthenticated().user.role === "Retailer")
      {
        if(this.props.buyposts[i].postedRole === "Supplier")
        {
          this.props.buyposts[i] =0 ;
        }
      }
      if(auth.isAuthenticated().user.role === "Farmer")
      {
        if(this.props.buyposts[i].postedRole === "Farmer")
        {
          console.log(this.props.buyposts[i].postedRole);
          this.props.buyposts[i] =0;
        }
      }
    }
    let array = [];
    for(let i=0;i<this.props.buyposts.length;i++)
    {
      if(this.props.buyposts[i]!=0)
      {
        array.push(this.props.buyposts[i]);
      }
    }
    //console.log(array);

    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array.length; j++) {
        if (
          i != j &&
          array[i].product === array[j].product
        ) {
          if (array.photo !== undefined) {
            array[i].product_quantity =
              parseInt(array[i].product_quantity) +
              parseInt(array[j].product_quantity);
              array.splice(j, 1);
          } else if (array[j].photo !== undefined) {
            array[j].product_quantity =
              parseInt(array[i].product_quantity) +
              parseInt(array[j].product_quantity);
              array.splice(i, 1);
          } else {
            array[i].product_quantity =
              parseInt(array[i].product_quantity) +
              parseInt(array[j].product_quantity);
              array.splice(j, 1);
          }
        }
      }
    }

    return (
      <div style={{ marginTop: "24px" }}>
        <Grid
          container
          direction="column"
          justify="space-around"
          alignItems="flex-start"
        >
          {array.map((item, i) => {
            return (
              <BuyPost post={item} key={i} addUpdate={this.addPost} />
            );
          })}
        </Grid>
      </div>
    );
  }
}
BuyPostList.propTypes = {
  buyposts: PropTypes.array.isRequired,
  addUpdate: PropTypes.func.isRequired
};
export default withStyles(styles)(BuyPostList);

import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import BuyPost from "./BuyPost";
import Grid from "material-ui/Grid"

class BuyPostList extends Component {
  render() {
    return (
      <div style={{ marginTop: "24px" }}>
      <Grid container  direction="column" justify ="space-around" alignItems = "flex-start">
        {this.props.buyposts.map((item, i) => {
          return (
            <BuyPost
              post={item}
              key={i}
              onRemove={this.props.removeUpdate}
            />
          );
        })}
        </Grid>
      </div>
    );
  }
}
BuyPostList.propTypes = {
  buyposts: PropTypes.array.isRequired,
  removeUpdate: PropTypes.func.isRequired
};
export default BuyPostList;

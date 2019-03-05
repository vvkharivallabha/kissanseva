import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import BuyPost from "./BuyPost";

class BuyPostList extends Component {
  render() {
    return (
      <div style={{ marginTop: "24px" }}>
        {this.props.posts.map((item, i) => {
          return (
            <BuyPost
              post={item}
              key={i}
              onRemove={this.props.removeUpdate}
            />
          );
        })}
      </div>
    );
  }
}
BuyPostList.propTypes = {
  posts: PropTypes.array.isRequired,
  removeUpdate: PropTypes.func.isRequired
};
export default BuyPostList;

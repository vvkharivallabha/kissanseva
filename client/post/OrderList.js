import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Order from "./Order";

class OrderList extends Component {
  render() {
    return (
      <div style={{ marginTop: "24px" }}>
        {this.props.posts.map((item, i) => {
          return (
            <Order post={item} key={i}/>
          );
        })}
      </div>
    );
  }
}
OrderList.propTypes = {
  posts: PropTypes.array.isRequired
};
export default OrderList;

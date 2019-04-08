import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Button from "material-ui/Button";
import { Link } from "react-router-dom";
import AppBar from "material-ui/AppBar";
import Typography from "material-ui/Typography";
import Tabs, { Tab } from "material-ui/Tabs";
import FollowGrid from "./../user/FollowGrid";
import PostList from "./../post/PostList";
import OrderList from "./../post/OrderList";

class ProfileTabs extends Component {
  state = {
    tab: 0,
    posts: []
  };

  componentWillReceiveProps = props => {
    this.setState({ tab: 0 });
  };
  handleTabChange = (event, value) => {
    this.setState({ tab: value });
  };

  render() {
    return (
      <div>
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.tab}
            onChange={this.handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            fullWidth
          >
            <Tab label="Posts" />
            <Tab label="Orders" />
          </Tabs>
        </AppBar>
        {this.state.tab === 0 && (
          <TabContainer>
            <PostList
              removeUpdate={this.props.removePostUpdate}
              posts={this.props.posts}
            />
          </TabContainer>
        )}
        {this.state.tab === 1 && (
          <TabContainer>
            <OrderList posts={this.props.cartposts} />
          </TabContainer>
        )}
      </div>
    );
  }
}

ProfileTabs.propTypes = {
  user: PropTypes.object.isRequired,
  removePostUpdate: PropTypes.func.isRequired,
  posts: PropTypes.array.isRequired,
  cartposts: PropTypes.array.isRequired
};

const TabContainer = props => {
  return (
    <Typography component="div" style={{ padding: 8 * 2 }}>
      {props.children}
    </Typography>
  );
};

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

export default ProfileTabs;

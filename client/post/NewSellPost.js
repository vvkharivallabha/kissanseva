import React, { Component } from "react";
import Card, { CardHeader, CardContent, CardActions } from "material-ui/Card";
import Button from 'material-ui/Button';
import TextField from "material-ui/TextField";
import Typography from "material-ui/Typography";
import Avatar from "material-ui/Avatar";
import Icon from "material-ui/Icon";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import { create,listItems } from "./api-sellpost.js";
import auth from "../auth/auth-helper";
import IconButton from "material-ui/IconButton";
import PhotoCamera from "material-ui-icons/PhotoCamera"; 
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/Menu/MenuItem'
import List from 'material-ui/List'
import ListItem from 'material-ui/List/ListItem'
import ListItemText from 'material-ui/List/ListItemText'

let count=0
const styles = theme => ({
  root: {
    backgroundColor: "#05c46b",
    padding: `${theme.spacing.unit * 3}px 0px 1px`,
  },
  card: {
    maxWidth: 400,
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
    marginLeft: "20%"
  },
  photoButton: {
    height: 30,
    marginBottom: 5,
    marginLeft: "10%"
  },
  input: {
    display: "none"
  },
  textField: {
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    width: "90%"
  },
  button: {
    color : "#d2dae2"
  },
  submit: {
    marginLeft: "35%"
  },
  filename: {
    verticalAlign: "super"
  }
});

class NewSellPost extends Component {
  state = {
    items:[],
    product: "",
    product_description: "",
    product_quantity: 0,
    photo: "",
    error: "",
    anchorEl: null,
    index:1,
    totalcost : "",
    user: {},
    open: false
  };
  handleClickListItem = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuItemClick = (event, i) => {
    this.setState({ index: i, anchorEl: null });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  itemvalue = () => {
    if (this.state.items[this.state.index] === undefined)
    {
      return "Please select option";
    }
    else
    {
      this.state.product = this.state.items[this.state.index].product_name;
      this.postData.set("product",this.state.product)
      return this.state.items[this.state.index].product_name;
    }
  };
  itemcost = () => {
    if (this.state.items[this.state.index] === undefined)
    {
      return "Please select option";
    }   
    else
    {
      this.state.totalcost = this.state.items[this.state.index].cost;
      this.postData.set("totalcost",this.state.totalcost)
      return this.state.items[this.state.index].cost;
    }
  };
  componentDidMount = () => {
    this.postData = new FormData();
    this.setState({ user: auth.isAuthenticated().user });
    this.loadItems();
    this.itemvalue();
    this.itemcost();
  };
  loadItems = () => {
    listItems().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({ items: data });
      }
    });
  };
  clickPost = () => {
    console.log(this.postData.product);
    this.props.sellposts.map((item, i) =>{
      console.log(this.props.sellposts[i].product);
      if(item.product === this.postData.product)
      {
        this.postData.set("product_quantity",this.postData.product_quantity+item.product_quantity);
        console.log(item.product);
      }
    });
    this.postData.set("postedRole", this.state.user.role);
    const jwt = auth.isAuthenticated();
    create(
      {
        userId: jwt.user._id
      },
      {
        t: jwt.token
      },
      this.postData
    ).then(data => {
      if (data.error) {
        this.setState({ error: data.error });
      } else {
        count=0;
        this.setState({
          product: "",
          product_description: "",
          product_quantity: "",
          totalcost:"",
          photo: "",
          error: "",
          index: 1,
          open: true
        });
        this.props.addUpdate(data);
      }
    });
  };
  handleChange = name => event => {
    let value = name === "photo" ? event.target.files[0] : event.target.value;
    if(name==="product_quantity_1")
    {
      name="product_quantity";
      if(count >= 0 && count < 10)
      count = count+1;
      value=count;
      this.postData.set("totalcost",this.state.totalcost*count);
    }
    else if(name==="product_quantity_2")
    {
      name="product_quantity";
      if(count > 0 && count <= 10)
      count = count-1;
      value=count;
      this.postData.set("totalcost",this.state.totalcost*count);
    }
    this.postData.set(name, value);
    this.setState({ [name]: value });
  };
  render() {
    const { anchorEl } = this.state;
    const { classes } = this.props;
    return (
      <div className={[classes.root]}  style={{marginTop: '24px'}}>
        <Card className={classes.card}>
          <CardHeader
            title={"Add Single Listing"}
            className={classes.cardHeader}
          />
          <CardContent className={classes.cardContent}>
            <List component="nav">
              <ListItem
                button
                aria-haspopup="true"
                aria-controls="lock-menu"
                aria-label="When device is locked"
                onClick={this.handleClickListItem}
                className={classes.textField}
              >
              <ListItemText className={classes.textField} primary="Product" secondary = {this.itemvalue()}/>
              <ListItemText className={classes.textField} primary="Cost" secondary = {this.itemcost()}/>
              </ListItem>
            </List>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={this.handleClose}>
              {this.state.items.map((it,i) => {
                return <MenuItem selected={i === this.state.index} onClick={event => this.handleMenuItemClick(event, i)}>{it.product_name}</MenuItem>
              })
              }
            </Menu>
            <TextField
              placeholder="Product Description"
              value={this.state.product_description}
              onChange={this.handleChange("product_description")}
              className={classes.textField}
              margin="normal"
            />
            <Typography className={classes.textField}>
              Quantity
            </Typography>
              <Button variant="contained" size = "small"  onClick={this.handleChange("product_quantity_1")}>+</Button>
              <label value={count} className={classes.textField} onChange={this.handleChange("product_quantity")}>{this.state.product_quantity}</label>
              <Button variant="contained" size = "small" onClick={this.handleChange("product_quantity_2")}>-</Button>
            <Typography className={classes.textField}>
              Total Cost : {this.itemcost()*this.state.product_quantity}
             </Typography>
            <Typography className={classes.textField}>
              Product picture
            </Typography>
            <input
              accept="image/*"
              onChange={this.handleChange("photo")}
              className={classes.input}
              id="icon-button-file"
              type="file"
            />
            <input
              accept="image/*"
              onChange={this.handleChange("photo")}
              className={classes.input}
              id="icon-button-file"
              type="file"
            />
            <label htmlFor="icon-button-file">
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
            </span>
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
              disabled={this.state.product === "" || this.state.product_quantity=== ""}
              onClick={this.clickPost}
              className={classes.submit}
            >
              POST
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

NewSellPost.propTypes = {
  classes: PropTypes.object.isRequired,
  sellposts: PropTypes.array.isRequired,
  addUpdate: PropTypes.func.isRequired
};

export default withStyles(styles)(NewSellPost);

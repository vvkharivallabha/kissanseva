import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from 'material-ui/styles'
import Grid from "material-ui/Grid"
import Typography from 'material-ui/Typography'
import Cart from "./Cart";

class CartList extends Component {
  render() {
    for(let i=0;i<this.props.cartposts.length;i++)
    {
      for(let j=0;j<this.props.cartposts.length;j++)
      {
          if(i!=j && this.props.cartposts[i].product === this.props.cartposts[j].product)
          {
              this.props.cartposts[i].product_quantity = parseInt(this.props.cartposts[i].product_quantity)+parseInt(this.props.cartposts[j].product_quantity);
              this.props.cartposts[i].totalcost = parseInt(this.props.cartposts[i].totalcost )+parseInt(this.props.cartposts[j].totalcost );
              this.props.cartposts.splice(j,1);
          }
      }
    }

    return (
      <div style={{marginTop: '24px'}}>
      <Grid container  direction="column" justify ="space-around" alignItems = "flex-start">
        {this.props.cartposts.map((item, i) => {
            return <Cart post={item} key={i} onRemove={this.props.removeUpdate}/>
          })
        }
        </Grid>
      </div>
    )
  }
}
CartList.propTypes = {
  cartposts: PropTypes.array.isRequired,
  removeUpdate: PropTypes.func.isRequired
}
export default CartList

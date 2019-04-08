import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from 'material-ui/styles'
import SellPost from './SellPost'
import Grid from "material-ui/Grid"
import Typography from 'material-ui/Typography'


class SellPostList extends Component {
  render() {
    for(let i=0;i<this.props.sellposts.length;i++)
    {
      for(let j=0;j<this.props.sellposts.length;j++)
      {
          if(i!=j && this.props.sellposts[i].product === this.props.sellposts[j].product)
          {
            if(this.props.sellposts[i].photo !== undefined)
            {
              this.props.sellposts[i].product_quantity = parseInt(this.props.sellposts[i].product_quantity)+parseInt(this.props.sellposts[j].product_quantity);
              this.props.sellposts.splice(j,1);
            }
            else if(this.props.sellposts[j].photo !== undefined)
            {
              this.props.sellposts[j].product_quantity = parseInt(this.props.sellposts[i].product_quantity)+parseInt(this.props.sellposts[j].product_quantity);
              this.props.sellposts.splice(i,1);
            }
            else{
              this.props.sellposts[i].product_quantity = parseInt(this.props.sellposts[i].product_quantity)+parseInt(this.props.sellposts[j].product_quantity);
              this.props.sellposts.splice(j,1);
            }
          }
      }
    }
    return (
      <div style={{marginTop: '24px'}}>
      <Grid container  direction="column" justify ="space-around" alignItems = "flex-start">
        {this.props.sellposts.map((item, i) => {
            return <SellPost post={item} key={i} onRemove={this.props.removeUpdate}/>
          })
        }
        </Grid>
      </div>
    )
  }
}
SellPostList.propTypes = {
  sellposts: PropTypes.array.isRequired,
  removeUpdate: PropTypes.func.isRequired
}
export default SellPostList

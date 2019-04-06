import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from 'material-ui/styles'
import SellPost from './SellPost'
import Grid from "material-ui/Grid"
import Typography from 'material-ui/Typography'

class SellPostList extends Component {
  render() {
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

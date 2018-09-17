import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import Yt from 'react-youtube'
import { List, ListItemText, Typography, withStyles, Divider } from '@material-ui/core'



const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 20,
  }
});

const SearchResult = (props) => {
  let res = props.search.map((rocket, id) => (
    <List key={id}>
      <ListItemText style={{marginLeft: 24, marginBottom: 5}}>
        <Typography variant="title" color="inherit">
          {rocket.mission_name}
        </Typography>
      </ListItemText>
      <ListItemText>
        Launch number: {rocket.flight_number}
        {rocket.launch_success}
      </ListItemText>
      <ListItemText>
        {moment(rocket.launch_date_local).format('LLLL')}
      </ListItemText>
      <ListItemText>
        Details: {rocket.details}
      </ListItemText>
      <ListItemText>
          <Yt videoId={rocket.links.video_link === null ? "bvim4rsNHkQ": rocket.links.video_link.split('v=')[1].substring(0, 11)} /> 
      </ListItemText>
      <li>
        <Divider />
        </li>
    </List>
  ))

  return (
    <List>
      {res}
    </List>
  )
}
SearchResult.propTypes = {
  classes: PropTypes.object.isRequired
}
export default withStyles(styles)(SearchResult)
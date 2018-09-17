import React from 'react';
import moment from 'moment'
import PropTypes from 'prop-types'
import Countdown from './Countdown.jsx'
import { List, ListItemText, withStyles } from '@material-ui/core';
const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 20,
  },
});

const Details = (props) => {
  if(props.launch.length) {
    const remaining = moment(props.lTime)
    const detail = props.launch[0]
    const suffix = props.launch[0].mission_number.toString().slice(-1)
    return (
      <List>
        <ListItemText>
        </ListItemText>
        <ListItemText>
      Next Launch: <Countdown dateTo = {remaining}/>
        </ListItemText>
        <ListItemText>
This will be the {detail.mission_number}{suffix === 1 ? 'st' : suffix === 2 ? 'nd' : suffix === 3 ? 'rd' : 'th'} launch. The {detail.rocket_name} will be carrying the {detail.mission_name} for {detail.customers}. 
The {detail.payload_mass_kg ? `${detail.payload_mass_kg} KG`:''} {detail.payload_type ? `${detail.payload_type}` : 'payload'} will be put into a {detail.regime} {detail.orbit} orbit{detail.inclination_deg ? ` with an inclination of ${detail.inclination_deg} degrees. ` : '. '}
        {detail.lifespan ? `It has an operational lifespan of ${detail.lifespan} years.` : ''}
        </ListItemText>
      </List>
    );
  }
  else{
    return null
  }
}

Details.propTypes = {
  detail: PropTypes.object.isRequired,
  remaining: PropTypes.object.isRequired,
  suffix: PropTypes.string.isRequired
};

export default withStyles(styles)(Details)
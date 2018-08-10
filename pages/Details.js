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
    const suffix = props.launch[0].mission_number.toString().slice(-1)
    return (
      <List>
        <ListItemText>
        </ListItemText>
        <ListItemText>
      Next Launch: <Countdown dateTo = {remaining}/>
        </ListItemText>
        <ListItemText>
This will be the {props.launch[0].mission_number}{suffix === 1 ? 'st' : suffix === 2 ? 'nd' : suffix === 3 ? 'rd' : 'th'} launch. The {props.launch[0].rocket_name} will be carrying the {props.launch[0].mission_name} for {props.launch[0].customers}. The {props.launch[0].payload_mass_kg} KG {props.launch[0].payload_type} will be put into a {props.launch[0].regime} {props.launch[0].orbit} orbit{props.launch[0].inclination_deg ? ` with an inclination of ${props.launch[0].inclination_deg} degrees. ` : '. '}
        It has an operational lifespan of {props.launch[0].lifespan} years.
        </ListItemText>
      </List>
    );
  }
  else{
    return null
  }
}

Details.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Details)
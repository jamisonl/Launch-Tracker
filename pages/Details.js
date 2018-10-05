import React from 'react';
import moment from 'moment'
import PropTypes from 'prop-types'
import Countdown from './Countdown.jsx'
import { List, ListItem, ListItemText, Typography } from '@material-ui/core';

const Details = (props) => {
  if(props.launch.length) {
    const remaining = moment(props.lTime)
    const detail = props.launch[0]
    const suffix = num=>num+(num%10==1&&num%100!=11?'st':num%10==2&&num%100!=12?'nd':num%10==3&&num%100!=13?'rd':'th')
    return (
      <List>
        <ListItem id='countdownLi'>
      <Typography variant='subheading' color='secondary' align='justify' style={{paddingTop: '.5%'}} id="countdownClock"><Countdown dateTo = {remaining}/></Typography>
        </ListItem>
        <ListItem style={{width: '60%'}} id="upcomingDetails" >
        <Typography align='justify' variant='body1'>
This will be the {suffix(detail.mission_number)} launch. The {detail.rocket_name} will be carrying the {detail.mission_name} {detail.payload_type} for {detail.customers}. 
The {detail.payload_mass_lbs ? `${detail.payload_mass_lbs} lbs`:''} {detail.payload_type ? `${detail.payload_type}` : 'payload'} will be put into a {detail.regime} {detail.orbit} orbit{detail.inclination_deg ? ` with an inclination of ${detail.inclination_deg} degrees. ` : '. '}
        {detail.lifespan ? `${detail.payload_type ? `The ${detail.payload_type}` : 'It'} has an operational lifespan of ${detail.lifespan} years.` : ''} 
        {detail.block ? `This is a ${detail.rocket_name} Block ${detail.block} booster ${detail.flight ? `on its ${suffix(detail.flight)} flight. ` : ''}` : ''} 
        {detail.launch_site ? `It will launch from ${detail.launch_site}.` : ''} {detail.landing_type ? `It will attempt an ${detail.landing_type} landing on ${detail.landing_vehicle}.` : ''}
        </Typography>
        </ListItem>
      </List>
    );
  }
  else{
    return null
  }
}

Details.propTypes = {
  detail: PropTypes.object,
  remaining: PropTypes.object,
};

export default Details
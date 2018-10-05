import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import Yt from 'react-youtube'
import { List, ListItem, ListItemText, Typography, Divider } from '@material-ui/core'

const SearchResult = (props) => {
  const suffix = num=>num+(num%10==1&&num%100!=11?'st':num%10==2&&num%100!=12?'nd':num%10==3&&num%100!=13?'rd':'th')
  let res = props.search.map((rocket, id) => (
    <List key={id}>
      <ListItem style={{marginLeft: 0}}>
        <Typography variant="title" color="inherit">
          {rocket.mission_name}
        </Typography>
      </ListItem>
      <ListItem>
      <Typography variant='body1'>
      {suffix(rocket.flight_number)} launch
      </Typography>
      </ListItem>
      <ListItem>
      <Typography variant='body1'>
        {moment(rocket.launch_date_local).format('LLLL')}
      </Typography>
      </ListItem>
      <ListItem style={{width: '60%'}}>
      <Typography variant='body1'>
        {rocket.details}
      </Typography>
      </ListItem>
      <ListItem>
      <Typography variant='body1'>
        {rocket.rocket.rocket_name} {rocket.rocket.first_stage.cores[0].block ? `block ${rocket.rocket.first_stage.cores[0].block}` : ''} { rocket.rocket.first_stage.cores[0].flight ? suffix(rocket.rocket.first_stage.cores[0].flight) : ''} flight.
          {rocket.launch_site.site_name_long ? ` Launch site is ${rocket.launch_site.site_name_long}.` : ''}
      </Typography>
      </ListItem>
      <ListItem>
        <Typography variant='body1'>
          {rocket.rocket.second_stage.payloads[0].payload_id ? `Payload is the ${rocket.rocket.second_stage.payloads[0].payload_id} ${rocket.rocket.second_stage.payloads[0].payload_type} ` : ''}
          {rocket.rocket.second_stage.payloads[0].customers[0] ? `for ${rocket.rocket.second_stage.payloads[0].customers[0]} ` : ''}
          {rocket.rocket.second_stage.payloads[0].manufacturer ? `manufactured by ${rocket.rocket.second_stage.payloads[0].manufacturer}. ` : ''}
          {rocket.rocket.second_stage.payloads[0].payload_mass_kg ? ` It weighs ${rocket.rocket.second_stage.payloads[0].payload_mass_kg } kgs. ` : ''}
          {rocket.rocket.second_stage.payloads[0].orbit_params.regime ? `It is in a ${rocket.rocket.second_stage.payloads[0].orbit_params.regime} orbit.` :''}

        </Typography>
      </ListItem>
      <ListItem>
        <Typography variant='body1'>
        {!rocket.upcoming ? rocket.rocket.first_stage.cores.map((core, idx) => <a key={idx}>
        {core.landing_type && core.land_success ? `Completed an ${core.landing_type} landing ${core.landing_vehicle ? ` on ${core.landing_vehicle}. ` : ''}` : ''}
        {core.landing_type && !core.land_success ? `Failed to complete an ${core.landing_type} landing. ` : ''}
        {!core.landing_type ? `No landing attempted. ` :''}
        </a>) : ''}

        </Typography>
      </ListItem>
      <ListItem>
        <Typography variant='body1'>
          <a href={rocket.links.wikipedia} rel="noopener noreferrer" target="_blank"> {rocket.links.wikipedia ? 'wiki' : ''}</a>
        </Typography>
      </ListItem>
      <ListItem>
          <Yt videoId={rocket.links.video_link === null ? "bvim4rsNHkQ": rocket.links.video_link.split('v=')[1].substring(0, 11)} /> 
      </ListItem>
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
  rocket: PropTypes.string
}

export default SearchResult
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Details from './Details.js';
import Search from './Search.jsx'
import axios from 'axios';
import {CssBaseline, AppBar, Toolbar, Typography, IconButton, Icon, SvgIcon} from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home'

const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 20,
  },
});

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lTime: '',
      futureLaunch: [],
      next: ''
    }
  }

  componentDidMount() {
    this.checkLaunchNum()
  }
  componentWillUnmount() {
    this.unmounted = true;
  }
  checkLaunchNum = () => {
    axios.get('https://api.spacexdata.com/v2/launches/next')
    .then(res => {
      if(this.unmounted) return;
      this.setState({
        next: res.data.flight_number,
        lTime: res.data.launch_date_local
      })
      this.nextLaunch(res.data.flight_number)
    })
  }

  nextLaunch = (num) => {
    axios.get(`http://localhost:1336/api/flight_number_future/${num}`)
    .then(flight => {
      if(this.unmounted) return;
        this.setState({
          futureLaunch: [
            {
              mission_number: flight.data.flight_number,
              mission_name: flight.data.mission_name,
              rocket_name: flight.data.rocket.rocket_name,
              flight: flight.data.rocket.first_stage.cores[0].flight,
              block: flight.data.rocket.first_stage.cores[0].block,
              landing_type: flight.data.rocket.first_stage.cores[0].landing_type,
              landing_vehicle: flight.data.rocket.first_stage.cores[0].landing_vehicle,
              payload_id: flight.data.rocket.second_stage.payloads[0].payload_id,
              customers: flight.data.rocket.second_stage.payloads[0].customers[0],
              payload_type: flight.data.rocket.second_stage.payloads[0].payload_type,
              payload_mass_kg: flight.data.rocket.second_stage.payloads[0].payload_mass_kg,
              payload_mass_lbs: flight.data.rocket.second_stage.payloads[0].payload_mass_lbs,
              orbit: flight.data.rocket.second_stage.payloads[0].orbit,
              lifespan: flight.data.rocket.second_stage.payloads[0].orbit_params.lifespan_years,
              regime: flight.data.rocket.second_stage.payloads[0].orbit_params.regime,
              longitude: flight.data.rocket.second_stage.payloads[0].orbit_params.longitude,
              inclination_deg: flight.data.rocket.second_stage.payloads[0].orbit_params.inclination_deg


            }
          ]
        })
  })
}
home = () => {
  window.scrollTo(0, 0)
}

render() {
  return (
    <CssBaseline>
      <AppBar position='sticky'>
      <Toolbar style={{marginLeft: -30}}>
        <IconButton onClick={this.home}>
          <HomeIcon />
        </IconButton>
        <Typography variant="title" color="inherit">
        SpaceX Launch Tracker
        </Typography>
      </Toolbar>
      </AppBar>
      <Details lTime={this.state.lTime} launch={this.state.futureLaunch} />
      <Search />
    </CssBaseline>
  );
}
}

export default withStyles(styles)(Index);

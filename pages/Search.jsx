import React, { Component } from 'react';
import axios from 'axios';
import SearchResult from './SearchResult.jsx'
import PropTypes from 'prop-types'
import {Input, FormLabel, Button, Icon, IconButton, List, ListItem, withStyles } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import DeleteIcon from '@material-ui/icons/Delete'

const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 20,
  },
});

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      searchResult: []
    }
  }
  searchTerm = (e) => {
    this.setState({
      searchTerm: [e.target.value]
    })
  }
  searchHandler = (e) => {
    e.preventDefault()
    axios.get(`http://localhost:1336/api/flight_number_history/${this.state.searchTerm}`)
    .then(res => {
      this.setState({
        searchResult: res.data
      })
    })
  }
  removeHandler = () => {
    this.setState({
      searchResult: []
    })
  }
  render() { 
    return (
      <List>
        <ListItem>
        <FormLabel><Input type="text" placeholder="search for launches!" onChange={this.searchTerm}/><IconButton type='submit' onClick={this.searchHandler}><SearchIcon /></IconButton><IconButton onClick={this.removeHandler}><DeleteIcon /></IconButton></FormLabel>
        </ListItem>
      <SearchResult search = {this.state.searchResult} />
      </List>
    );
  }
}

Search.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Search);
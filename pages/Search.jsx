import React, { Component } from 'react';
import axios from 'axios';
import SearchResult from './SearchResult.jsx'
import PropTypes from 'prop-types'
import {Input, FormLabel, Button, Icon, IconButton, List, ListItem } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import DeleteIcon from '@material-ui/icons/Delete'


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
      searchTerm: e.target.value
    })
  }
  searchHandler = (e) => {
    e.preventDefault()
    axios.get(`http://localhost:1336/api/flight_data/${this.state.searchTerm}`)
    .then(res => {
      this.setState({
        searchResult: res.data
      })
    })
  }
  removeHandler = () => {
    this.setState({
      searchResult: [],
      searchTerm: ''
    })
  }
  render() { 
    return (
      <List>
        <ListItem>
        <FormLabel id="searchForm"><Input type="text" placeholder="search for launches!" value={this.state.searchTerm} onChange={this.searchTerm} id="inputSearchInfo"/><IconButton type='submit' onClick={this.searchHandler} id="searchButton" aria-label="Search"><SearchIcon /></IconButton><IconButton onClick={this.removeHandler} id="clearSearch" aria-label="Clear"><DeleteIcon /></IconButton></FormLabel>
        </ListItem>
      <SearchResult search = {this.state.searchResult} />
      </List>
    );
  }
}

Search.propTypes = {
  searchTerm: PropTypes.string,
  searchResult: PropTypes.array
}

export default Search;
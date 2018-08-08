import React, { Component } from 'react';
import axios from 'axios';
import SearchResult from './LoadableSearchResult'
import {Input, FormLabel, Button, Icon, IconButton, List, ListItem} from '@material-ui/core'

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
  render() { 
    return (
      <List>
        <ListItem>
        <FormLabel><Input type="text" placeholder="search for launches!" onChange={this.searchTerm}/><IconButton type='submit' onClick={this.searchHandler}><Icon>search</Icon></IconButton></FormLabel>
        </ListItem>
      <SearchResult search = {this.state.searchResult} />
      </List>
    );
  }
}

export default Search;
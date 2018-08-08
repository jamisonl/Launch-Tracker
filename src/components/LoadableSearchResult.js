import Loadable from 'react-loadable';
import Loading from './Loading';
import React from 'react';

const LoadableComponent = Loadable({
  loader: () => import('./SearchResult.jsx'),
  loading: Loading,
})

export default class LoadableSearchResult extends React.Component {
  render() {
    return <LoadableComponent search = {this.props.search} />;
  }
}
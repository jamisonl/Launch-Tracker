import Loadable from 'react-loadable';
import Loading from './Loading';
import React from 'react';

const LoadableComponent = Loadable({
  loader: () => import('./Search.jsx'),
  loading: Loading,
})

export default class LoadableSearch extends React.Component {
  render() {
    return <LoadableComponent />;
  }
}

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Connector } from 'react-redux';
import RepoSearch from '../components/RepoSearch';
import * as FormActions from '../actions/FormActions';

export default class PokedexApp extends Component {
  render() {
    return (
      <Connector select = { state => ( { repoStore : state.RepoReducer } )  }>
        {this.renderChild}
      </Connector>
    );
  }
  renderChild({ repoStore, dispatch }) {
    const actions = bindActionCreators(FormActions, dispatch);
    return (
      <div>
        <RepoSearch
          data={repoStore}
          actions={actions}
        />
      </div>
    );
  }
}

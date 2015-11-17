import React, { Component, PropTypes as _ } from 'react';
import RepoTable from './RepoTable';
import SearchForm from './SearchForm';

export default class RepoSearch extends Component {
  //this whole encapsulation is kind of showing to be a pain,
  //especially due this necessity of specifying the propTypes everytime
  //this looks a little bit like TinyOS connections, but exagerated
  static propTypes = {
    data: _.shape({
      publicRepo: _.array,
      seenRepo: _.array,
      fileToSearch: _.string
    }).isRequired,
    actions: _.shape({
      searchTerm : _.func,
      selectItem : _.func
    }).isRequired
  };
  render() {
    const { data : { publicRepo, seenRepo, fileToSearch }, actions } = this.props;
    return (
      <section className = "search-group">
        <h1>Repository Search</h1>
        <SearchForm
          input = {fileToSearch}
          category = "repository"
          searchTerm = {actions.searchTerm}
        />
        <RepoTable
          publicRepo = {publicRepo}
          seenRepo = {seenRepo}
          selectItem = {actions.selectItem}
        />
      </section>
    );
  }
}

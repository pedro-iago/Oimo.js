import React, { Component, PropTypes as _ } from 'react';

export default class SearchForm extends Component {
  //fields of this.props are required to have a certain type
  static propTypes = {
    input: _.string.isRequired,
    category: _.string.isRequired,
    searchTerm : _.func.isRequired
  };
  //component requires term, type and actions to be assigned by parent
  render() {
    const {input, category, searchTerm} = this.props;
    return (
      <form
        className = "form-group"
        autoComplete = "off"
      >
        <input
          className = "form-control"
          type = "text"
          name = "search"
          placeholder = { `search ${category}`.toLowerCase() }
          value = {input}
          onChange = { e => searchTerm(e.target.value) }
        />
      </form>
    );
  }
}

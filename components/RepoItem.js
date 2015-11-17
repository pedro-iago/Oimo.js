import React, { Component, PropTypes as _ } from 'react';

export default class RepoItem extends Component {
  //props are section snapshots of the store, essantilly copies
  static propTypes = {
    item: _.shape({
      name: _.string.isRequired,
      type: _.string.isRequired,
      description: _.string,
      url: _.string.isRequired,
    }).isRequired,
    seen: _.bool.isRequired,
    selectItem: _.func.isRequired
  };
  //note we cannot change seen on the event onClick here
  //a section in the store can only be changed by a reducer
  render() {
    const {item, seen, selectItem} = this.props;
    return (
      <tr
        className = {seen ? 'seen' : 'unseen'}
      >
        <td>{item.name}</td>
        <td>{item.type}</td>
        <td>{item.url}</td>
        <td
          className = {seen ? '' : 'btn btn-primary'}
          onClick = { () => selectItem(item.url) }
        >
          {seen ? '' : 'New!'}
        </td>
      </tr>
    );
  }
}

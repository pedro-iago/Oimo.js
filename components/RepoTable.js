import React, { Component, PropTypes as _ } from 'react';
import RepoItem from './RepoItem';

export default class RepoTable extends Component {
  //is interesting that because each RepoItem can't handle it's seen propertie locally,
  //a seenRepo array with all the seen itens has to be saved on the store, and passed here
  static propTypes = {
    publicRepo: _.arrayOf(_.shape({
      name: _.string.isRequired
    })).isRequired,
    seenRepo: _.array.isRequired,
    selectItem: _.func
  };
  //Still, even though I report to children if it was seen, I don't change seenRepo here
  render() {
    const {publicRepo, seenRepo, selectItem} = this.props;
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Url</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {publicRepo.map(item =>
            <RepoItem
              key = {item.name}
              item = {item}
              seen = {seenRepo.indexOf(item.url) > -1}
              selectItem = {selectItem}
            />
          )}
        </tbody>
      </table>
    );
  }
}

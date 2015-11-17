import * as types from '../constants/ActionTypes';

export function searchTerm(term) {
  return {
    type: types.SEARCH_TERM,
    term
  };
}

export function selectItem(item) {
  return {
    type: types.SELECT_ITEM,
    item
  };
}

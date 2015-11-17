import { SEARCH_TERM, SELECT_ITEM } from '../constants/ActionTypes';
import { initialRepoState as initial } from '../constants/initialRepoState';

var doFilter = (fileToSearch = '') => {
  var filteredRepo = initial.publicRepo.filter( item => item.name.search(fileToSearch) > -1 );
  return fileToSearch? filteredRepo : initial.publicRepo;
};

export default function RepoReducer(state = initial, action) {
  var {publicRepo, seenRepo, fileToSearch} = state;
  switch (action.type) {
  case SEARCH_TERM:
    return {
      publicRepo: fileToSearch === action.term? publicRepo : doFilter(action.term),
      fileToSearch: action.term,
      seenRepo
    };
  case SELECT_ITEM:
    return {
      publicRepo,
      fileToSearch,
      seenRepo: seenRepo.indexOf(action.item) > -1? seenRepo : [...seenRepo, action.item]
    };
  default:
    return state;
  }
}

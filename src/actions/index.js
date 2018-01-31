import 'babel-polyfill'

import { ENTER_KEYWORD, SELECTED_PAGE, INVALIDATE_KEYWORD } from '../constants/ActionTypes'
import { fetchTitles, shouldFetchTitles } from './TitlesActionCreators'

export function enterKeyword(keyword) {
  return {
    type: ENTER_KEYWORD,
    keyword
  }
}

export function pageSelected(page) {
  return {
    type: SELECTED_PAGE,
    page
  }
}

export function invalidateKeyword(keyword, page) {
  return {
    type: INVALIDATE_KEYWORD,
    keyword,
    page
  }
}

export function fetchTitlesIfNeeded(keyword, page) {
  return (dispatch, getState) => {
    if (shouldFetchTitles(getState(), keyword, page)) {
      return dispatch(fetchTitles(keyword, page))
    }
  }
}

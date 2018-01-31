import { REQUEST_TITLES, RECEIVE_TITLES, ENTER_KEYWORD, SELECTED_PAGE, INVALIDATE_KEYWORD } from '../constants/ActionTypes'

export function enteredText(state = '', action) {
  switch (action.type) {
    case ENTER_KEYWORD:
      return action.keyword
    default:
      return state
  }
}

export function selectedPage(state = '1', action) {
  switch (action.type) {
    case SELECTED_PAGE:
      return action.page
    default:
      return state
  }
}

const initialState = { isFetching: false, didInvalidate: false, items: [], page: '', numberOfPages : ''}
export default function titles(state = initialState, action) {
  switch (action.type) {
    case INVALIDATE_KEYWORD:
      return Object.assign({}, state, {
        didInvalidate: true
      })
    case REQUEST_TITLES:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case RECEIVE_TITLES:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.titles,
        page: action.page,
        numberOfPages: action.numberOfPages,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}

export function titlesByKeyword(state = { }, action) {
  switch (action.type) {
    case INVALIDATE_KEYWORD:
    case RECEIVE_TITLES:
    case REQUEST_TITLES:
      return Object.assign({}, state, {
        [action.keyword + action.page]: titles(state[action.keyword + action.page], action)
      })
    default:
      return state
  }
}

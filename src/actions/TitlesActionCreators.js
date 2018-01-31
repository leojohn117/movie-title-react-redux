import fetch from 'isomorphic-fetch'

import { REQUEST_TITLES, RECEIVE_TITLES } from '../constants/ActionTypes'
import { GET_TITLES_URL } from '../config'

function requestTitles(keyword, page) {
  return {
    type: REQUEST_TITLES,
    keyword,
    page
  }
}

function receiveTitles(keyword, json) { 
  const jsonData = json.data || [];
  const currTime = new Date(Date.now()).toLocaleTimeString()
  const page = json.page || '1'
  const numberOfPages = json.total_pages || ''
  return {
    type: RECEIVE_TITLES,
    keyword,
    titles: jsonData.sort((a, b) => a.Title.localeCompare(b.Title)),
    page: page,
    numberOfPages : numberOfPages,
    receivedAt: currTime
  }
}

export function fetchTitles(keyword, page) {
  const paramUrl = '?Title=' + keyword + '&page=' + page
  return dispatch => {
    dispatch(requestTitles(keyword, page))    
    return fetch(GET_TITLES_URL + paramUrl )
      .then(response => response.json())
      .then(json => dispatch(receiveTitles(keyword, json)))
  }
}

export function shouldFetchTitles(state, keyword, page) {
  const titles = state.titlesByKeyword[keyword + page]
  if (!titles) {
    return true
  }
  if (titles.isFetching) {
    return false
  }
  return titles.didInvalidate
}

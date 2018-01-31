import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetch from 'isomorphic-fetch'
import nock from 'nock'
import expect from 'expect'
import * as actions from './TitlesActionCreators'
import { REQUEST_TITLES, RECEIVE_TITLES } from '../constants/ActionTypes'
import { API_URL } from '../config'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe('async actions => Titles', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('creates RECEIVE_TITLES when classes API has been invoked', () => {
    
    nock('https://jsonmock.hackerrank.com/api/movies')
      .get('/search/')
      .query({Title: 'jack', page : '1'})
      .reply(200, {"page":1,"per_page":10,"total":1,"total_pages":1,"data":[{"Poster":"N/A","Title":"Harry Jackson: A Man and his Art","Type":"movie","Year":1970,"imdbID":"tt0178555"}]} 
                            )
    let currTime = new Date(Date.now()).toLocaleTimeString()
    const expectedActions = [
      { type: REQUEST_TITLES, keyword: 'jack', page: '1' },
      { type: RECEIVE_TITLES,  keyword : 'jack', numberOfPages : 1, page: 1, receivedAt: currTime, titles: [ 
        {"Poster":"N/A","Title":"Harry Jackson: A Man and his Art","Type":"movie","Year":1970,"imdbID":"tt0178555"}
        ] 
      }
    ]

    const store = mockStore({ titles: [] })
    return store.dispatch(actions.fetchTitles('jack', '1'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })

})



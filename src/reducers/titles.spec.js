import expect from 'expect'
import reducer from './titles'
import { REQUEST_TITLES, RECEIVE_TITLES, ENTER_KEYWORD, SELECTED_PAGE, INVALIDATE_KEYWORD } from '../constants/ActionTypes'

describe('reducer => Titles', () => {

  it('should handle to entered Text', () => {

    // setup
    let initialState = "jack"
    let action = { type: ENTER_KEYWORD, keyword: initialState};

    // execute
    let newState = reducer( initialState, action);

    // verify
    expect(newState).toEqual(action.keyword);

  })

  it('should handle to when page selected', () => {

    // setup
    let initialState = "1"
    let action = { type: SELECTED_PAGE, keyword: initialState};

    // execute
    let newState = reducer( initialState, action);

    // verify
    expect(newState).toEqual(action.keyword);

  })

  it('should return the initial state', () => {
    // setup
    let action = { type: 'unknown' };
    let initialState = { isFetching: false, didInvalidate: false, items: [], page: '', numberOfPages : ''};

    // execute
    let newState = reducer(undefined, action);

    // verify
    expect(newState).toEqual(initialState);

  })

  it('should handle to request Title', () => {

    // setup
    let action = { type: REQUEST_TITLES };

    // execute
    let newState = reducer([], action);

    // verify
    expect(newState).toEqual({ isFetching: true, didInvalidate: false });

  })

  it('should handle to receive Titles', () => {

    // setup
    let classesVal = {"Poster":"N/A","Title":"Harry Jackson: A Man and his Art","Type":"movie","Year":1970,"imdbID":"tt0178555"}
    let action = { type: RECEIVE_TITLES, items: classesVal };
    let initialState = { isFetching: false, didInvalidate: false, items: [], page: '', numberOfPages : '' };

    // execute
    let newState = reducer(initialState, action);

    // verify
    expect(newState).toEqual({isFetching: false, didInvalidate: false, items: action.titles, lastUpdated: action.receivedAt, page: action.page, numberOfPages : action.numberOfPages});

  })

  
})
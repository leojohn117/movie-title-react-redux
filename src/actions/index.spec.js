import expect from 'expect'
import * as actions from './index'
import { ENTER_KEYWORD, SELECTED_PAGE, INVALIDATE_KEYWORD } from '../constants/ActionTypes'

describe('actions', () => {
  it('should create an action to enter the text', () => {
    const keyword = 'jack'
    const expectedAction = {
      type: ENTER_KEYWORD,
      keyword
    }
    expect(actions.enterKeyword(keyword)).toEqual(expectedAction)
  })

  it('should create an action to select the page', () => {
    const page = '1'
    const expectedAction = {
      type: SELECTED_PAGE,
      page
    }
    expect(actions.pageSelected(page)).toEqual(expectedAction)
  })

  it('should create an action to invalidate the text', () => {
    const keyword = 'jac' 
    const page = '1'
    const expectedAction = {
      type: INVALIDATE_KEYWORD,
      keyword,
      page
    }
    expect(actions.invalidateKeyword(keyword, page)).toEqual(expectedAction)
  })

})
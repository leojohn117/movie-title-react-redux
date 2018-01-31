import { combineReducers } from 'redux'
import { enteredText, selectedPage, titlesByKeyword } from './titles'

const rootReducer = combineReducers({
  	titlesByKeyword,
  	enteredText,
  	selectedPage
})

export default rootReducer

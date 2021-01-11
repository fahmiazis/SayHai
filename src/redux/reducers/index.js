import {combineReducers} from 'redux'

import auth from './auth'
import friend from './friend'
import message from './message'
import profile from './profile'
import search from './search'

export default combineReducers({
  auth,
  friend,
  message,
  profile,
  search
})
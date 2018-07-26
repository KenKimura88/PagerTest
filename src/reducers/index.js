import { combineReducers } from 'redux'
import authReducer from './auth'
import chatReducer from './chat'

const rootReducer = combineReducers({
  auth: authReducer,
  chat: chatReducer
})

export default rootReducer

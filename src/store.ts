import { configureStore, combineReducers} from '@reduxjs/toolkit'
import authentication from './redux/authentication-slice'

const rootReducer = combineReducers({
  auth: authentication
})

const store = configureStore({
  reducer : {
    auth: authentication    
  }
})

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch

export default store;
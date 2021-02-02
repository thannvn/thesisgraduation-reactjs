import { configureStore } from '@reduxjs/toolkit'
import authentication from './redux/authentication'

const store = configureStore({
  reducer : {
    auth: authentication    
  }
})

export default store;
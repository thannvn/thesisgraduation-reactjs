import { configureStore } from '@reduxjs/toolkit'
import authentication from './slices/authentication'

const store = configureStore({
  reducer : {
    auth: authentication    
  }
})

export default store;
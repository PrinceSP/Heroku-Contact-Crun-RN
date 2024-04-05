import {configureStore} from "@reduxjs/toolkit"
import contactId from './contactId.js'

export const store = configureStore({
  reducer:{
    currentID: contactId,
  }
})

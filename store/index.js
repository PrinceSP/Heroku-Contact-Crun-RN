import {configureStore} from "@reduxjs/toolkit"
import getContactId from './idContact.js'

export const store = configureStore({
  reducer:{
    contactId: getContactId
  }
})

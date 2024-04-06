import {configureStore} from "@reduxjs/toolkit"
import contactId from './contactId.js'
import selectedContact from './selectedContact.js'

export const store = configureStore({
  reducer:{
    currentID: contactId,
    contactData: selectedContact,
  }
})



import { createSlice } from '@reduxjs/toolkit'



export const formModalSlice = createSlice({
  name: 'formModal',
  initialState : {
       isOpen:false
  },
  
  reducers: {
  onOpenModal : ( state ) => {
     state.isOpen = true;
 
    },
  onCloseModal: ( state ) =>{
     state.isOpen = false
  }  
  }
})



export const { onOpenModal, onCloseModal } = formModalSlice.actions
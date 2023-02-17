

import { createSlice } from '@reduxjs/toolkit'



export const budgetSlice = createSlice({
  name: 'budget',
  initialState : {
       loading: true,
       budgets:[],
       activeBudget:{},
       budgetAlert: undefined

      },
  reducers: {
  getBudgets : ( state, { payload } ) => {
     state.loading = false;
     state.budgets = payload;
    },

  setAtiveBudget: ( state, { payload } ) => {
    state.activeBudget = payload;
  },
  clearAtiveBudget: ( state, { payload } )=>{
    state.activeBudget = {}
  },
  clearState: (state) =>{
    state.loading= true,
    state.budgets=[],
    state.activeBudget={},
    state.budgetAlert= undefined
   },
}
})






export const { getBudgets, setAtiveBudget, clearState, clearAtiveBudget } = budgetSlice.actions
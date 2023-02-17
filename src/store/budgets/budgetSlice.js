

import { createSlice } from '@reduxjs/toolkit'



export const budgetSlice = createSlice({
  name: 'budget',
  initialState : {
       loading: true,
       budgets:[],
       activeBudget:{},
       budgetAlert: undefined,
       totalCost:undefined,
       totalSale:undefined

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
    state.loading= true;
    state.budgets=[];
    state.activeBudget={};
    state.budgetAlert= undefined;
    state.totalCost= undefined;
    state.totalSale= undefined;
   },

  addTotalCost: (state, { payload }) =>{
    state.totalCost= payload
  },

  addTotalSale: (state, { payload }) =>{
    state.totalSale= payload
  },

  clearTotals: (state, { payload }) =>{
    state.totalSale = undefined
    state.totalCost = undefined
  }  

}
})






export const { getBudgets, setAtiveBudget, clearState, clearAtiveBudget, addTotalCost, addTotalSale, clearTotals } = budgetSlice.actions


import { createSlice } from '@reduxjs/toolkit'



export const budgetSlice = createSlice({
  name: 'budget',
  initialState : {
       loading: true,
       budgets:[],
       activeBudget:{},
       budgetAlert: undefined,
       totalCost:0,
       totalSale:0,

      },
  reducers: {
  getBudgets : ( state, { payload } ) => {
     state.loading = false;
     state.budgets = payload;
    },

  setActiveBudget: ( state, { payload } ) => {
    state.activeBudget = payload;
  },
  clearActiveBudget: ( state )=>{
    state.activeBudget = {}
  },
  clearState: (state) =>{
    state.loading= true;
    state.budgets=[];
    state.activeBudget={};
    state.budgetAlert= undefined;
    state.totalCost= 0;
    state.totalSale= 0;
   },

  addTotalCost: (state, { payload }) =>{
    state.totalCost= payload
  },

  addTotalSale: (state, { payload }) =>{
    state.totalSale= payload
  },

  clearTotals: (state, { payload }) =>{
    state.totalSale = 0
    state.totalCost = 0
  }, 
  
  addChapter: (state, {payload} ) =>{
    state.activeBudget.chapters = payload
  }

}
})






export const { getBudgets, setActiveBudget, 
               clearState, clearActiveBudget, 
               addTotalCost, addTotalSale, 
               clearTotals, addChapter, } = budgetSlice.actions
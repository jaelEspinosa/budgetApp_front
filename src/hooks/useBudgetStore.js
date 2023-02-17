import { useDispatch, useSelector } from "react-redux"
import eurekaApi from "../api/eurekaApi"
import { onLogout } from "../store";
import { addTotalCost, addTotalSale, clearTotals, getBudgets, setAtiveBudget } from "../store/budgets/budgetSlice";




export const useBudgetStore = () => {
  
  const dispatch = useDispatch();
  const {loading, budgets, budgetAlert, activeBudget, totalCost, totalSale} = useSelector(state => state.budget)
  

  const startGettingBudgets = async () => {
    try {
      const token = localStorage.getItem('token-eureka')
      const { data } = await eurekaApi.get('/budgets',{
        headers:{
          'Authorization': 'Bearer ' + token
        }
      })
     dispatch (getBudgets( data ))
      
    } catch (error) {
      console.log(error)
      dispatch( onLogout('sesión caducada'))
    }
  }
  
  
  const startSetActiveBudget = async _id =>{
    try {
      const token = localStorage.getItem('token-eureka')
      const { data } = await eurekaApi.get(`/budgets/${_id}`,{
        headers:{
          'Authorization': 'Bearer ' + token
        }
      })
      dispatch( setAtiveBudget( data ) )

    } catch (error) {
      console.log(error)
    }
  }

  const startSetTotalCost = ()=>{
      dispatch( addTotalCost(Number(localStorage.getItem('totalCostImport'))))
      
  }
  const startSetTotalSale = ()=>{
      dispatch( addTotalSale(Number(localStorage.getItem('totalSaleImport'))))
 }

 const startClearTotals = ()=>{
  dispatch(clearTotals())
 }
  
    return {

        // properties
        loading,
        budgets,
        budgetAlert,
        activeBudget,
        totalCost,
        totalSale,

        //methods
        startGettingBudgets,
        startSetActiveBudget,
        startSetTotalCost,
        startSetTotalSale,
        startClearTotals

  }
}

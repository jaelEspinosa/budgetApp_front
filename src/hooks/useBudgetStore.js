import { useDispatch, useSelector } from "react-redux"
import eurekaApi from "../api/eurekaApi"
import { onLogout } from "../store";
import { addTotalCost, addTotalSale, clearTotals, getBudgets, setAtiveBudget } from "../store/budgets/budgetSlice";
import { onCloseModal } from "../store/ui/formModalSlice";




export const useBudgetStore = () => {
  
  const dispatch = useDispatch();
  const {loading, budgets, budgetAlert, activeBudget, totalCost, totalSale} = useSelector(state => state.budget)
  const {} = useSelector(state => state.formModal)

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

  const startSetTotals = ()=>{
    
    let totalSale = 0;
    let totalCost = 0;
    const chapters = activeBudget.chapters || [];
    
    for (const chapter of chapters) {
          
      for (const batch of chapter.batchs) {
        let totalBatchCost = (batch.labourCost+batch.materialCost)*batch.amount
        let totalBatchSale = ((((batch.labourCost/10)*chapter.coefficiensLabour)+(batch.materialCost/10)*chapter.coefficiensMaterial))*batch.amount
        totalSale = totalSale + totalBatchSale;
        totalCost = totalCost + totalBatchCost

      }
        
    }
      

      dispatch(addTotalCost(totalCost))
      dispatch(addTotalSale(totalSale))
      
  }
 

 const startClearTotals = ()=>{
  dispatch(clearTotals())
 }

 const startSaveBudget = async ( budget ) => {

  const token = localStorage.getItem('token-eureka')
   
   try {
      if(!budget._id){
        const { data } = await eurekaApi.post('/budgets/new', budget,{
          headers:{
            'Authorization': 'Bearer ' + token
          }
        })
      } 
   } catch (error) {
     console.log(error)
   }
   dispatch( onCloseModal() )
   dispatch( getBudgets() )
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
        startClearTotals,
        startSetTotals,
        startSaveBudget

  }
}

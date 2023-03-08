import { useDispatch, useSelector } from "react-redux"
import eurekaApi from "../api/eurekaApi"
import { onLogout } from "../store";
import { addChapter, addTotalCost, addTotalSale, clearActiveBudget, clearState, clearTotals, getBudgets, setActiveBudget } from "../store/budgets/budgetSlice";
import { onCloseModal } from "../store/ui/formModalSlice";




export const useBudgetStore = () => {
  
  const dispatch = useDispatch();
  const {loading, budgets, budgetAlert, activeBudget, totalCost, totalSale} = useSelector(state => state.budget)
  const {} = useSelector(state => state.formModal)
  
  ////

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
  const startSetActiveLocalBudget = (data)=>{
    dispatch( setActiveBudget( data ))
  }
   
  ////

  const startSetActiveBudget = async _id =>{
    try {
      const token = localStorage.getItem('token-eureka')
      const { data } = await eurekaApi.get(`/budgets/${_id}`,{
        headers:{
          'Authorization': 'Bearer ' + token
        }
      })
      dispatch( setActiveBudget( data ) )

    } catch (error) {
      console.log(error)
    }
  }

////

  const startSetTotals = ()=>{
    
    let totalSale = 0;
    let totalCost = 0;
    const chapters = activeBudget.chapters || [];
    
    for (const chapter of chapters) {
     if(chapter.batchs){

       for (const batch of chapter.batchs) {
         let totalBatchCost = (batch.labourCost+batch.materialCost)*batch.amount
         let totalBatchSale = ((((batch.labourCost/10)*chapter.coefficiensLabour)+(batch.materialCost/10)*chapter.coefficiensMaterial))*batch.amount
         totalSale = totalSale + totalBatchSale;
         totalCost = totalCost + totalBatchCost
 
       }
     }     
        
    }
      dispatch(addTotalCost(totalCost))
      dispatch(addTotalSale(totalSale))
    
  }
 
////

 const startClearTotals = ()=>{
  dispatch(clearTotals())
 }

////

////
const startClearActiveBudget = () =>{
  dispatch(clearActiveBudget())
}
////

const startSaveBudget = async ( budget ) => {

  const token = localStorage.getItem('token-eureka')
   
   try {
      
      if(!budget._id){
        const { data } = await eurekaApi.post('/budgets/new', budget,{
          headers:{
            'Authorization': 'Bearer ' + token
          }
        })
      }else{
        const { data } = await eurekaApi.put(`/budgets/${budget._id}`, budget,{
          headers:{
            'Authorization': 'Bearer ' + token
          }

        }) 
        startSetActiveBudget(budget._id)
        
     
      }
     
   } catch (error) {
     console.log(error)
   }
   dispatch( onCloseModal() )
   
   startGettingBudgets()
 }

 ////

 const startAddNewChapter =  async chapter =>{
  const token = localStorage.getItem('token-eureka')
 
  try {
    if (chapter._id){    
       await eurekaApi.put(`/chapters/${chapter._id}`, chapter, {
        headers:{
          'Authorization': 'Bearer ' + token
        }
      })
      startSetActiveBudget(activeBudget._id) 
      return
     }
   
    const { data } = await eurekaApi.post('/chapters/new', chapter, {
        headers:{
          'Authorization': 'Bearer ' + token
        }
      })  
      const newChapterArray = [...activeBudget.chapters, data.chapter._id]
      
      const budgetData = await eurekaApi.put(`/budgets/${activeBudget._id}`, {chapters:newChapterArray},{
        headers:{
          'Authorization': 'Bearer ' + token
        }
      })
      startSetActiveBudget(budgetData.data.budget._id)    
    
  } catch (error) {
    console.log(error)
  }

 }

////

 const startAddNewBatch = async (batch, chapter)=>{
  const token = localStorage.getItem('token-eureka')
  
  try {
    if(batch._id){
      const response = await eurekaApi.put(`/batchs/${batch._id}`, batch, {
        headers:{
          'Authorization': 'Bearer ' + token
        } 
      })
     
      
    }else{

      const { data } = await eurekaApi.post('/batchs/new', batch, {
       headers:{
         'Authorization': 'Bearer ' + token
       }
      })
    
      const newBacthsArray = [...chapter.batchs, data.batch._id]
  
      const res = await eurekaApi.put(`/chapters/${chapter._id}`,{batchs: newBacthsArray}, {
        headers:{
          'Authorization': 'Bearer ' + token
        }
      })
    
    }

     
    
    
    startSetActiveBudget(activeBudget._id)
    
  } catch (error) {
    console.log(error)
  }
 }
 ////

 const startDeleteBudget = async () =>{
  const token = localStorage.getItem('token-eureka')

  try {
    for (const chapter of activeBudget.chapters) {      
      
      for (const batch of chapter.batchs) {        
        await eurekaApi.delete(`/batchs/${batch._id}`,{
          headers:{
            'Authorization': 'Bearer ' + token
          }
        })        
      }
      
      await eurekaApi.delete(`/chapters/${chapter._id}`,{
        headers:{
          'Authorization': 'Bearer ' + token
        }
      })
    }
    
    const { data } = await eurekaApi.delete(`/budgets/${activeBudget._id}`, {
      headers:{
        'Authorization': 'Bearer ' + token
      }
    })
    console.log(data)
    dispatch(clearState())
    startGettingBudgets()

  } catch (error) {
    console.log(error)
  }
 }

////

 const startDeleteChapter = async ( chapter ) => {
  const token = localStorage.getItem('token-eureka')

 

  try {

    for (const batch of chapter.batchs) {
      
      await eurekaApi.delete(`/batchs/${batch._id}`, {
        headers:{
          'Authorization': 'Bearer ' + token
        }
      })
    }
    
     await eurekaApi.delete(`/chapters/${chapter._id}`, {
      headers:{
        'Authorization': 'Bearer ' + token
      }
    })
  startSetActiveBudget(activeBudget._id)
  
  } catch (error) {
    console.log(error)
  }
 }

 ////

 const startDeleteBatch = async (batch) =>{
  console.log('vamos a eliminar el batch ', batch.description)
  const token = localStorage.getItem('token-eureka')
  try {
  const { data } = await eurekaApi.delete(`/batchs/${batch._id}`, {
      headers:{
        'Authorization': 'Bearer ' + token
      }
    })
    console.log(data)

    startSetActiveBudget(activeBudget._id)
  } catch (error) {
    console.log(error)
  }
 }

 ////

 
  
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
        startSetActiveLocalBudget,
        startClearTotals,
        startSetTotals,
        startSaveBudget,
        startAddNewChapter,
        startAddNewBatch,
        startDeleteBudget,
        startDeleteChapter,
        startDeleteBatch,
        startClearActiveBudget,
       

  }
}

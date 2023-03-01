
import { useEffect } from "react";
import { useBudgetStore, useFormModalStore} from "../../hooks";

import { Batch } from "./Batch";
import { FormModalBudget } from "./FormModalBudget";

export const DashBoard = () => {
    
    const {activeBudget, totalCost, totalSale, startSetTotals} = useBudgetStore()
    const {isLoading, startOpenModal, startCloseModal } = useFormModalStore()
    const { isOpen } = useFormModalStore()

 const handleClickEdit = ()=>{
    startOpenModal()
 }   

  useEffect(() => {

    if(activeBudget){
      startSetTotals()
    }  
    
  }, [activeBudget])
    
    
    
  return (
    <div className="my-10 mx-10 text-2xl text-teal-500 budget">
   {
    isOpen && <FormModalBudget />
   } 
      <h1>Budget</h1>
      {activeBudget.name &&
        <>

        <div className="mt-10 border p-2">
        <h2 className="text-xl text-slate-700">{activeBudget.name}</h2>
        <h3 className="text-xl text-slate-700">{activeBudget.clientName}</h3>
        </div>
      <div>
      <div>
       <h1 className='my-10 px-5 text-xl font-bold text-slate-600'>Details</h1>
     
      </div>
          <hr/>
          <ul>
            {
                activeBudget.chapters?.map((chapter, i) => (
                    <div key={i} className="border my-5 p-3">
                   <li className="text-slate-700 text-lg flex justify-between" >
                     <span className="minwidth">{chapter.description}</span> 
                     <span>Cf. Material: {chapter.coefficiensMaterial/10}</span> 
                     <span>Cf. Labour: {chapter.coefficiensLabour/10}</span> 
                     
                   </li>
                   <hr/>
                   <Batch chapter={chapter}/>
                     </div>
                ))
            } 
          </ul>
      </div>
        </>
      }
       {
        activeBudget.name && 
        <>
      <div className="flex justify-between">
          <h2>Total Cost: {totalCost}€</h2>
          <h2>Total Sale: {totalSale}€</h2>
       </div>
        <div className="float-button">
          <i className="fa-solid fa-trash"></i>
       </div>
       {
        activeBudget.name &&
       <div onClick={handleClickEdit} className="float-button-edit">
         <i className="fa-solid fa-pen-to-square"></i>
       </div>
       }
        </>
       }
    </div>
  );
};

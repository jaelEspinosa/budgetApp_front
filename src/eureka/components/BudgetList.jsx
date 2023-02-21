import React, { useEffect } from 'react'
import { useBudgetStore, useFormModalStore } from '../../hooks'

export const BudgetList = () => {
    const { budgets, startSetActiveBudget, activeBudget } = useBudgetStore()
    const { isOpen, startOpenModal } = useFormModalStore()
     
    const onSetActiveBudget = _id =>{     
        startSetActiveBudget(_id)        
    }

  const handleClickNew = () =>{
       startOpenModal()
    }  

  
    
     
  return (
    <div className=' bg-slate-500'>
    <div className='py-5 px-4 text-xl font-semibold '>
    <span>All Budgets</span>
    </div>
    <ul className='overflow-auto'>
        {
            budgets?.map(budget => (
                <li className={`hover: cursor-pointer py-1 px-5 ${activeBudget._id === budget._id ? 'bg-teal-500':''}`}
                 onClick={()=>onSetActiveBudget(budget._id)} 
                 key={budget._id}>{budget.name}</li>
            )) 
        }
    </ul>

    {!activeBudget.name && 
      <div  onClick= {handleClickNew}className='float-button-add '>
       <i className="fa-sharp fa-solid fa-plus"></i>
      </div>
    }
    
    </div>
    
  )
}

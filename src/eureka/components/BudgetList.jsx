import React from 'react'
import { useBudgetStore } from '../../hooks'

export const BudgetList = () => {
    const { budgets, startSetActiveBudget } = useBudgetStore()
     
    const onSetActiveBudget = _id =>{
        startSetActiveBudget(_id)
    }
     
  return (
    <div className=' bg-slate-500'>
    <div className='py-5 px-4 text-xl font-semibold '>
    <span>All Budgets</span>
    </div>
    <ul className='overflow-auto'>
        {
            budgets.map(budget => (
                <li className='hover: cursor-pointer py-1 px-5'
                 onClick={()=>onSetActiveBudget(budget._id)} 
                 key={budget._id}>{budget.name}</li>
            )) 
        }
    </ul>
    </div>
  )
}
